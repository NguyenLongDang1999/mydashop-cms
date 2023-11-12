<script setup lang="ts">

// ** Types Imports
import type { IProductList } from '~/types/product.type'

// ** Props & Emits
interface Props {
    label?: string
    name: string
    modelValue?: number[]
}

const props = defineProps<Props>()

// ** useHooks
const { path } = useProduct()
const { dataList, isLoading } = useCrudDataList<IProductList>(path.value)

const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue || []
})

// ** Computed
const error = computed(() => errorMessage.value)

const productList = computed(() => dataList.value.map(_p => ({
    id: _p.id,
    label: _p.name,
    avatar: { src: getImageFile(path.value, _p.image_uri) }
})))

const productSelected = computed(() => productList.value.filter(_p => value.value.includes(_p.id)))
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <USelectMenu
            v-model="value"
            :options="productList"
            :loading="isLoading"
            searchable
            multiple
            placeholder="Vui Lòng Chọn"
            value-attribute="id"
            option-attribute="label"
        >
            <template #label>
                <ul
                    v-if="value.length"
                    class="flex flex-col gap-1"
                >
                    <li
                        v-for="product in productSelected"
                        :key="product.id"
                    >
                        <div class="flex items-center gap-1">
                            <UAvatar
                                :src="product.avatar.src"
                                :alt="product.label"
                            />

                            <span class="capitalize line-clamp-1 flex-1">{{ product.label }}</span>
                        </div>
                    </li>
                </ul>

                <span v-else>Vui Lòng Chọn</span>
            </template>
        </USelectMenu>
    </UFormGroup>
</template>
