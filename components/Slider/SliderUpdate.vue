<script setup lang="ts">

// ** Types Imports
import type { ISliderForm } from '~/types/slider.type'

// ** Validations Imports
import { label, schema } from '~/validations/slider'

// ** Props & Emits
interface Props {
    path: string
    slider: ISliderForm
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useSliderFormInput('PATCH')

const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: _omitBy(props.slider, _isNil)
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
        icon="i-heroicons-pencil-square"
        size="sm"
        color="orange"
        square
        variant="solid"
        @click="isOpen = true"
    />

    <UModal v-model="isOpen">
        <UForm
            :state="{}"
            @submit="onSubmit"
        >
            <UCard>
                <template #header>
                    <h2 class="capitalize my-0 font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                        Cập nhật slider
                    </h2>
                </template>

                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-12">
                        <FormUpload :image-src="getImageFile(path, slider.image_uri)" />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :model-value="slider.name"
                            :label="label.name"
                            name="name"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :model-value="slider.url"
                            :label="label.url"
                            name="url"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormSelect
                            :model-value="slider.status"
                            :label="label.status"
                            :options="optionStatus"
                            name="status"
                        />
                    </div>

                    <div class="sm:col-span-6 col-span-12">
                        <FormInput
                            :model-value="slider.description"
                            :label="label.description"
                            name="description"
                        />
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-center gap-4">
                        <UButton
                            type="submit"
                            size="sm"
                            variant="solid"
                            label="Cập Nhật"
                            :loading="isPending"
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
