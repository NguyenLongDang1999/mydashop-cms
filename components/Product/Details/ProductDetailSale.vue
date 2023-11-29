<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'
import type { IProductForm } from '~/types/product.type'

// ** Props & Emits
interface Props {
    product: IProductForm
}

const props = defineProps<Props>()

// ** Data
const items: TabItem[] = [{
    slot: 'upsell_products',
    label: 'Sản phẩm UpSell'
}, {
    slot: 'cross_sell_products',
    label: 'Sản phẩm CrossSell'
}, {
    slot: 'related_products',
    label: 'Sản phẩm liên quan'
}]

const data = ref<IProductForm>(_cloneDeep(props.product))
</script>

<template>
    <UTabs
        :items="items"
        class="w-full"
    >
        <template #upsell_products>
            <ProductSelectedTable v-model="data.upsell_products" />
        </template>

        <template #cross_sell_products>
            <ProductSelectedTable v-model="data.cross_sell_products" />
        </template>

        <template #related_products>
            <ProductSelectedTable v-model="data.related_products" />
        </template>
    </UTabs>
</template>
