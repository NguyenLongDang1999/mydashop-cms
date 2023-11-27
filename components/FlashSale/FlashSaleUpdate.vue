<script setup lang="ts">

// ** Types Imports
import type { IFlashSaleForm } from '~/types/flash-sale.type'

// ** Validations Imports
import { label, schema } from '~/validations/flash-sale'

// ** Props & Emits
interface Props {
    flashSale: IFlashSaleForm
}

const props = defineProps<Props>()

// ** useHooks
const { path } = useFlashSale()
const { isLoading, dataFormInput } = useCrudFormInput<IFlashSaleForm>(path.value)

const { handleSubmit, values: form } = useForm({
    validationSchema: schema,
    initialValues: _omitBy(props.flashSale, _isNil)
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Computed
const product_id = computed(() => form.FlashSaleProduct.map((_p: IFlashSaleForm) => _p.product_id))

// ** Methods
const onSubmit = handleSubmit(async values => {
    await dataFormInput({
        ...values,
        start_date: form.date_range?.start,
        end_date: form.date_range?.end
    })

    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="orange"
        square
        variant="solid"
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
                        Cập nhật chiến dịch
                    </h2>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :model-value="flashSale.campaign_name"
                            :label="label.campaign_name"
                            name="campaign_name"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormMoney
                            :model-value="flashSale.discount"
                            :label="label.discount"
                            name="discount"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormDatePickerRange
                            :label="label.date_range"
                            :flash-sale="flashSale"
                            name="date_range"
                        />
                    </div>

                    <div class="col-span-12">
                        <FlashSaleProductSelected
                            :model-value="product_id"
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
                            label="Cập Nhật"
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
