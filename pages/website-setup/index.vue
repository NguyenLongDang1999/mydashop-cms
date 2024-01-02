<script setup lang="ts">

// ** Types Imports
import type { TabItem } from '@nuxt/ui/dist/runtime/types'

// ** Data
const items: TabItem[] = [{
    label: 'Slider',
    slot: 'home-slider'
}, {
    label: 'Banner Level 1',
    slot: 'home-banner-level-1'
}, {
    label: 'Banner Level 2',
    slot: 'home-banner-level-2'
}, {
    label: 'Banner Level 3',
    slot: 'home-banner-level-3'
}, {
    label: 'Danh mục trang chủ',
    slot: 'home_categories'
}, {
    label: 'Top thương hiệu',
    slot: 'top_brands'
}]

// ** useHooks
const route = useRoute()

// ** Computed
const defaultIndex = computed(() => items.findIndex(item => item.slot === route.query.tab))

// ** Methods
const onChange = (index: number) => navigateTo({
    path: route.path,
    query: { tab: items[index].slot }
})
</script>

<template>
    <section>
        <TheTitle
            label="Thiết lập WEBSITE"
            title="Thiết Lập Trang Chủ"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <template #header>
                    <div class="flex justify-between items-center">
                        <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                            Thiết lập trang chủ
                        </h2>
                    </div>
                </template>

                <UTabs
                    :items="items"
                    :ui="{ wrapper: 'flex items-start gap-4 space-y-0', list: { width: 'w-48', tab: { base: 'justify-start' } } }"
                    :default-index="defaultIndex === -1 ? 0 : defaultIndex"
                    orientation="vertical"
                    @change="onChange"
                >
                    <template #home-slider>
                        <WebsiteSetupHomeSlider />
                    </template>

                    <template #home-banner-level-1>
                        <WebsiteSetupBanner1 />
                    </template>

                    <template #home-banner-level-2>
                        <WebsiteSetupBanner2 />
                    </template>

                    <template #home-banner-level-3>
                        <WebsiteSetupBanner3 />
                    </template>

                    <template #home_categories>
                        <WebsiteSetupHomeCategories />
                    </template>

                    <template #top_brands>
                        <WebsiteSetupTopBrands />
                    </template>
                </UTabs>
            </UCard>
        </div>
    </section>
</template>
