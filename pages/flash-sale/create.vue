<script setup lang="ts">

// ** Types Imports
import type { IFlashSaleForm } from '~/types/flash-sale.type'
import type { IProduct } from '~/types/product.type'

// ** Validations Imports
import { label, schema } from '~/validations/flash-sale'

// ** useHooks
const { path } = useFlashSale()
const { isLoading, dataFormInput } = useCrudFormInput<IFlashSaleForm>(path.value)
const { handleSubmit, values: flashSale } = useForm({ validationSchema: schema })

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
            title="Chiến dịch"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="{}"
                @submit="onSubmit"
            >
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                                Thêm mới chiến dịch
                            </h2>
                        </div>
                    </template>

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
                                name="date_range"
                            />
                        </div>

                        <div class="col-span-12">
                            <FlashSaleProductSelected
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
                                label="Thêm Mới"
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
                                @click="navigateTo(ROUTER.FLASH_SALE)"
                            />
                        </div>
                    </template>
                </UCard>
            </UForm>
        </div>
    </section>
</template>
