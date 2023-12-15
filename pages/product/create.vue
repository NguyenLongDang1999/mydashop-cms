<script setup lang="ts">

// ** Types Imports
import type { IAttributeList, IAttributeValuesList } from '~/types/attribute.type'
import type { IProductVariant } from '~/types/product.type'

// ** Validations Imports
import { label, schema } from '~/validations/product'

// ** Data
const attributeValueName = ref<Omit<IAttributeValuesList[], 'values'>[]>([])

// ** useHooks
const route = useRoute()
const categoryList = useCategoryDataList()
const { category_id, brandList, attributeList, isFetchingBrand, isFetchingAttribute } = useProductSelectedWithCategory()
const { handleSubmit, values: product, setFieldValue } = useForm({ validationSchema: schema })
const { isPending, mutateAsync } = useProductFormInput()
const { attribute_id, attributeValueList } = useAttributeValueList()

// ** Computed
const hasTechnicalSpecifications = computed(() => product.technical_specifications && product.technical_specifications.length > 0)
const productTypeSingleValue = computed(() => Number(route.query.product_type))
const productTypeSingle = computed(() => productTypeSingleValue.value === PRODUCT_TYPE.SINGLE)

// ** Methods
const onSubmit = handleSubmit(async values => {
    mutateAsync({
        ...values,
        attributes: values.attributes?.length ? JSON.stringify((values.attributes as IAttributeValuesList[]).map(item => ({ id: item.id, attribute_value_id: item.values }))) : undefined,
        variants: values.variants?.length ? JSON.stringify((values.variants as IProductVariant[])) : undefined,
        related_products: product.related_products ? JSON.stringify(product.related_products) : undefined,
        upsell_products: product.upsell_products ? JSON.stringify(product.upsell_products) : undefined,
        cross_sell_products: product.cross_sell_products ? JSON.stringify(product.cross_sell_products) : undefined,
        technical_specifications: product.technical_specifications ? JSON.stringify(product.technical_specifications) : undefined
    })

    attribute_id.value = []

    navigateTo(ROUTER.PRODUCT)
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

            for (const value of currentAttribute) {
                generateCombinations(currentIndex + 1, [
                    ...currentCombination,
                    value.name
                ])
            }
        }
    }

    generateCombinations(0, [])

    setFieldValue('variants', combinations)
}

const getSellingPrice = (index?: number) => {
    if (product.product_type === PRODUCT_TYPE.VARIANT) {
        if (product.variants?.length) {
            let discount = 0

            const productVariant = product.variants[index as number]

            if (productVariant?.special_price_type === SPECIAL_PRICE.PERCENT) {
                discount = (productVariant.price as number / 100) * (productVariant.special_price as number)
            }

            if (productVariant.special_price_type === SPECIAL_PRICE.PRICE) {
                discount = (productVariant.special_price as number)
            }

            return setFieldValue(`variants.${index as number}.selling_price`, (productVariant.price as number) - discount)
        }

        return setFieldValue(`variants.${index as number}.selling_price`, 0)
    } else {
        let discount = 0

        if (product.special_price_type === SPECIAL_PRICE.PERCENT) {
            discount = (product.price as number / 100) * (product.special_price as number)
        }

        if (product.special_price_type === SPECIAL_PRICE.PRICE) {
            discount = (product.special_price as number)
        }

        return setFieldValue('selling_price', (product.price as number) - discount)
    }
}

const handleIsDefault = (index: number) => {
    if (product.variants?.length) {
        product.variants.forEach((_item, _index: number) => {
            return setFieldValue(`variants.${_index}.is_default`, index === _index)
        })
    }
}
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Sản phẩm"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="{}"
                @submit="onSubmit"
            >
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                                Thêm mới sản phẩm
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
                                :label="label.sku"
                                name="sku"
                            />
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

                        <div class="md:col-span-4 sm:col-span-6 col-span-12">
                            <FormSelect
                                :label="label.popular"
                                :options="optionPopular"
                                name="popular"
                            />
                        </div>

                        <div class="md:col-span-4 sm:col-span-6 col-span-12">
                            <FormSelect
                                v-model="productTypeSingleValue"
                                :label="label.product_type"
                                :options="optionProductType"
                                name="product_type"
                                disabled
                            />
                        </div>

                        <template v-if="productTypeSingle">
                            <div class="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormMoney
                                    :label="label.quantity"
                                    name="quantity"
                                    @update:model-value="setFieldValue('in_stock', product.quantity as number <= 0 ? INVENTORY_STATUS.OUT_OF_STOCK : INVENTORY_STATUS.STOCK)"
                                />
                            </div>

                            <div class="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormSelect
                                    :label="label.in_stock"
                                    :options="optionInventoryStatus"
                                    name="in_stock"
                                />
                            </div>

                            <div class="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormSelect
                                    :label="label.special_price_type"
                                    :options="optionTypeDiscount"
                                    name="special_price_type"
                                    @update:model-value="getSellingPrice"
                                />
                            </div>

                            <div class="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormMoney
                                    :label="label.price"
                                    name="price"
                                    text-trailing="VNĐ"
                                    help="Giá Gốc"
                                    @update:model-value="getSellingPrice"
                                />
                            </div>

                            <div class="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormMoney
                                    :label="label.special_price"
                                    name="special_price"
                                    :text-trailing="product.special_price_type === SPECIAL_PRICE.PERCENT ? '%' : 'VNĐ'"
                                    @update:model-value="getSellingPrice"
                                />
                            </div>

                            <div class="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormMoney
                                    v-model="product.selling_price"
                                    :label="label.selling_price"
                                    name="selling_price"
                                    :help="`${product.special_price_type === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                                    text-trailing="VNĐ"
                                />
                            </div>
                        </template>

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

                        <template v-if="!productTypeSingle">
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
                        </template>

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

                        <div class="col-span-12">
                            <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                                6. Lựa chọn sản phẩm
                            </p>
                        </div>

                        <div class="col-span-12">
                            <FormProductSearchSelected
                                :label="label.related_products"
                                name="related_products"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormProductSearchSelected
                                :label="label.upsell_products"
                                name="upsell_products"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormProductSearchSelected
                                :label="label.cross_sell_products"
                                name="cross_sell_products"
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
                                :loading="isPending"
                                :trailing="false"
                            />

                            <UButton
                                type="reset"
                                size="sm"
                                color="gray"
                                variant="solid"
                                label="Huỷ Bỏ"
                                :trailing="false"
                                @click="navigateTo(ROUTER.PRODUCT)"
                            />
                        </div>
                    </template>
                </UCard>
            </UForm>
        </div>
    </section>
</template>
