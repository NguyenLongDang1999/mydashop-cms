<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types';

// ** useHooks
const { data } = await useCategoryRetrieve()

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
                    <CategoryDetailInformation :data="data" />
                </template>

                <template #product>
                    <CategoryDetailProduct :category-id="(data.id as string)" />
                </template>
            </UTabs>
        </div>
    </section>
</template>
