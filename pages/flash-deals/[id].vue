<script setup lang="ts">

// ** Types Imports
import type { IFlashSaleForm } from '~/types/flash-deals.type'
import type { IProduct } from '~/types/product.type'

// ** Validations Imports
import { label, schema } from '~/validations/flash-deals'

// ** useHooks
const route = useRoute()
const { path } = useFlashSale()
const { data } = await useCrudDetail<IFlashSaleForm>(path.value, route.params.id as string)
const { isLoading, dataFormInput } = useCrudFormInput<IFlashSaleForm>(path.value)

const { handleSubmit, values: flashSale } = useForm({
    validationSchema: schema,
    initialValues: _omitBy(data.value, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(async values => {
    await dataFormInput({
        ...values,
        start_date: flashSale.date_range?.start,
        end_date: flashSale.date_range?.end,
        product_id: (flashSale.product_id as IProduct[])?.map(_p => _p.id)
    })

    navigateTo(ROUTER.FLASH_SALE)
})
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật chiến dịch: ${data.campaign_name}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="{}"
                @submit="onSubmit"
            >
                <UCard>
                    <div class="grid gap-4 grid-cols-12">
                        <div class="sm:col-span-6 col-span-12">
                            <FormInput
                                :label="label.campaign_name"
                                name="campaign_name"
                            />
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormMoney
                                :label="label.discount"
                                name="discount"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormDatePickerRange
                                :label="label.date_range"
                                :flash-deals="flashSale"
                                name="date_range"
                            />
                        </div>

                        <div class="col-span-12">
                            <FlashSaleProductSelected
                                :model-value="data.product_id"
                                :label="label.product_selected"
                                name="product_id"
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
        </div>
    </section>
</template>
~/validations/flash-deals
