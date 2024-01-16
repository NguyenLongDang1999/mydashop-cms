<script setup lang="ts">

// ** Types Imports
import type { IProductForm } from '~/types/product.type'

// ** Validations Imports
import { schema } from '~/validations/product'

// ** Props & Emits
interface Props {
    data: IProductForm
}

const props = defineProps<Props>()

// ** useHooks
const { isPending, mutateAsync } = useProductFormInput()

const { handleSubmit } = useForm<IProductForm>({
    validationSchema: schema,
    initialValues: _omitBy(props.data, _isNil)
})

const onSubmit = handleSubmit(values => mutateAsync({
    ...values,
    attributes: undefined,
    variants: undefined,
    productImage: JSON.stringify(values.productImage)
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
                    <FormUpload />
                </div>

                <div class="col-span-12">
                    <div class="grid gap-4 grid-cols-12">
                        <div
                            v-for="(value, index) in data.productImage"
                            :key="index"
                            class="col-span-12"
                        >
                            <FormUpload
                                label="Ảnh bổ sung"
                                :name="`productImage.${index}.image_uri`"
                            />
                        </div>

                        <div
                            v-for="(value, index) in (6 - data.productImage.length)"
                            :key="index"
                            class="col-span-12"
                        >
                            <FormUpload
                                label="Ảnh bổ sung"
                                :name="`productImage.${index}.image_uri`"
                            />
                        </div>
                    </div>
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
