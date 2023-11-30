<script setup lang="ts">

// ** Types Imports
import type { IAttributeList, IAttributeValuesList } from '~/types/attribute.type'
import type { IBrandList } from '~/types/brand.type'
import type { ICategoryList } from '~/types/category.type'
import type { IProductForm } from '~/types/product.type'

// ** Validations Imports
import { label, schema } from '~/validations/product'

// ** Props & Emits
interface Props {
    data: IProductForm
}

const props = defineProps<Props>()

// ** Data
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
attribute_id.value = (props.data.attributes as IAttributeValuesList[]).map(_attributeItem => _attributeItem.id)

// ** Methods
const onSubmit = handleSubmit(async values => {
    dataFormInput({
        ...values,
        attributes: values.attributes?.length ? JSON.stringify((values.attributes as IAttributeValuesList[]).map(item => ({ id: item.id, attribute_value_id: item.values }))) : undefined,
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
}

const getSellingPrice = () => {
    let discount = 0

    if (product.special_price_type === SPECIAL_PRICE.PERCENT) {
        discount = (product.price as number / 100) * (product.special_price as number)
    }

    if (product.special_price_type === SPECIAL_PRICE.PRICE) {
        discount = (product.special_price as number)
    }

    return setFieldValue('selling_price', (product.price as number) - discount)
}
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <div class="grid gap-4 grid-cols-12">
                <div
                    v-if="product.flashSaleProduct.length"
                    class="col-span-12"
                >
                    <UAlert
                        icon="i-heroicons-bell"
                        color="primary"
                        variant="outline"
                        title="Thông Báo!"
                        description="Sản phẩm này đang trong quá trình Flash Sale."
                    />
                </div>

                <div
                    v-if="product.flashSaleProduct.length"
                    class="col-span-12"
                >
                    <UAlert
                        icon="i-heroicons-information-circle"
                        color="red"
                        variant="outline"
                        title="Lưu Ý!"
                    >
                        <template #description>
                            <p>Khi sản phẩm được kích hoạt chiến dịch Flash Sale thì <b class="line-through">Giá Ưu Đãi</b> sẽ không hoạt động.</p>
                            <p class="mt-1">
                                Giá bán sẽ được tính lại từ Giá gốc và Giá giảm từ Flash Sale.
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
                        :hint="`${product.discount ? `-${product.discount}%` : ''}`"
                        name="selling_price"
                        :help="`${product.special_price_type === SPECIAL_PRICE.PRICE ? 'Giá Tiền - Giá Ưu Đãi' : 'Giá Tiền - (Giá Tiền / 100) * Giá Ưu Đãi'}`"
                        text-trailing="VNĐ"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormMoney
                        :model-value="product.quantity"
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
                            :class="product.technical_specifications.length ? 'mt-4' : ''"
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

                <div class="col-span-12 flex flex-col gap-4">
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
                                :options="attributeValueList[index]?.data || []"
                                multiple
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
                        @click="$router.go(-1)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
