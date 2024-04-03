<script setup lang="ts">

// ** Types Imports
import type { IProductAttributeList, IProductAttributeValuesList } from '~/types/product-attribute.type'
import type { IProductFormVariant, IProductVariant } from '~/types/product.type'

// ** Validations Imports
import { label, schemaVariants } from '~/validations/product'

// ** Props & Emits
interface Props {
    data: IProductFormVariant
}

const props = defineProps<Props>()

// ** Data
const attributeValueName = ref<Omit<IProductAttributeValuesList[], 'values'>[]>([])

// ** useHooks
const categoryList = useProductCategoryDataList()
const { category_id, brandList, attributeList, isFetchingBrand, isFetchingAttribute } = useProductSelectedWithCategory()
const { isPending, mutateAsync } = useProductFormInput()
const { attribute_id, attributeValueList } = useProductAttributeValueList()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductFormVariant>({
    validationSchema: schemaVariants,
    initialValues: _omitBy(props.data, _isNil)
})

// ** Lifecycle
watchEffect(() => {
    category_id.value = props.data.product_category_id

    const attributes = product.product_attributes as IProductAttributeValuesList[]

    attribute_id.value = attributes.map(_attributeItem => _attributeItem.id)

    attributes.forEach((attr, index) => {
        if (attributeValueList.value[index]?.data) {
            attributeValueName.value[index] = (attributeValueList.value[index].data as IProductAttributeValuesList[]).filter(_v =>
                attr.values.includes(_v.id)
            )
        }
    })
})

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        id: values.id,
        name: values.name,
        slug: values.slug,
        product_category_id: values.product_category_id,
        product_brand_id: values.product_brand_id,
        product_variants: JSON.stringify(values.product_variants)
    })

    attribute_id.value = []
})

const handleChangeAttribute = () => {
    const attributeData: IProductAttributeList[] = attributeList.value.filter(attributeItem => product.product_attribute_id?.includes(attributeItem.id))

    if (product.product_attribute_id) {
        attributeData.sort((a, b) => {
            const indexA = product.product_attribute_id!.indexOf(a.id)
            const indexB = product.product_attribute_id!.indexOf(b.id)

            return indexA - indexB
        })
    }

    setFieldValue('product_attributes', attributeData.map(_v => ({
        id: _v.id,
        name: _v.name,
        values: []
    })))

    setFieldValue('product_variants', [])
}

const generateProductVariants = () => {
    if (!product.product_attributes || product.product_attributes.length === 0) {
        return
    }

    const combinations: IProductVariant[] = []

    const generateCombinations = (
        currentIndex: number,
        currentCombination: { name: string, id: string }[]
    ) => {
        if (Array.isArray(product.product_attributes)) {
            if (currentIndex === product.product_attributes.length) {
                combinations.push({
                    is_default: combinations.length === 0,
                    label: currentCombination.map(item => item.name).join(' - '),
                    sku: '',
                    price: 0,
                    manage_stock: MANAGE_STOCK.NO,
                    quantity: 0,
                    special_price: 0,
                    special_price_type: SPECIAL_PRICE.PRICE,
                    product_attribute_value_id: currentCombination.map(item => item.id)
                })

                return
            }

            const currentAttribute = attributeValueName.value[currentIndex]

            for (const value of currentAttribute) {
                generateCombinations(currentIndex + 1, [
                    ...currentCombination,
                    { name: value.name, id: value.id }
                ])
            }
        }
    }

    generateCombinations(0, [])

    setFieldValue('product_variants', combinations)
}

const handleIsDefault = (index: number) => {
    const variants = product.product_variants as IProductVariant[]

    if (variants && variants.length) {
        variants.forEach((_item, _index) => {
            setFieldValue(`product_variants.${_index}.is_default`, index === _index)
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
                        :label="label.product_category_id"
                        :options="categoryList"
                        name="product_category_id"
                        @update:model-value="val => {
                            category_id = val
                            attribute_id = []
                        }"
                    />
                </div>

                <div class="sm:col-span-4 col-span-12">
                    <FormSelect
                        :label="label.product_brand_id"
                        :options="brandList"
                        :loading="isFetchingBrand"
                        name="product_brand_id"
                    />
                </div>

                <div class="sm:col-span-4 col-span-12">
                    <FormSelect
                        v-model="attribute_id"
                        :label="label.attribute.name"
                        :options="attributeList"
                        :loading="isFetchingAttribute"
                        name="product_attribute_id"
                        multiple
                        @update:model-value="handleChangeAttribute"
                    />
                </div>

                <div
                    v-if="attribute_id.length"
                    class="col-span-12 flex flex-col gap-4"
                >
                    <div
                        v-for="(attributeItem, index) in (product.product_attributes as IProductAttributeValuesList[])"
                        :key="attributeItem.name"
                        class="grid grid-cols-12 gap-4"
                    >
                        <div class="col-span-3">
                            <FormInput
                                :model-value="attributeItem.name"
                                :label="label.attribute.name"
                                :name="`product_attributes.${index}.name`"
                                disabled
                            />
                        </div>

                        <div class="col-span-6">
                            <FormSelect
                                :model-value="attributeItem.values"
                                :label="label.attribute.values"
                                :name="`product_attributes.${index}.values`"
                                :options="attributeValueList[index]?.data as IProductAttributeValuesList[] || []"
                                multiple
                                @update:model-value="attributeValueName[index] = (attributeValueList[index].data as IProductAttributeValuesList[])?.filter(_v => ((product.product_attributes as IProductAttributeValuesList[])[index].values as string[])?.includes(_v.id))"
                            />
                        </div>

                        <div class="col-span-1">
                            <FormInput
                                type="hidden"
                                :model-value="attributeItem.id"
                                :name="`product_attributes.${index}.id`"
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
                        v-for="(variant, index) in (product.product_variants as IProductVariant[])"
                        :key="variant.label"
                        class="grid grid-cols-12 gap-4"
                    >
                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormToggle
                                v-model="variant.is_default"
                                label="Mặc định"
                                :name="`product_variants.${index}.is_default`"
                                :label-toggle="variant.label"
                                @update:model-value="handleIsDefault(index)"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormInput
                                v-model="variant.sku"
                                label="Mã sản phẩm"
                                :name="`product_variants.${index}.sku`"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormSelect
                                v-model="variant.manage_stock"
                                :label="label.manage_stock"
                                :options="optionManageStock"
                                :name="`product_variants.${index}.manage_stock`"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormMoney
                                :label="label.quantity"
                                :disabled="MANAGE_STOCK.YES !== String(variant.manage_stock)"
                                :name="`product_variants.${index}.quantity`"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormSelect
                                :label="label.special_price_type"
                                :options="optionTypeDiscount"
                                :name="`product_variants.${index}.special_price_type`"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormMoney
                                :label="label.price"
                                :name="`product_variants.${index}.price`"
                                text-trailing="VNĐ"
                                help="Giá Gốc"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormMoney
                                :label="label.special_price"
                                :name="`product_variants.${index}.special_price`"
                                :text-trailing="String(variant.special_price_type) === SPECIAL_PRICE.PERCENT ? '%' : 'VNĐ'"
                            />
                        </div>

                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                            <FormMoney
                                :value="formatSellingPrice(variant)"
                                :label="label.selling_price"
                                :name="`product_variants.${index}.selling_price`"
                                :help="`${String(variant.special_price_type) === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                                text-trailing="VNĐ"
                                disabled
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
                        @click="$router.go(-1)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
