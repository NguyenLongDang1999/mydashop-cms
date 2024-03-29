<script setup lang="ts">

// ** Types Imports
import type { ICouponsForm } from '~/types/coupons.type'

// ** Validations Imports
import { label, schema } from '~/validations/coupons'

// ** useHooks
const { isPending, mutateAsync } = useCouponsFormInput()
const { handleSubmit, values: coupons } = useForm<ICouponsForm>({ validationSchema: schema })

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        discount_start_date: coupons.date_range?.start as string,
        discount_end_date: coupons.date_range?.end as string
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

    <UModal
        v-model="isOpen"
        prevent-close
    >
        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                            Thêm mới Coupons
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
                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.code"
                            name="code"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormMoney
                            :label="label.min_buy"
                            name="min_buy"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.discount_type"
                            :options="optionTypeDiscount"
                            name="discount_type"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormMoney
                            :label="label.discount_amount"
                            name="discount_amount"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormDatePickerRange
                            :label="label.date_range"
                            name="date_range"
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
