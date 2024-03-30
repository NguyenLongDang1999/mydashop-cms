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
    initialValue: props.modelValue
})

// ** Computed
const error = computed(() => errorMessage.value)
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <UTextarea
            v-model="value"
            v-bind="$attrs"
        />
    </UFormGroup>
</template>
