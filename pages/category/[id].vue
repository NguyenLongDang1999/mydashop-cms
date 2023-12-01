<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'
import type { ICategoryForm } from '~/types/category.type'

// ** useHooks
const route = useRoute()
const { path } = useCategory()
const { data } = await useCrudDetail<ICategoryForm>(path.value, route.params.id as string)

// ** Data
const items: TabItem[] = [{
    slot: 'detail',
    label: 'Thông tin chi tiết'
}, {
    slot: 'product',
    label: 'Sản phẩm'
}]
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật danh mục: ${data.name}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UTabs
                :items="items"
                class="w-full"
            >
                <template #detail>
                    <CategoryDetailInformation
                        :data="data"
                        :path="path"
                    />
                </template>

                <template #product>
                    <CategoryDetailProduct :category-id="Number(route.params.id)" />
                </template>
            </UTabs>
        </div>
    </section>
</template>
