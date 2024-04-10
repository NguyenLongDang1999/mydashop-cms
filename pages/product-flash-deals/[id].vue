<script setup lang="ts">

// ** Types Imports
import type { IProductFlashDealsForm } from '~/types/product-flash-deals.type'

// ** Validations Imports
import { label, schema } from '~/validations/product-flash-deals'

// ** useHooks
const { productVariants } = useProduct()
const { data } = await useProductFlashDealsRetrieve()
const { mutateAsync: mutateGenerate } = useProductFormGenerateVariant()
const { isPending, mutateAsync } = useProductFlashDealsFormInput()

const { handleSubmit, values: flashDeals, setFieldValue } = useForm<IProductFlashDealsForm>({
    validationSchema: schema,
    initialValues: _omitBy(data.value, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(async values => {
    const product_variants = []

    for (const _product_id of values.product_id as string[]) {
        const productVariantItem = values.product[_product_id].productVariants

        for (const variantItem in productVariantItem) {
            product_variants.push({
                id: productVariantItem[variantItem].id,
                price: productVariantItem[variantItem].price,
                special_price: productVariantItem[variantItem].special_price,
                special_price_type: productVariantItem[variantItem].special_price_type
            })
        }
    }

    await mutateAsync({
        id: values.id,
        title: values.title,
        slug: values.slug,
        status: values.status,
        description: values.description,
        start_time: values.date_range?.start as Date,
        end_time: values.date_range?.end as Date,
        product_variants
    })
})
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật flash deals: ${data.title}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="{}"
                @submit="onSubmit"
            >
                <UCard>
                    <div class="grid gap-4 grid-cols-12">
                        <div class="col-span-12">
                            <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                                1. Thông tin cơ bản
                            </p>
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormInput
                                :label="label.title"
                                name="title"
                                @update:model-value="val => setFieldValue('slug', slugify(val))"
                            />
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormInput
                                :label="label.slug"
                                name="slug"
                            />
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormSelect
                                :label="label.status"
                                :options="optionStatus"
                                name="status"
                            />
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormDatePickerRange
                                :label="label.date_range"
                                name="date_range"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormTextarea
                                :label="label.description"
                                name="description"
                            />
                        </div>

                        <div class="col-span-12">
                            <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                                2. Lựa chọn sản phẩm
                            </p>
                        </div>

                        <div class="col-span-12">
                            <FormProductSearchSelected name="product_id" />
                        </div>

                        <div class="col-span-12">
                            <UButton
                                size="sm"
                                variant="solid"
                                label="Tạo sản phẩm"
                                :trailing="false"
                                @click="mutateGenerate({
                                    product_id: flashDeals.product_id as string[]
                                })"
                            />
                        </div>

                        <div class="col-span-12 flex flex-col gap-4">
                            <div
                                v-for="product in productVariants"
                                :key="product.id"
                                class="grid grid-cols-12 gap-4"
                            >
                                <div class="col-span-12">
                                    <div class="flex items-center gap-1">
                                        <UAvatar
                                            :src="getPathImageFile(product.image_uri)"
                                            :alt="product.name"
                                        />

                                        <div class="flex flex-col flex-1 truncate">
                                            <span class="capitalize font-medium truncate">{{ product.name }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-span-12 flex flex-col gap-4">
                                    <div
                                        v-for="(variant, index) in product.productVariants"
                                        :key="variant.id"
                                        class="grid grid-cols-12 gap-4"
                                    >
                                        <FormInput
                                            type="hidden"
                                            :model-value="variant.id"
                                            :name="`product.${product.id}.productVariants.${index}.id`"
                                        />

                                        <div class="col-span-12">
                                            <strong>SKU: {{ variant.sku }}</strong>
                                            <p v-if="variant.label">
                                                Biến Thể: {{ variant.label }}
                                            </p>
                                        </div>

                                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                            <FormSelect
                                                :model-value="variant.special_price_type"
                                                :label="label.special_price_type"
                                                :options="optionTypeDiscount"
                                                :name="`product.${product.id}.productVariants.${index}.special_price_type`"
                                            />
                                        </div>

                                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                            <FormMoney
                                                :model-value="variant.price"
                                                :label="label.price"
                                                :name="`product.${product.id}.productVariants.${index}.price`"
                                                text-trailing="VNĐ"
                                                help="Giá Gốc"
                                            />
                                        </div>

                                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                            <FormMoney
                                                :model-value="variant.special_price"
                                                :label="label.special_price"
                                                :name="`product.${product.id}.productVariants.${index}.special_price`"
                                                :text-trailing="String(variant.special_price_type) === SPECIAL_PRICE.PERCENT ? '%' : 'VNĐ'"
                                            />
                                        </div>

                                        <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                            <FormMoney
                                                :value="formatSellingPrice(variant)"
                                                :label="label.selling_price"
                                                :name="`product.${product.id}.productVariants.${index}.selling_price`"
                                                :help="`${String(variant.special_price_type) === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                                                text-trailing="VNĐ"
                                                disabled
                                            />
                                        </div>
                                    </div>
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
        </div>
    </section>
</template>
