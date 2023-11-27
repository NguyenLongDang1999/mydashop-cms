<script setup lang="ts">

// ** Types Imports
import type { IFlashSaleForm } from '~/types/flash-sale.type'

// ** Validations Imports
import { label, schema } from '~/validations/flash-sale'

// ** useHooks
const { path } = useFlashSale()
const { isLoading, dataFormInput } = useCrudFormInput<IFlashSaleForm>(path.value)
const { handleSubmit, values: flashSale } = useForm({ validationSchema: schema })

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await dataFormInput({
        ...values,
        start_date: flashSale.date_range?.start,
        end_date: flashSale.date_range?.end
    })

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

    <UModal v-model="isOpen">
        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                        Thêm mới chiến dịch
                    </h2>
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
                    <div class="flex justify-center gap-4">
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
