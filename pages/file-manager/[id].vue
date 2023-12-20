<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'

// ** useHooks
const { path, data } = await useCategoryDetail()

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
                    <CategoryDetailProduct :category-id="(data.id as number)" />
                </template>
            </UTabs>
        </div>
    </section>
</template>
