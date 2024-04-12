<script setup lang="ts">

// ** Types Imports
import type { IProductCollectionForm } from '~/types/product-collection.type'

// ** Validations Imports
import { label, schema } from '~/validations/product-collection'

// ** Props & Emits
interface Props {
    data: IProductCollectionForm
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useProductCollectionFormInput()

const { handleSubmit, setFieldValue } = useForm<IProductCollectionForm>({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

// ** Methods
const onSubmit = handleSubmit(values => mutateAsync(values))
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

                <div class="sm:col-span-4 col-span-12">
                    <FormInput
                        :label="label.title"
                        name="title"
                        @update:model-value="val => setFieldValue('slug', slugify(val))"
                    />
                </div>

                <div class="sm:col-span-4 col-span-12">
                    <FormInput
                        :label="label.slug"
                        name="slug"
                    />
                </div>

                <div class="sm:col-span-4 col-span-12">
                    <FormSelect
                        :label="label.status"
                        :options="optionStatus"
                        name="status"
                    />
                </div>

                <div class="col-span-12">
                    <p class="text-sm/6 font-semibold flex items-center gap-1.5 capitalize">
                        2. Lựa chọn sản phẩm
                    </p>
                </div>

                <div class="col-span-12">
                    <FormProductSearchSelected name="product_id" />
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
                        @click="$router.go(-1)"
                    />
                </div>
            </template>
        </UCard>
    </UForm>
</template>
