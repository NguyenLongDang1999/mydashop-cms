<script setup lang="ts">

// ** Types Imports
import type { IProductAttributeList, IProductAttributeValuesList } from '~/types/product-attribute.type'
import type { IProductFormVariant, IProductVariant } from '~/types/product.type'

// ** Validations Imports
import { label, schemaVariants } from '~/validations/product'

// ** Data
const attributeValueName = ref<Omit<IProductAttributeValuesList[], 'values'>[]>([])

// ** useHooks
const categoryList = useProductCategoryDataList()
const { category_id, brandList, attributeList, isFetchingBrand, isFetchingAttribute } = useProductSelectedWithCategory()
const { isPending, mutateAsync } = useProductFormInput()
const { attribute_id, attributeValueList } = useProductAttributeValueList()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductFormVariant>({
    validationSchema: schemaVariants
})

// ** Computed
const hasTechnicalSpecifications = computed(() => product.technical_specifications && product.technical_specifications.length > 0)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        product_variants: JSON.stringify(values.product_variants),
        technical_specifications: product.technical_specifications ? JSON.stringify(product.technical_specifications) : undefined
    })

    attribute_id.value = []

    navigateTo(ROUTER.PRODUCT)
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
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                        Thêm mới sản phẩm (Biến thể)
                    </h2>
                </div>
            </template>

            <div class="grid gap-4 grid-cols-12">
                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        1. Thông tin cơ bản
                    </p>
                </div>

                <div class="col-span-12">
                    <FormUpload />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormInput
                        :label="label.name"
                        name="name"
                        @update:model-value="val => setFieldValue('slug', slugify(val))"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormInput
                        :label="label.slug"
                        name="slug"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormSelect
                        :label="label.status"
                        :options="optionStatus"
                        name="status"
                    />
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        2. Thông số kỹ thuật
                    </p>
                </div>

                <div class="col-span-12">
                    <FieldArray
                        v-slot="{ push, remove }"
                        name="technical_specifications"
                    >
                        <UButton
                            icon="i-heroicons-plus"
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Thông Số"
                            :trailing="false"
                            @click="push({ title: '', content: '' })"
                        />

                        <div
                            class="flex flex-col gap-4"
                            :class="hasTechnicalSpecifications ? 'mt-4' : ''"
                        >
                            <div
                                v-for="(value, index) in product.technical_specifications"
                                :key="index"
                                class="grid gap-4 grid-cols-12"
                            >
                                <div class="col-span-4">
                                    <FormInput
                                        :label="label.technical_specifications.title"
                                        :name="`technical_specifications.${index}.title`"
                                    />
                                </div>

                                <div class="col-span-4">
                                    <FormInput
                                        :label="label.technical_specifications.content"
                                        :name="`technical_specifications.${index}.content`"
                                    />
                                </div>

                                <div class="col-span-3">
                                    <UButton
                                        :ui="{ rounded: 'rounded-full' }"
                                        icon="i-heroicons-trash"
                                        size="sm"
                                        color="red"
                                        variant="solid"
                                        class="mt-6"
                                        @click="remove(index)"
                                    />
                                </div>
                            </div>
                        </div>
                    </FieldArray>
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        3. Mô tả sản phẩm
                    </p>
                </div>

                <div class="col-span-12">
                    <FormInput
                        :label="label.short_description"
                        name="short_description"
                    />
                </div>

                <div class="col-span-12">
                    <FormEditor
                        :label="label.description"
                        name="description"
                    />
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        4. Thông tin danh mục và thuộc tính
                    </p>
                </div>

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

                        <div
                            v-if="index < (product.product_variants as IProductVariant[]).length - 1"
                            class="col-span-12"
                        >
                            <UDivider />
                        </div>
                    </div>
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        5. Meta SEO
                    </p>
                </div>

                <div class="col-span-12">
                    <FormInput
                        :label="label.meta_title"
                        name="meta_title"
                    />
                </div>

                <div class="col-span-12">
                    <FormInput
                        :label="label.meta_description"
                        name="meta_description"
                    />
                </div>
            </div>

            <template #footer>
                <div class="flex justify-start gap-4">
                    <UButton
                        type="submit"
                        size="sm"
                        variant="solid"
                        label="Thêm Mới"
                        :loading="Boolean(isPending)"
                        :trailing="false"
                    />

                    <UButton
                        type="reset"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="Huỷ Bỏ"
                        :trailing="false"
                        :to="goToPage('', ROUTER.PRODUCT)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
