<script setup lang="ts">

// ** Type Imports
import type { ISettingSystemForm } from '~/types/setting-system.type'

// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const props = defineProps<Props>()

const schema = toTypedSchema(yup.object({
    product_collection_id: yup.array()
        .of(yup.string())
        .default([]),
    product_id: yup
        .array()
        .of(yup.string())
        .default([])
}))

// ** Props & Emits
interface Props {
    data: ISettingSystemForm[]
}

// ** Computed
const productCollection = computed(() => props.data.find(_p => _p.key === HOME_SETTING.PRODUCT_COLLECTION))

// ** useHooks
const productCollectionList = useProductCollectionDataList()
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit, values, setFieldValue } = useForm({
    validationSchema: schema,
    initialValues: {
        product_collection_id: typeof productCollection.value?.value === 'string' ? JSON.parse(productCollection.value?.value).product_collection_id : '',
        product_id: typeof productCollection.value?.value === 'string' ? JSON.parse(productCollection.value?.value).product_id : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: HOME_SETTING.PRODUCT_COLLECTION,
    key: HOME_SETTING.PRODUCT_COLLECTION,
    value: JSON.stringify({
        product_collection_id: values.product_collection_id,
        product_id: values.product_id
    }),
    input_type: INPUT_TYPE.TEXT

}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <UAlert
                    icon="i-heroicons-information-circle"
                    color="cyan"
                    variant="solid"
                    title="Thông Tin!"
                    description="- Có thể lựa chọn nhiều bộ sưu tập (1 bộ sưu tập khuyến khích nên dưới 10 sản phẩm)."
                />
            </div>

            <div class="col-span-12">
                <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                    1. Lựa chọn bộ sưu tập
                </p>
            </div>

            <div class="col-span-12">
                <FormSelect
                    label="Bộ sưu tập"
                    name="product_collection_id"
                    multiple
                    :options="productCollectionList"
                    @update:model-value="setFieldValue('product_id', [])"
                />
            </div>

            <div class="col-span-12">
                <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                    2. Lựa chọn sản phẩm
                </p>
            </div>

            <div
                v-if="values.product_collection_id"
                class="col-span-12"
            >
                <FormProductSearchSelected name="product_id" />
            </div>

            <div class="col-span-12">
                <UButton
                    type="submit"
                    size="sm"
                    variant="solid"
                    label="Lưu Lại"
                    :loading="Boolean(isPending)"
                    :trailing="false"
                />
            </div>
        </div>
    </UForm>
</template>
