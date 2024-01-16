<script setup lang="ts">

// ** Types Imports
import type { IWebsiteSetupForm } from '~/types/website-setup'

// ** Validations Imports
import { label, schema } from '~/validations/system'

// ** useHooks
const { isPending, mutateAsync } = useWebsiteSetupFormInput()
const { valueData } = await useWebsiteSetupSystem()

const { handleSubmit } = useForm<IWebsiteSetupForm>({
    validationSchema: schema,
    initialValues: valueData.value
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    slug: '',
    value: '',
    bulkData: JSON.stringify(values)
}))
</script>

<template>
    <section>
        <TheTitle
            label="Thiết lập WEBSITE"
            title="Thiết Lập Hệ Thống"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="{}"
                @submit="onSubmit"
            >
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                                Thiết lập hệ thống
                            </h2>
                        </div>
                    </template>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="sm:col-span-6 col-span-12">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12">
                                    <FormUpload
                                        :label="label.website_favicon"
                                        name="website_favicon"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormUpload
                                        :label="label.website_logo"
                                        name="website_logo"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.website_name"
                                        name="website_name"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.website_motto"
                                        name="website_motto"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormSelect
                                        :label="label.website_colour"
                                        :options="optionColourWebsite"
                                        name="website_colour"
                                        colour
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.meta_title"
                                        name="meta_title"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <FormInput
                                        :label="label.meta_description"
                                        name="meta_description"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <template #footer>
                        <UButton
                            type="submit"
                            size="sm"
                            variant="solid"
                            label="Lưu Lại"
                            :loading="Boolean(isPending)"
                            :trailing="false"
                        />
                    </template>
                </UCard>
            </UForm>
        </div>
    </section>
</template>
