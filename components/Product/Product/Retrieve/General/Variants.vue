<script setup lang="ts">

// ** Types Imports
import type { IProductFormVariant } from '~/types/product.type'

// ** Validations Imports
import { label, schemaVariantsGeneral } from '~/validations/product'

// ** Props & Emits
interface Props {
    data: IProductFormVariant
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useProductFormInput<IProductFormVariant>()

const { handleSubmit, values: product, setFieldValue } = useForm<IProductFormVariant>({
    validationSchema: schemaVariantsGeneral,
    initialValues: _omitBy(props.data, _isNil)
})

// ** Computed
const hasTechnicalSpecifications = computed(() => product.technical_specifications && product.technical_specifications.length > 0)

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync({
    id: values.id,
    name: values.name,
    slug: values.slug,
    status: values.status,
    short_description: values.short_description,
    description: values.description,
    technical_specifications: values.technical_specifications ? JSON.stringify(values.technical_specifications) : undefined,
    meta_title: values.meta_title,
    meta_description: values.meta_description
}))
</script>

<template>
    <UForm
        :state="{}"
        @submit="onSubmit"
    >
        <UCard>
            <div class="grid gap-4 grid-cols-12">
                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        1. Thông tin chung
                    </p>
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormInput
                        :label="label.name"
                        name="name"
                        @update:model-value="val => setFieldValue('slug', slugify(val))"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormInput
                        :label="label.slug"
                        name="slug"
                    />
                </div>

                <div class="md:col-span-4 sm:col-span-6 col-span-12">
                    <FormSelect
                        :label="label.status"
                        :options="optionStatus"
                        name="status"
                    />
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        2. Thông số kỹ thuật
                    </p>
                </div>

                <div class="col-span-12">
                    <FieldArray
                        v-slot="{ push, remove }"
                        name="technical_specifications"
                    >
                        <UButton
                            icon="i-heroicons-plus"
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Thông Số"
                            :trailing="false"
                            @click="push({ title: '', content: '' })"
                        />

                        <div
                            class="flex flex-col gap-4"
                            :class="hasTechnicalSpecifications ? 'mt-4' : ''"
                        >
                            <div
                                v-for="(value, index) in product.technical_specifications"
                                :key="index"
                                class="grid gap-4 grid-cols-12"
                            >
                                <div class="col-span-4">
                                    <FormInput
                                        :label="label.technical_specifications.title"
                                        :name="`technical_specifications.${index}.title`"
                                    />
                                </div>

                                <div class="col-span-4">
                                    <FormInput
                                        :label="label.technical_specifications.content"
                                        :name="`technical_specifications.${index}.content`"
                                    />
                                </div>

                                <div class="col-span-3">
                                    <UButton
                                        :ui="{ rounded: 'rounded-full' }"
                                        icon="i-heroicons-trash"
                                        size="sm"
                                        color="red"
                                        variant="solid"
                                        class="mt-6"
                                        @click="remove(index)"
                                    />
                                </div>
                            </div>
                        </div>
                    </FieldArray>
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        3. Mô tả sản phẩm
                    </p>
                </div>

                <div class="col-span-12">
                    <FormInput
                        :label="label.short_description"
                        name="short_description"
                    />
                </div>

                <div class="col-span-12">
                    <FormEditor
                        :label="label.description"
                        name="description"
                    />
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        4. Meta SEO
                    </p>
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
                        label="Cập Nhật"
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
                        :to="goToPage('', ROUTER.PRODUCT)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
