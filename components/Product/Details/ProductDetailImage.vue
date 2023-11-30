<script setup lang="ts">

// ** Types Imports
import type { IProductForm } from '~/types/product.type'

// ** Props & Emits
interface Props {
    data: IProductForm
}

defineProps<Props>()

// ** useHooks
const { path } = useProduct()
const { values: product } = useForm()
const {  } = useProductUpload()
</script>

<template>
    <UForm :state="{}">
        <UCard>
            <div class="grid gap-4 grid-cols-12">
                <div class="col-span-12">
                    <UFormGroup label="Ảnh đại diện">
                        <FormUpload :image-src="getImageFile(path, data.image_uri)" />
                    </UFormGroup>
                </div>

                <div class="col-span-12">
                    <FieldArray
                        v-slot="{ push, remove }"
                        name="gallery_product"
                    >
                        <UButton
                            icon="i-heroicons-plus"
                            size="sm"
                            color="primary"
                            variant="solid"
                            label="Thêm Ảnh"
                            :trailing="false"
                            @click="push({ gallery_product: '' })"
                        />

                        <UFormGroup
                            label="Ảnh bổ sung"
                            class="mt-4"
                        >
                            <div class="grid gap-4 grid-cols-12">
                                <div
                                    v-for="(value, index) in product.gallery_product"
                                    :key="index"
                                    class="col-span-12"
                                >
                                    <div class="flex items-center gap-4">
                                        <FormInput
                                            label="alo"
                                            :name="`gallery_product.${index}`"
                                        />

                                        <FormUpload
                                            gallery
                                            :slug="data.slug"
                                        />

                                        <UButton
                                            icon="i-heroicons-arrow-up-tray"
                                            size="sm"
                                            variant="solid"
                                            label="Tải Lên"
                                            :trailing="false"
                                        />

                                        <UButton
                                            icon="i-heroicons-trash"
                                            size="sm"
                                            color="red"
                                            variant="solid"
                                            label="Xóa"
                                            @click="remove(index)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </UFormGroup>
                    </FieldArray>
                </div>
            </div>
        </UCard>
    </UForm>
</template>
