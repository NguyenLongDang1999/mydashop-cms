<script setup lang="ts">

// ** Types Imports
import type { IAttributeForm } from '~/types/attribute.type'

// ** useHooks
const route = useRoute()
const { path } = useAttribute()
const { data } = await useCrudDetail<IAttributeForm>(path.value, route.params.id as string)

// ** Data
const items = [{
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
                    <AttributeDetail
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
