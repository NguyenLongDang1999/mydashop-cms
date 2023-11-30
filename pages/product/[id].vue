<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'
import type { IProductForm } from '~/types/product.type'

// ** Data
const items: TabItem[] = [{
    slot: 'detail',
    label: 'Thông tin chi tiết'
}, {
    slot: 'sale_products',
    label: 'Sản phẩm Sale'
}]

// ** useHooks
const route = useRoute()
const { path } = useProduct()
const { data } = await useCrudDetail<IProductForm>(path.value, route.params.id as string)
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
            >
                <template #detail>
                    <ProductDetailInformation :data="data" />
                </template>

                <template #sale_products>
                    <ProductDetailSale :data="data" />
                </template>
            </UTabs>
        </div>
    </section>
</template>
