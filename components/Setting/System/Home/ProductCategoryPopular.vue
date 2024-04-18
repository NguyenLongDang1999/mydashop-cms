<script setup lang="ts">

// ** Type Imports
import type { ISettingSystemForm } from '~/types/setting-system.type';

// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const schema = toTypedSchema(yup.object({
    product_category_id: yup
        .array()
        .of(yup.string())
        .default([]),
}))

// ** Props & Emits
interface Props {
    data: ISettingSystemForm[]
}

const props = defineProps<Props>()

// ** Computed
const productCategory = computed(() => props.data.find(_p => _p.key === HOME_SETTING.PRODUCT_CATEGORIES_POPULAR))

// ** useHooks
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
        product_category_id: typeof productCategory.value?.value === 'string' ? JSON.parse(productCategory.value?.value) : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: HOME_SETTING.PRODUCT_CATEGORIES_POPULAR,
    key: HOME_SETTING.PRODUCT_CATEGORIES_POPULAR,
    value: JSON.stringify(values.product_category_id),
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
                    description="Những danh mục được chọn chỉ hiển thị trong trang chủ. (Khuyến khích tối đa 10 sản phẩm)"
                />
            </div>

            <div class="col-span-12">
                <FormCategorySearchSelected name="product_category_id" />
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
