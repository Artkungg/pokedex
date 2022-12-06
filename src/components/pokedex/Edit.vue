<template>
    <div>
        <div v-if="!image">
            <img :src="pokedex.file_path">
        </div>
        <div>
            <input type="file" @change="onFileChange" name="img">
        </div>
        <div>
            <label for="name_en">Name (EN)</label>
            <input type="text" v-model="pokedex.name_en">
        </div>
        <div>
            <label for="name_jp">Name (JP)</label>
            <input type="text" v-model="pokedex.name_jp">
        </div>
        <div>
            <label for="type">Type</label>
            <input type="text" v-model="pokedex.type">
        </div>
        <button @click="savePokedex">Edit Pokemon</button>
    </div>
</template>

<script lang="ts">
import usePokedex from '@/store/pokedex'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    setup() {
        let {pokedex, getPokedexById, editPokedex} = usePokedex()
        let image = ref()

        onMounted(async() => {
            await getPokedexById()
        })

        const savePokedex = async () => {
            await editPokedex(pokedex.value, image.value)
        }

        const onFileChange = ($event: Event) => {
            const target = $event.target as HTMLInputElement
            if(target && target.files){
                image.value = target.files[0]
            }
        }

        return {pokedex, image, savePokedex, onFileChange}
    },
})
</script>
