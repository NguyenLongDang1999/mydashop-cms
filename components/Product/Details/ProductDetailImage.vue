<script setup lang="ts">

// ** Types Imports
import type { IProductForm } from '~/types/product.type'

// ** Props & Emits
interface Props {
    data: IProductForm
}

const props = defineProps<Props>()

// ** useHooks
const { galleryURL } = useProduct()

// ** Methods
function onFileInput(e: Event, index: number, image_id?: number) {
    const fileValue = (e.target as HTMLInputElement).files![0]

    if (fileValue) {
        galleryURL[index] = {
            id: props.data.id,
            index,
            image_id,
            slug: props.data.slug + '-' + new Date().getTime(),
            image_uri: fileValue
        }
    }
}
</script>

<template>
    <UForm :state="{}">
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
                            <div class="flex items-center gap-4">
                                <FormUpload
                                    :image-src="getPathImageFile(value.image_uri as string)"
                                    label="Ảnh bổ sung"
                                    @input="e => onFileInput(e, index, value.id)"
                                />

                                <UButton
                                    icon="i-heroicons-pencil-square"
                                    size="sm"
                                    variant="solid"
                                    color="red"
                                    label="Cập Nhật"
                                    :trailing="false"
                                />
                                <!-- @click="dataFormInput(galleryURL[index])" -->
                            </div>
                        </div>

                        <div
                            v-for="(value, index) in (6 - data.productImage.length)"
                            :key="index"
                            class="col-span-12"
                        >
                            <div class="flex items-center gap-4">
                                <FormUpload
                                    label="Ảnh bổ sung"
                                    @input="e => onFileInput(e, index + data.productImage.length)"
                                />

                                <UButton
                                    icon="i-heroicons-arrow-up-tray"
                                    size="sm"
                                    variant="solid"
                                    label="Tải Lên"
                                    :trailing="false"
                                />
                                <!-- @click="dataFormInput(galleryURL[index + data.productImage.length])" -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UCard>
    </UForm>
</template>
