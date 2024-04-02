<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types'

// ** useHooks
const { data } = await useProductAttributeRetrieve()

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
            :title="`Cập nhật thuộc tính: ${data.name}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UTabs
                :items="items"
                class="w-full"
            >
                <template #detail>
                    <ProductAttributeGeneral :data="data" />
                </template>

                <template #product />
            </UTabs>
        </div>
    </section>
</template>
