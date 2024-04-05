<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/product-flash-deals'

// ** Types Imports
import type { IProductFlashDealsForm } from '~/types/product-flash-deals.type'

// ** useHooks
const { isPending, mutateAsync } = useProductFlashDealsFormInput()

const { handleSubmit, values: flashDeals, setFieldValue } = useForm<IProductFlashDealsForm>({
    validationSchema: schema
})

// ** Data
const isOpen = ref<boolean>(false)

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)
    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        variant="solid"
        label="Thêm Mới"
        :trailing="false"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        prevent-close
        :ui="{
            width: 'sm:max-w-6xl'
        }"
    >
        <UForm
            :state="schema"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                            Thêm mới Flash Deals
                        </h2>

                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.title"
                            name="title"
                            @update:model-value="val => setFieldValue('slug', slugify(val))"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :label="label.slug"
                            name="slug"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :label="label.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormDatePickerRange
                            :label="label.date_range"
                            name="date_range"
                        />
                    </div>

                    <div class="col-span-12">
                        <FormTextarea
                            :label="label.description"
                            name="description"
                        />
                    </div>

                    <div class="col-span-12">
                        <UDivider />
                    </div>

                    <div class="col-span-12">
                        <FormProductSearchSelected name="product_id" />
                    </div>

                    <div class="col-span-12">
                        {{ flashDeals.product_id }}
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-center gap-4">
                        <UButton
                            type="submit"
                            size="sm"
                            variant="solid"
                            label="Thêm Mới"
                            :loading="Boolean(isPending)"
                            :trailing="false"
                        />

                        <UButton
                            type="reset"
                            size="sm"
                            color="gray"
                            variant="solid"
                            label="Huỷ Bỏ"
                            :trailing="false"
                            @click="isOpen = false"
                        />
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>