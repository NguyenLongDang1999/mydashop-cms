<script setup lang="ts">

// ** Types Imports
import type { IFlashSaleForm } from '~/types/flash-deals.type'

// ** Props & Emits
interface Props {
    label?: string
    name: string
    flashSale?: IFlashSaleForm
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: {
        start: props.flashSale ? new Date(props.flashSale.start_date) : new Date(),
        end: props.flashSale ? new Date(props.flashSale.end_date) : new Date()
    }
})

// ** Computed
const error = computed(() => errorMessage.value)
const formatDate = computed(() => `${dateFormat(value.value.start)} - ${dateFormat(value.value.end)}`)

// ** Methods
const dateFormat = (date: Date) => useDateFormat(date, 'DD-MM-YYYY HH:mm').value
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
                icon="i-heroicons-calendar-days-20-solid"
                :label="formatDate"
                variant="outline"
                block
                class="justify-start"
            />

            <template #panel="{ close }">
                <DatePicker
                    v-model.range="value"
                    mode="dateTime"
                    v-bind="$attrs"
                    @close="close"
                />
            </template>
        </UPopover>
    </UFormGroup>
</template>
