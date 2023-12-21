<script setup lang="ts">

// ** Props & Emits
interface Props {
    imageSrc?: string
    gallery?: boolean
}

const props = defineProps<Props>()

// ** Data
const file = ref<File | null>()
const { base64: fileURL } = useBase64(file)

const isOpen = ref<boolean>(false)


// ** useHooks
const { imageURL } = useImage()

// ** Methods
function onFileInput(e: Event) {
    const fileValue = (e.target as HTMLInputElement).files![0]

    if (fileValue) {
        file.value = fileValue
        imageURL.value = !props.gallery ? fileValue : undefined
    }
}
</script>

<template>
    <div class="flex items-center gap-3">
        <div
            v-if="fileURL || imageSrc"
            class="relative group"
        >
            <UAvatar
                :src="fileURL || imageSrc"
                size="3xl"
                icon="i-heroicons-photo"
                class="w-40 h-40 group-hover:opacity-10"
                :ui="{
                    rounded: 'rounded-md',
                    size: {
                        '3xl': 'h-40 w-40'
                    }
                }"
            />

            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform scale-0 group-hover:scale-100 cursor-pointer"
                @click="file = null"
            >
                <UIcon
                    name="i-heroicons-trash"
                    class="w-7 h-7 text-gray-400"
                />
            </div>
        </div>

        <div class="w-40 h-40">
            <label
                class="flex w-full h-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
                @click="isOpen = true"
            >
                <div class="space-y-1 text-center">
                    <UIcon
                        name="i-heroicons-plus"
                        class="w-7 h-7 text-gray-400"
                    />
                </div>
            </label>
        </div>

        <UModal
            v-model="isOpen"
            fullscreen
        >
            <FileManagerDataTable :close-button="() => isOpen = false" />
        </UModal>
    </div>
</template>
