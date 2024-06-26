<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/product-flash-deals'

// ** Types Imports
import type { IProductFlashDealsForm } from '~/types/product-flash-deals.type'

// ** useHooks
const { productVariants } = useProduct()
const { mutateAsync: mutateGenerate } = useProductFormGenerateVariant()
const { isPending, mutateAsync } = useProductFlashDealsFormInput()

const { handleSubmit, values: flashDeals, setFieldValue } = useForm<IProductFlashDealsForm>({
    validationSchema: schema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Set Data
productVariants.value = []

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
        title: values.title,
        slug: values.slug,
        status: values.status,
        description: values.description,
        start_time: values.date_range?.start as Date,
        end_time: values.date_range?.end as Date,
        product_variants
    })

    productVariants.value = []
    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="Thêm Mới"
        :trailing="false"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        prevent-close
        :ui="{
            width: 'sm:max-w-6xl'
        }"
    >
        <UForm
            :state="schema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                            Thêm mới Flash Deals
                        </h2>

                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                            1. Thông tin chung
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
                        <FormProductSearchSelected
                            name="product_id"
                            not-flash-deals
                        />
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
                            v-for="(product, variantIndex) in productVariants"
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
                                            v-model="variant.special_price_type"
                                            :label="label.special_price_type"
                                            :options="optionTypeDiscount"
                                            :name="`product.${product.id}.productVariants.${index}.special_price_type`"
                                        />
                                    </div>

                                    <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                        <FormMoney
                                            v-model="variant.price"
                                            :label="label.price"
                                            :name="`product.${product.id}.productVariants.${index}.price`"
                                            text-trailing="VNĐ"
                                            help="Giá Gốc"
                                        />
                                    </div>

                                    <div class="md:col-span-3 sm:col-span-4 col-span-6">
                                        <FormMoney
                                            v-model="variant.special_price"
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

                            <div
                                v-if="variantIndex < productVariants.length - 1"
                                class="col-span-12"
                            >
                                <UDivider />
                            </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-center gap-4">
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
                            @click="isOpen = false"
                        />
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>
