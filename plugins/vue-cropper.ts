import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

export default defineNuxtPlugin(nuxt => {
    nuxt.vueApp.component('VueCropper', VueCropper)
})
