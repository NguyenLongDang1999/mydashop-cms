<script setup lang="ts">

// ** useHooks
const route = useRoute()

// ** Computed
const productType = computed(() => Number(route.query?.product_type))
</script>

<template>
    <section>
        <BaseTitle
            label="Quản lý sản phẩm"
            title="Sản phẩm"
        />

        <div class="mt-8 pb-24 max-w-none">
            <ProductProductCreateSingle v-if="productType === PRODUCT_TYPE.SINGLE" />
        </div>
    </section>
</template>
