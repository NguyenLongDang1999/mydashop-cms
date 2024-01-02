<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/pages'

// ** useHooks
const { data } = await usePagesDetail()
const { isPending, mutateAsync } = usePagesFormInput()

const { handleSubmit, setFieldValue } = useForm({
    validationSchema: schema,
    initialValues: _omitBy(data.value, _isNil)
})

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
            title="Pages"
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
                                Thêm mới Pages
                            </h2>
                        </div>
                    </template>

                    <div class="grid gap-4 grid-cols-12">
                        <div class="col-span-12">
                            <FormInput
                                :label="label.name"
                                name="name"
                                @update:model-value="val => setFieldValue('slug', slugify(val))"
                            />
                        </div>

                        <div class="md:col-span-6 col-span-12">
                            <FormInput
                                :label="label.slug"
                                name="slug"
                            />
                        </div>

                        <div class="md:col-span-6 col-span-12">
                            <FormSelect
                                :label="label.status"
                                :options="optionStatus"
                                name="status"
                            />
                        </div>

                        <div class="col-span-12">
                            <FormEditor
                                :label="label.content"
                                name="content"
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
