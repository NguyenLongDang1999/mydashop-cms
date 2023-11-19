
import useCoupons from '~/composables/useCoupons';
<script setup lang="ts">

// ** Types Imports
import type { ICouponsSearch } from '~/types/coupons.type'

// ** Validations Imports
import { label } from '~/validations/coupons'

// ** useHooks
const { search, path } = useCoupons()

// ** Data
const searchTemp = reactive<ICouponsSearch>(_clone(search))

// ** Methods
const handleReset = () => {
    _assign(searchTemp, {
        name: undefined,
        code: undefined,
        status: undefined
    })
    _assign(search, searchTemp)
}
</script>

<template>
    <UForm :state="search">
        <div class="grid gap-4 grid-cols-12">
            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.name"
                    :label="label.name"
                    name="name"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormInput
                    v-model="searchTemp.code"
                    :label="label.code"
                    name="code"
                />
            </div>

            <div class="md:col-span-3 sm:col-span-6 col-span-12">
                <FormSelect
                    v-model="searchTemp.status"
                    :label="label.status"
                    :options="optionStatus"
                    name="status"
                />
            </div>

            <div class="col-span-12">
                <div class="flex justify-center gap-4">
                    <UButton
                        type="submit"
                        icon="i-heroicons-magnifying-glass"
                        size="sm"
                        variant="solid"
                        label="Tìm Kiếm"
                        :trailing="false"
                        @click="_assign(search, searchTemp)"
                    />

                    <UButton
                        type="reset"
                        icon="i-heroicons-arrow-path"
                        size="sm"
                        color="gray"
                        variant="solid"
                        label="Làm Mới"
                        :trailing="false"
                        @click="handleReset"
                    />
                </div>
            </div>
        </div>
    </UForm>
</template>
