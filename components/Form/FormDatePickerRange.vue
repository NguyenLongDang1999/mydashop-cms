<script setup lang="ts">

// ** Types Imports
import type { IDateRangePicker } from '~/types/core.type'

// ** Props & Emits
interface Props {
    name: string
    label?: string
    data?: IDateRangePicker
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: {
        start: props.data ? new Date(props.data.start_date) : new Date(),
        end: props.data ? new Date(props.data.end_date) : new Date()
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
