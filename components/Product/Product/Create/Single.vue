<script setup lang="ts">

// ** Types Imports
import type { IProductFormSingle } from '~/types/product.type';

// ** Validations Imports
import { label, schema } from '~/validations/product';

// ** useHooks
const categoryList = useProductCategoryDataList()
const { category_id, brandList, isFetchingBrand } = useProductSelectedWithCategory()
const { handleSubmit, values: product, setFieldValue } = useForm<IProductFormSingle>({ validationSchema: schema })
const { isPending, mutateAsync } = useProductFormInput()

// ** Computed
const hasTechnicalSpecifications = computed(() => product.technical_specifications && product.technical_specifications.length > 0)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        // attributes: undefined,
        // variants: values.variants?.length ? JSON.stringify((values.variants as IProductVariant[])) : undefined,
        // related_products: product.related_products ? JSON.stringify(product.related_products) : undefined,
        // upsell_products: product.upsell_products ? JSON.stringify(product.upsell_products) : undefined,
        // cross_sell_products: product.cross_sell_products ? JSON.stringify(product.cross_sell_products) : undefined,
        technical_specifications: product.technical_specifications ? JSON.stringify(product.technical_specifications) : undefined
    })

    navigateTo(ROUTER.PRODUCT)
})
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
                        Thêm mới sản phẩm (Đơn thể)
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
                    <FormInput
                        :label="label.sku"
                        name="sku"
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
                        :label="label.product_category_id"
                        :options="categoryList"
                        name="product_category_id"
                        @update:model-value="val => category_id = val"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormSelect
                        :label="label.product_brand_id"
                        :options="brandList"
                        :loading="isFetchingBrand"
                        name="product_brand_id"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormSelect
                        :label="label.manage_stock"
                        :options="optionManageStock"
                        name="manage_stock"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormInput
                        :label="label.quantity"
                        :disabled="MANAGE_STOCK.YES !== String(product.manage_stock)"
                        name="quantity"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormSelect
                        :label="label.special_price_type"
                        :options="optionTypeDiscount"
                        name="special_price_type"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormMoney
                        :label="label.price"
                        name="price"
                        text-trailing="VNĐ"
                        help="Giá Gốc"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormMoney
                        :label="label.special_price"
                        name="special_price"
                        :text-trailing="String(product.special_price_type) === SPECIAL_PRICE.PERCENT ? '%' : 'VNĐ'"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormMoney
                        :value="formatSellingPrice(product)"
                        :label="label.selling_price"
                        :help="`${String(product.special_price_type) === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                        name="selling_price"
                        text-trailing="VNĐ"
                        disabled
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
                    <FormTextarea
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
                        4. Meta SEO
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
                        5. Lựa chọn sản phẩm
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
                        @click="$router.go(-1)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
