<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'
import type { IBrandForm } from '~/types/brand.type'

// ** useHooks
const route = useRoute()
const { path } = useBrand()
const { data } = await useCrudDetail<IBrandForm>(path.value, route.params.id as string)

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
                    <BrandDetail
                        :data="data"
                        :path="path"
                    />
                </template>

                <template #product>
                    ?
                </template>
            </UTabs>
        </div>
    </section>
</template>
