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
