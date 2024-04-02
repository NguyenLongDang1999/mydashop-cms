<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '#ui/types';

// ** Data
const items: TabItem[] = [{
    slot: 'detail',
    label: 'Thông tin chi tiết'
}, {
    slot: 'sale_products',
    label: 'Sản phẩm Sale'
}, {
    slot: 'image_products',
    label: 'Hình ảnh sản phẩm'
}]

// ** useHooks
const route = useRoute()
const { data } = await useProductRetrieve()

// ** Computed
const defaultIndex = computed(() => computedItems.value.findIndex(item => item.slot === route.query.tab))
const productTypeSingle = computed(() => data.value.product_type === PRODUCT_TYPE.SINGLE)
const computedItems = computed(() => {
    const newItems = [...items]
    
    if (!productTypeSingle.value) {
        const detailIndex = newItems.findIndex(item => item.slot === 'detail')
        
        if (detailIndex !== -1) {
            newItems.splice(detailIndex + 1, 0, {
                slot: 'attribute_products',
                label: 'Thuộc tính'
            })
        }
    }
    
    return newItems
})

// ** Methods
const onChange = (index: number) => {
    const item = computedItems.value[index]

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
        <BaseTitle
            label="Quản lý sản phẩm"
            :title="`Cập nhật sản phẩm: ${data.name}`"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UTabs
                :items="computedItems"
                class="w-full"
                :default-index="defaultIndex === -1 ? 0 : defaultIndex"
                @change="onChange"
            >
                <template #detail>
                    <ProductProductRetrieveGeneralSingle
                        v-if="productTypeSingle"
                        :data="data"
                    />

                    <ProductProductRetrieveGeneralVariants
                        v-else
                        :data="data"
                    />
                </template>

                <template #attribute_products>
                    <ProductProductRetrieveAttributeVariants :data="data" />
                </template>

                <template #sale_products>
                    <!-- <ProductDetailSale :data="data" /> -->
                </template>

                <template #image_products>
                    <ProductProductRetrieveImages :data="data" />
                </template>
            </UTabs>
        </div>
    </section>
</template>
