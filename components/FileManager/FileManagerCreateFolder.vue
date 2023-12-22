<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/file-manager'

// ** Data
const isOpen = ref<boolean>(false)

// ** useHooks
const { handleSubmit } = useForm({ validationSchema: schema })
const { mutateAsync } = useFileManagerCreateFolder()

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values.folder_name)
    isOpen.value = false
})
</script>

<template>
    <UButton
        icon="i-heroicons-folder-plus"
        size="sm"
        square
        label="Tạo Folder"
        color="gray"
        variant="solid"
        @click="isOpen = true"
    />

    <UModal
        v-model="isOpen"
        :ui="{
            width: 'sm:max-w-sm'
        }"
    >
        <UForm
            :state="{}"
            class="space-y-4 md:space-y-6"
            @submit="onSubmit"
        >
            <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="capitalize text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Tạo Folder
                        </h3>

                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            @click="isOpen = false"
                        />
                    </div>
                </template>

                <FormInput
                    :label="label.folder_name"
                    name="folder_name"
                />

                <template #footer>
                    <div class="flex justify-center gap-2">
                        <UButton
                            color="primary"
                            variant="solid"
                            label="Xác Nhận"
                            type="submit"
                        />

                        <UButton
                            color="red"
                            variant="solid"
                            label="Huỷ Bỏ"
                            @click="isOpen = false"
                        />
                    </div>
                </template>
            </UCard>
        </UForm>
    </UModal>
</template>
