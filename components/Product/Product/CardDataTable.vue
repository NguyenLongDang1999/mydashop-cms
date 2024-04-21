<script setup lang="ts">

// ** Types Imports
import type { DropdownItem } from '#ui/types';

// ** Data
const items: DropdownItem[][] = [
    [
        {
            label: 'Sản phẩm đơn',
            to: goToPage(`create?product_type=${PRODUCT_TYPE.SINGLE}`)
        },
        {
            label: 'Sản phẩm biến thể',
            to: goToPage(`create?product_type=${PRODUCT_TYPE.VARIANT}`)
        }
    ]
]
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                    Danh sách sản phẩm
                </h2>

                <UDropdown
                    :items="items"
                    :popper="{ placement: 'bottom-start' }"
                >
                    <UButton
                        size="sm"
                        color="primary"
                        variant="solid"
                        label="Thêm Mới"
                        trailing-icon="i-heroicons-chevron-down-20-solid"
                    />
                </UDropdown>
            </div>
        </template>

        <ProductProductDataTable />
    </UCard>
</template>
