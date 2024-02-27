<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types'

// ** Data
const items: TabItem[] = [{
    slot: 'detail',
    label: 'Thông tin chi tiết'
}, {
    slot: 'attribute_products',
    label: 'Thuộc tính'
}, {
    slot: 'sale_products',
    label: 'Sản phẩm Sale'
}, {
    slot: 'image_products',
    label: 'Hình ảnh sản phẩm'
}]

// ** useHooks
const route = useRoute()
const { data } = await useProductDetail()

// ** Computed
const defaultIndex = computed(() => items.findIndex(item => item.slot === route.query.tab))

// ** Methods
const onChange = (index: number) => {
    const item = items[index]

    return navigateTo({
        path: route.path,
        query: {
            tab: item.slot
        }
    })
}
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật sản phẩm: ${data.name}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UTabs
                :items="items"
                class="w-full"
                :default-index="defaultIndex === -1 ? 0 : defaultIndex"
                @change="onChange"
            >
                <template #detail>
                    <ProductDetailInformation :data="data" />
                </template>

                <template #attribute_products>
                    <ProductDetailAttribute :data="data" />
                </template>

                <template #sale_products>
                    <ProductDetailSale :data="data" />
                </template>

                <template #image_products>
                    <ProductDetailImage :data="data" />
                </template>
            </UTabs>
        </div>
    </section>
</template>
