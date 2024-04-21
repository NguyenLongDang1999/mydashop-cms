<script setup lang="ts">

// ** Props & Emits
interface Props {
    name: string
    label?: string
    search?: boolean
    modelValue?: string | number
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue
})

// ** Computed
const searchName = computed(() => props.search ? `search_${props.name}` : props.name)
const error = computed(() => errorMessage.value)
</script>

<template>
    <UFormGroup
        :label="label"
        :name="searchName"
        :error="error"
    >
        <UInput
            v-model="value"
            v-bind="$attrs"
        />
    </UFormGroup>
</template>
