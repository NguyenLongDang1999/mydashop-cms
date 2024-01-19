<script setup lang="ts">

// ** Types Imports
import type { IAttributeList, IAttributeValuesList } from '~/types/attribute.type'
import type { IProductForm, IProductFormAttributes, IProductVariant } from '~/types/product.type'

// ** Validations Imports
import { label, schema } from '~/validations/product'

// ** Props & Emits
interface Props {
    data: IProductForm
}

const props = defineProps<Props>()

// ** Data
const attributeValueName = ref<Omit<IAttributeValuesList[], 'values'>[]>([])

// ** useHooks
const categoryList = useCategoryDataList()
const { category_id, brandList, attributeList, isFetchingBrand, isFetchingAttribute } = useProductSelectedWithCategory()
const { isPending, mutateAsync } = useProductFormInput<IProductFormAttributes>()
const { attribute_id, attributeValueList } = useAttributeValueList()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductFormAttributes>({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

// ** SetData
onMounted(() => {
    category_id.value = props.data.category_id as number

    const attributes: IAttributeValuesList[] = product.attributes as IAttributeValuesList[]

    attribute_id.value = attributes.map(_attributeItem => _attributeItem.id)

    for (const index in attributes) {
        attributeValueName.value[index] = (attributeValueList.value[index].data as IAttributeValuesList[])?.filter(_v => (attributes[index].values as number[])?.includes(_v.id))
    }
})

// ** Methods
const onSubmit = handleSubmit(async values => {
    mutateAsync({
        id: values.id,
        sku: props.data.sku,
        name: props.data.name,
        slug: props.data.slug,
        product_type: props.data.product_type,
        category_id: values.category_id,
        brand_id: values.brand_id,
        attributes: values.attributes?.length ? JSON.stringify((values.attributes as IAttributeValuesList[]).map(item => ({ id: item.id, attribute_value_id: item.values }))) : undefined,
        variants: values.variants?.length ? JSON.stringify((values.variants as IProductVariant[])) : undefined
    })

    attribute_id.value = (props.data.attributes as IAttributeValuesList[]).map(_attributeItem => _attributeItem.id)
})

const handleChangeAttribute = () => {
    const attributeData: IAttributeList[] = attributeList.value.filter(attributeItem => product.attribute_id?.includes(attributeItem.id))

    if (product.attribute_id) {
        attributeData.sort((a, b) => {
            const indexA = product.attribute_id!.indexOf(a.id)
            const indexB = product.attribute_id!.indexOf(b.id)

            return indexA - indexB
        })
    }

    setFieldValue('attributes', attributeData.map(_v => ({
        id: _v.id,
        name: _v.name,
        values: []
    })))

    setFieldValue('variants', [])
}

const handleChangeAttributeValues = (index: number) => {
    attributeValueName.value[index] = (attributeValueList.value[index].data as IAttributeValuesList[])?.filter(_v => ((product.attributes as IAttributeValuesList[])[index].values as number[])?.includes(_v.id))
    generateProductVariants()
}

const generateProductVariants = () => {
    if (!product.attributes || product.attributes.length === 0) {
        return
    }

    const combinations: IProductVariant[] = []

    const generateCombinations = (
        currentIndex: number,
        currentCombination: string[]
    ) => {
        if (Array.isArray(product.attributes)) {
            if (currentIndex === product.attributes.length) {
                combinations.push({
                    label: currentCombination.join(' - '),
                    price: 0,
                    quantity: 0,
                    sku: product.sku as string,
                    in_stock: INVENTORY_STATUS.OUT_OF_STOCK,
                    is_default: false,
                    special_price: 0,
                    special_price_type: SPECIAL_PRICE.PRICE
                })

                return
            }

            const currentAttribute = attributeValueName.value[currentIndex]

            if (Array.isArray(currentAttribute)) {
                for (const value of currentAttribute) {
                    generateCombinations(currentIndex + 1, [
                        ...currentCombination,
                        value.name
                    ])
                }
            }
        }
    }

    generateCombinations(0, [])
    setFieldValue('variants', combinations)
}

const handleIsDefault = (index: number) => {
    if (product.variants?.length) {
        (product.variants as IProductVariant[]).forEach((_item: IProductVariant, _index: number) => {
            return setFieldValue(`variants.${_index}.is_default`, index === _index)
        })
    }
}
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard
            :ui="{
                body: { base: 'min-h-[400px]' }
            }"
        >
            <div class="grid gap-4 grid-cols-12">
                <div class="sm:col-span-4 col-span-12">
                    <FormSelect
                        :label="label.category_id"
                        :options="categoryList"
                        name="category_id"
                        @change="val => {
                            category_id = val
                            attribute_id = []
                        }"
                    />
                </div>

                <div class="sm:col-span-4 col-span-12">
                    <FormSelect
                        :label="label.brand_id"
                        :options="brandList"
                        :loading="isFetchingBrand"
                        name="brand_id"
                    />
                </div>

                <template v-if="data.product_type !== PRODUCT_TYPE.SINGLE">
                    <div class="sm:col-span-4 col-span-12">
                        <FormSelect
                            v-model="attribute_id"
                            :label="label.attribute.name"
                            :options="attributeList"
                            :loading="isFetchingAttribute"
                            name="attribute_id"
                            multiple
                            @change="handleChangeAttribute"
                        />
                    </div>

                    <div
                        v-if="attribute_id.length"
                        class="col-span-12 flex flex-col gap-4"
                    >
                        <div
                            v-for="(attributeItem, index) in (product.attributes as IAttributeValuesList[])"
                            :key="attributeItem.name"
                            class="grid grid-cols-12 gap-4"
                        >
                            <div class="col-span-3">
                                <FormInput
                                    :model-value="attributeItem.name"
                                    :label="label.attribute.name"
                                    :name="`attributes.${index}.name`"
                                    disabled
                                />
                            </div>

                            <div class="col-span-6">
                                <FormSelect
                                    :model-value="attributeItem.values"
                                    :label="label.attribute.values"
                                    :name="`attributes.${index}.values`"
                                    :options="attributeValueList[index]?.data as IAttributeValuesList[] || []"
                                    multiple
                                    @update:model-value="handleChangeAttributeValues(index)"
                                />
                            </div>

                            <div class="col-span-1">
                                <FormInput
                                    type="hidden"
                                    :model-value="attributeItem.id"
                                    :name="`attributes.${index}.id`"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="attribute_id.length"
                        class="col-span-12 flex flex-col gap-4"
                    >
                        <div
                            v-for="(variant, index) in (product.variants as IProductVariant[])"
                            :key="variant.label"
                            class="grid grid-cols-12 gap-4"
                        >
                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormToggle
                                    v-model="variant.is_default"
                                    label="Mặc định"
                                    :name="`variants.${index}.is_default`"
                                    :label-toggle="variant.label"
                                    @update:model-value="handleIsDefault(index)"
                                />
                            </div>

                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormInput
                                    label="Mã sản phẩm"
                                    :name="`variants.${index}.sku`"
                                />
                            </div>

                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormMoney
                                    :label="label.quantity"
                                    :name="`variants.${index}.quantity`"
                                    @update:model-value="setFieldValue(`variants.${index}.in_stock`, variant.quantity as number <= 0 ? INVENTORY_STATUS.OUT_OF_STOCK : INVENTORY_STATUS.STOCK)"
                                />
                            </div>

                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormSelect
                                    :label="label.in_stock"
                                    :options="optionInventoryStatus"
                                    :name="`variants.${index}.in_stock`"
                                />
                            </div>

                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormSelect
                                    :label="label.special_price_type"
                                    :options="optionTypeDiscount"
                                    :name="`variants.${index}.special_price_type`"
                                />
                            </div>

                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormMoney
                                    :label="label.price"
                                    :name="`variants.${index}.price`"
                                    text-trailing="VNĐ"
                                    help="Giá Gốc"
                                />
                            </div>

                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormMoney
                                    :label="label.special_price"
                                    :name="`variants.${index}.special_price`"
                                    :text-trailing="variant.special_price_type === SPECIAL_PRICE.PERCENT ? '%' : 'VNĐ'"
                                />
                            </div>

                            <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                <FormMoney
                                    :value="formatSellingPrice(variant)"
                                    :label="label.selling_price"
                                    :name="`variants.${index}.selling_price`"
                                    :help="`${variant.special_price_type === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                                    disabled
                                    text-trailing="VNĐ"
                                />
                            </div>

                            <div class="col-span-12">
                                <UDivider />
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <template #footer>
                <div class="flex justify-start gap-4">
                    <UButton
                        type="submit"
                        size="sm"
                        variant="solid"
                        label="Cập Nhật"
                        :loading="Boolean(isPending)"
                        :trailing="false"
                    />

                    <UButton
                        type="reset"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="Quay Lại"
                        :trailing="false"
                        :to="goToPage('', ROUTER.PRODUCT)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
