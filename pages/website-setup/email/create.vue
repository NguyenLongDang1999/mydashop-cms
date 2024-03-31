<script setup lang="ts">

// ** Types Imports
import type { IPagesForm } from '~/types/pages.type'

// ** Validations Imports
import { label, schema } from '~/validations/email'

// ** useHooks
const { isPending, mutateAsync } = usePagesFormInput()
const { handleSubmit, setFieldValue } = useForm<IPagesForm>({ validationSchema: schema })

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync(values)
    navigateTo(ROUTER.WEBSITE_SETUP + '/pages')
})
</script>

<template>
    <section>
        <TheTitle
            label="Thiết lập WEBSITE"
            title="Thiết lập Email"
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
                                Thêm mới Email
                            </h2>
                        </div>
                    </template>

                    <div class="grid gap-4 grid-cols-12">
                        <div class="md:col-span-6 col-span-12">
                            <FormInput
                                :label="label.name"
                                name="name"
                                @update:model-value="val => setFieldValue('slug', slugify(val))"
                            />
                        </div>

                        <div class="md:col-span-6 col-span-12 hidden">
                            <FormInput
                                :label="label.slug"
                                name="slug"
                            />
                        </div>

                        <div class="md:col-span-6 col-span-12">
                            <FormInput
                                :label="label.subject"
                                name="subject"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormEditor
                                :label="label.body"
                                name="body"
                            />
                        </div>
                    </div>

                    <template #footer>
                        <div class="flex justify-start gap-4">
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
                                label="Quay Lại"
                                :trailing="false"
                                :to="goToPage('', ROUTER.WEBSITE_SETUP + '/pages')"
                            />
                        </div>
                    </template>
                </UCard>
            </UForm>
        </div>
    </section>
</template>
