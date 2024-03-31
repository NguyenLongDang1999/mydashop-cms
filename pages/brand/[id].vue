<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types'

// ** useHooks
const { data } = await useBrandRetrieve()

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
            :title="`Cập nhật thương hiệu: ${data.name}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UTabs
                :items="items"
                class="w-full"
            >
                <template #detail>
                    <BrandDetail :data="data" />
                </template>

                <template #product>
                    ?
                </template>
            </UTabs>
        </div>
    </section>
</template>
