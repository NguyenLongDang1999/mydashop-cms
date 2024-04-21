<script setup lang="ts">

// ** Type Imports
import type { ISettingSystemForm } from '~/types/setting-system.type';

// ** VeeValidate Imports
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const props = defineProps<Props>()

const schema = toTypedSchema(yup.object({
    flash_deals_id: yup.string().required(),
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
const productFlashDeals = computed(() => props.data.find(_p => _p.key === HOME_SETTING.PRODUCT_FLASH_DEALS))

// ** useHooks
const flashDealList = useProductFlashDealsDataList()
const { isPending, mutateAsync } = useSettingSystemFormInput()

const { handleSubmit, values } = useForm({
    validationSchema: schema,
    initialValues: {
        flash_deals_id: typeof productFlashDeals.value?.value === 'string' ? JSON.parse(productFlashDeals.value?.value).flash_deals_id : '',
        product_id: typeof productFlashDeals.value?.value === 'string' ? JSON.parse(productFlashDeals.value?.value).product_id : []
    }
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    label: HOME_SETTING.PRODUCT_FLASH_DEALS,
    key: HOME_SETTING.PRODUCT_FLASH_DEALS,
    value: JSON.stringify({
        flash_deals_id: values.flash_deals_id,
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
                    description="Những sản phẩm được chọn chỉ hiển thị trong trang chủ. (Khuyến khích tối đa 10 sản phẩm)"
                />
            </div>

            <div class="col-span-12">
                <FormSelect
                    label="Flash Deals"
                    name="flash_deals_id"
                    :options="flashDealList"
                />
            </div>

            <div
                v-if="values.flash_deals_id"
                class="col-span-12"
            >
                <FormProductFlashDealSearchSelected
                    name="product_id"
                    :flash-deals-id="values.flash_deals_id"
                />
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
