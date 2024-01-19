<script setup lang="ts">

// ** Types Imports
import type { IProductForm, IProductFormInformations, IProductSpecification } from '~/types/product.type'

// ** Validations Imports
import { label, schema } from '~/validations/product'

// ** Props & Emits
interface Props {
    data: IProductForm
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useProductFormInput<IProductFormInformations>()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductFormInformations>({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    id: values.id,
    sku: values.sku,
    name: values.name,
    slug: values.slug,
    product_type: values.product_type,
    status: values.status,
    popular: values.popular,
    short_description: values.short_description,
    description: values.description,
    technical_specifications: values.technical_specifications ? JSON.stringify(values.technical_specifications) : undefined,
    price: values.price,
    quantity: values.quantity,
    in_stock: values.in_stock,
    selling_price: values.selling_price,
    special_price: values.special_price,
    special_price_type: values.special_price_type,
    meta_title: values.meta_title,
    meta_description: values.meta_description
}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <div class="grid gap-4 grid-cols-12">
                <div
                    v-if="data.FlashDealsProduct.length"
                    class="col-span-12"
                >
                    <UAlert
                        icon="i-heroicons-bell"
                        color="primary"
                        variant="outline"
                        title="Thông Báo!"
                        description="Sản phẩm này đang trong giai đoạn Chiến Dịch."
                    />
                </div>

                <div
                    v-if="data.FlashDealsProduct.length"
                    class="col-span-12"
                >
                    <UAlert
                        icon="i-heroicons-information-circle"
                        color="red"
                        variant="outline"
                        title="Lưu Ý!"
                    >
                        <template #description>
                            <p>Khi sản phẩm được kích hoạt Chiến Dịch thì <b class="line-through">Giá Ưu Đãi</b> sẽ không hoạt động.</p>
                            <p class="mt-1">
                                Giá bán sẽ được tính lại từ Giá gốc và Giá giảm từ Chiến Dịch.
                            </p>
                        </template>
                    </UAlert>
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        1. Thông tin cơ bản
                    </p>
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
                        :label="label.product_type"
                        :options="optionProductType"
                        name="product_type"
                        disabled
                    />
                </div>

                <template v-if="data.product_type === PRODUCT_TYPE.SINGLE">
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
                            :text-trailing="data.special_price_type === SPECIAL_PRICE.PERCENT ? '%' : 'VNĐ'"
                        />
                    </div>

                    <div class="md:col-span-4 sm:col-span-6 col-span-12">
                        <FormMoney
                            :value="formatSellingPrice(product)"
                            :label="label.selling_price"
                            name="selling_price"
                            :help="`${data.special_price_type === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
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
                            :class="(product.technical_specifications as IProductSpecification[]).length ? 'mt-4' : ''"
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
