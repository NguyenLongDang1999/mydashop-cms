<script setup lang="ts">

// ** Data
const fileInput = ref()
const { mutateAsync } = useFileManagerUploadFile()

// ** Methods
async function onFileInput(e: Event) {
    const fileValue = (e.target as HTMLInputElement).files![0]

    await mutateAsync({
        fileName: fileValue.name,
        fileRaw: fileValue
    })
}
</script>

<template>
    <UButton
        icon="i-heroicons-arrow-up-tray"
        size="sm"
        square
        label="Tải Hình"
        color="gray"
        variant="solid"
        @click="fileInput.click()"
    />

    <input
        ref="fileInput"
        type="file"
        class="sr-only"
        v-bind="$attrs"
        @input="onFileInput"
    >
</template>
