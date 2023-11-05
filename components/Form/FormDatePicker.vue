<script setup lang="ts">

// ** Props & Emits
interface Props {
    label?: string
    name: string
    modelValue?: string | number
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: new Date()
})

// ** Computed
const error = computed(() => errorMessage.value)

const formatDate = computed(() => useDateFormat(value.value, 'DD-MM-YYYY').value)
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
                <LazyDatePicker
                    v-model="value"
                    v-bind="$attrs"
                    @close="close"
                />
            </template>
        </UPopover>
    </UFormGroup>
</template>
