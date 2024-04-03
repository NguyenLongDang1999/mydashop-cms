<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types'
import type { IProductFormVariant } from '~/types/product.type'

// ** Props & Emits
interface Props {
    data: IProductFormVariant
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

const product = ref<IProductFormVariant>(_cloneDeep(props.data))
</script>

<template>
    <UTabs
        :items="items"
        class="w-full"
    >
        <template #upsell_products>
            <ProductProductRetrieveSelectedTable
                v-model="product.product_upsell"
                :data="data"
                :name="RELATIONS_TYPE.UPSELL"
            />
        </template>

        <template #cross_sell_products>
            <ProductProductRetrieveSelectedTable
                v-model="product.product_cross_sell"
                :data="data"
                :name="RELATIONS_TYPE.CROSS_SELL"
            />
        </template>

        <template #related_products>
            <ProductProductRetrieveSelectedTable
                v-model="product.product_related"
                :data="data"
                :name="RELATIONS_TYPE.RELATED"
            />
        </template>
    </UTabs>
</template>
