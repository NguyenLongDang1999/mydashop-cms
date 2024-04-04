<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types'

// ** useHooks
const { data } = await useProductCollectionRetrieve()

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
        <BaseTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật bộ sưu tập: ${data.title}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UTabs
                :items="items"
                class="w-full"
            >
                <template #detail>
                    <ProductCollectionGeneral :data="data" />
                </template>

                <template #product>
                    <ProductCollectionProduct />
                </template>
            </UTabs>
        </div>
    </section>
</template>
