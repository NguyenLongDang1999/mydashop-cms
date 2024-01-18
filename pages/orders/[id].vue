<script setup lang="ts">

// ** useHooks
const { data } = await useCategoryDetail()
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý bán hàng"
            title="Chi tiết đơn hàng"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        ??
                    </div>
                </div>
            </UCard>
        </div>
    </section>
</template>
