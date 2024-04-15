<script setup lang="ts">

// ** Types Imports
import type { VerticalNavigationLink } from '#ui/types'

// ** Data
const links: VerticalNavigationLink[] = [{
    label: 'Slider',
    to: ROUTER.SYSTEM_SETTINGS_HOME_SLIDER
}, {
    label: 'Sản phẩm Flash Deals',
    to: ROUTER.SYSTEM_SETTINGS_HOME_PRODUCT_FLASH_DEALS
}, {
    label: 'Danh mục phổ biến',
    to: ROUTER.SYSTEM_SETTINGS_HOME_PRODUCT_CATEGORY
}, {
    label: 'Bộ sưu tập',
    to: ROUTER.SYSTEM_SETTINGS_HOME_PRODUCT_COLLECTION
}]
</script>

<template>
    <UVerticalNavigation
        :links="links"
        :ui="{
            wrapper: 'border-s border-gray-200 dark:border-gray-800 space-y-2',
            base: 'group block border-s -ms-px leading-6 before:hidden',
            padding: 'p-0 ps-4',
            rounded: '',
            font: '',
            ring: '',
            active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
            inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
        }"
    />
</template>
