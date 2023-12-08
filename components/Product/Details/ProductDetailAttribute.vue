<script setup lang="ts">

// ** Types Imports
import type { IAttributeList, IAttributeValuesList } from '~/types/attribute.type'
import type { IBrandList } from '~/types/brand.type'
import type { ICategoryList } from '~/types/category.type'
import type { IProductForm, IProductVariant } from '~/types/product.type'

// ** Validations Imports
import { label, schema } from '~/validations/product'

// ** Props & Emits
interface Props {
    data: IProductForm
}

const props = defineProps<Props>()

// ** Data
const attributeValueName = ref<Omit<IAttributeValuesList[], 'values'>[]>([])
const category_id = ref<number>(props.data.category_id as number)

// ** useHooks
const { path } = useProduct()
const { path: pathBrand } = useBrand()
const { path: pathCategory } = useCategory()
const { path: pathAttribute, attribute_id } = useAttribute()
const { dataList: categoryList } = useCrudDataList<ICategoryList>(pathCategory.value)
const { isFetching: isFetchingBrand, dataList: brandList } = useCrudListWithParams<IBrandList>(pathBrand.value, category_id)
const { isFetching: isFetchingAttribute, dataList: attributeList } = useCrudListWithParams<IAttributeList>(pathAttribute.value, category_id)
const { isLoading, dataFormInput } = useCrudFormInput<IProductForm>(path.value)
const attributeValueList = useAttributeValueList()

const { handleSubmit, values: product, setFieldValue } = useForm({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

// ** SetData
watchEffect(() => {
    const attributes: IAttributeValuesList[] = product.attributes as IAttributeValuesList[]

    attribute_id.value = attributes.map(_attributeItem => _attributeItem.id)

    for (const index in attributes) {
        attributeValueName.value[index] = (attributeValueList[index].data as IAttributeValuesList[])?.filter(_v => attributes[index].values?.includes(_v.id))
    }
})

// ** Methods
const onSubmit = handleSubmit(async values => {
    dataFormInput({
        ...values,
        attributes: values.attributes?.length ? JSON.stringify((values.attributes as IAttributeValuesList[]).map(item => ({ id: item.id, attribute_value_id: item.values }))) : undefined,
        variants: values.variants?.length ? JSON.stringify((values.variants as IProductVariant[])) : undefined,
        technical_specifications: product.technical_specifications ? JSON.stringify(product.technical_specifications) : undefined
    })

    attribute_id.value = (props.data.attributes as IAttributeValuesList[]).map(_attributeItem => _attributeItem.id)
})

const handleChangeAttribute = () => {
    const attributeData: IAttributeList[] = attributeList.value.filter(attributeItem => product.attribute_id?.includes(attributeItem.id))

    if (product.attribute_id) {
        attributeData.sort((a, b) => {
            const indexA = product.attribute_id.indexOf(a.id)
            const indexB = product.attribute_id.indexOf(b.id)

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
                    special_price_type: SPECIAL_PRICE.PRICE,
                    selling_price: 0
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

const getSellingPrice = (index: number) => {
    if (product.variants?.length) {
        let discount = 0

        if (product.variants[index]?.special_price_type === SPECIAL_PRICE.PERCENT) {
            discount = (product.variants[index].price as number / 100) * (product.variants[index].special_price as number)
        }

        if (product.variants[index].special_price_type === SPECIAL_PRICE.PRICE) {
            discount = (product.variants[index].special_price as number)
        }

        return setFieldValue(`variants.${index}.selling_price`, (product.variants[index].price as number) - discount)
    }

    return setFieldValue(`variants.${index}.selling_price`, 0)
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
                                @change="attributeValueName[index] = (attributeValueList[index].data as IAttributeValuesList[])?.filter(_v => (product.attributes as IAttributeValuesList[])[index].values?.includes(_v.id))"
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
                    class="col-span-12"
                >
                    <UButton
                        size="sm"
                        variant="solid"
                        label="Tạo Biến Thể"
                        :trailing="false"
                        @click="generateProductVariants"
                    />
                </div>

                <div
                    v-if="attribute_id.length"
                    class="col-span-12 flex flex-col gap-4"
                >
                    <div
                        v-for="(variant, index) in product.variants"
                        :key="variant.label"
                        class="grid grid-cols-12 gap-4"
                    >
                        <div class="md:col-span-2 sm:col-span-4 col-span-6">
                            <FormToggle
                                v-model="variant.is_default"
                                label="Mặc định"
                                :name="`variants.${index}.is_default`"
                            />
                        </div>

                        <div class="md:col-span-2 sm:col-span-4 col-span-6">
                            <FormInput
                                v-model="variant.label"
                                label="Tiêu đề"
                                :name="`variants.${index}.label`"
                                disabled
                            />
                        </div>

                        <div class="md:col-span-2 sm:col-span-4 col-span-6">
                            <FormInput
                                v-model="variant.sku"
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
                                @update:model-value="getSellingPrice(index)"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormMoney
                                :label="label.special_price"
                                :name="`variants.${index}.special_price`"
                                :text-trailing="variant.special_price_type === SPECIAL_PRICE.PERCENT ? '%' : 'VNĐ'"
                                @update:model-value="getSellingPrice(index)"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormMoney
                                :label="label.price"
                                :name="`variants.${index}.price`"
                                text-trailing="VNĐ"
                                help="Giá Gốc"
                                @update:model-value="getSellingPrice(index)"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormMoney
                                v-model="variant.selling_price"
                                :label="label.selling_price"
                                :name="`variants.${index}.selling_price`"
                                :help="`${variant.special_price_type === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                                text-trailing="VNĐ"
                            />
                        </div>

                        <div class="col-span-12">
                            <UDivider />
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex justify-start gap-4">
                    <UButton
                        type="submit"
                        size="sm"
                        variant="solid"
                        label="Cập Nhật"
                        :loading="isLoading"
                        :trailing="false"
                    />

                    <UButton
                        type="reset"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="Quay Lại"
                        :trailing="false"
                        @click="navigateTo(ROUTER.PRODUCT)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
