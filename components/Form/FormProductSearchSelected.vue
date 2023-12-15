<script setup lang="ts">

// ** Types Imports
import type { ISearchDropdown } from '~/types/core.type'
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

const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue || []
})

// ** Data
const productList = ref<ISearchDropdown[]>([])
const productSelected = ref<ISearchDropdown[]>([])

// ** Computed
const error = computed(() => errorMessage.value)

const search = async (q?: string) => {
    if (q) {
        const dataList = await useFetcher<IProductList[]>(`${path.value}/data-list`, { params: { q } })

        productList.value = dataList.map(_p => ({
            id: _p.id,
            label: _p.name,
            avatar: { src: getImageFile(path.value, _p.image_uri) }
        })).filter(Boolean)

        return productList.value
    }

    return []
}

// ** Watch
watch(value, newValue => productSelected.value = _cloneDeep(newValue))
</script>

<template>
    <UFormGroup
        :label="label"
        :name="name"
        :error="error"
    >
        <USelectMenu
            v-model="value"
            :searchable="search"
            multiple
            placeholder="Vui Lòng Chọn"
            by="id"
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
