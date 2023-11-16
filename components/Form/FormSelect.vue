<script setup lang="ts">

// ** Types Imports
import type { IOptions } from '~/types/core.type';

// ** Props & Emits
interface Props {
    label?: string
    name: string
    multiple?: boolean
    options: IOptions[]
    modelValue?: string | number | string[] | (number | undefined)[]
}

const props = defineProps<Props>()

// ** useHooks
const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.multiple || Array.isArray(props.modelValue) 
        ? props.modelValue || [] 
        : props.modelValue || undefined
})

// ** Computed
const error = computed(() => errorMessage.value)
const dataList = computed(() => props.options.filter(_p => value.value?.includes(_p.id)))
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <USelectMenu
            v-model="value"
            :options="options"
            searchable
            placeholder="Vui Lòng Chọn"
            value-attribute="id"
            option-attribute="name"
            :multiple="multiple"
            :loading="$attrs.loading"
            v-bind="$attrs"
        >
            <template #label>
                <span v-if="!Array.isArray(value)">
                    {{ valueTransform(options, Number(value))?.name || 'Vui Lòng Chọn' }}
                </span>

                <span v-else>
                    {{ dataList.map(_v => _v.name).join(', ') || 'Vui Lòng Chọn' }}
                </span>
            </template>
        </USelectMenu>
    </UFormGroup>
</template>
