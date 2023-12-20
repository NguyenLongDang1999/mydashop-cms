<script setup lang="ts">

// ** aa
const { data } = useFetch('https://sg.storage.bunnycdn.com/images-data/category', {
    headers: {
        Accesskey: 'e8625dd4-00c8-488c-8fef-aeeae2d1a9e44fdb3e47-695c-46a8-abc0-3e5608b72b8c'
    }
})

// const { data } = useFetch('https://api.bunny.net/storagezone', {
//     headers: {
//         Accesskey: 'e8625dd4-00c8-488c-8fef-aeeae2d1a9e44fdb3e47-695c-46a8-abc0-3e5608b72b8c'
//     }
// })
</script>

<template>
    <div>
        {{ data }}
        <ul
            v-for="item in data"
            :key="item"
        >
            <li>{{ item }}</li>
        </ul>
    </div>
</template>
