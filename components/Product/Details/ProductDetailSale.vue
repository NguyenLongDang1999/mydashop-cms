<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types'
import type { IProductForm } from '~/types/product.type'

// ** Props & Emits
interface Props {
    data: IProductForm
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

const product = ref<IProductForm>(_cloneDeep(props.data))
</script>

<template>
    <UTabs
        :items="items"
        class="w-full"
    >
        <template #upsell_products>
            <ProductSelectedTable
                v-model="product.upsell_products"
                :data="data"
                name="upsell_products"
            />
        </template>

        <template #cross_sell_products>
            <ProductSelectedTable
                v-model="product.cross_sell_products"
                :data="data"
                name="cross_sell_products"
            />
        </template>

        <template #related_products>
            <ProductSelectedTable
                v-model="product.related_products"
                :data="data"
                name="related_products"
            />
        </template>
    </UTabs>
</template>
