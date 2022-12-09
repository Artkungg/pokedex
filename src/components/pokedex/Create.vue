<template>
    <div>
        <div>
            <input type="file" @change="onFileChange" name="img">
        </div>
        <div>
            <label for="name_en">Name (EN)</label>
            <input type="text" v-model="form.name_en">
        </div>
        <div>
            <label for="name_jp">Name (JP)</label>
            <input type="text" v-model="form.name_jp">
        </div>
        <div>
            <label for="type">
                Type
                <button @click="addType">+</button>    
            </label>
            <div v-for="n in num_type" :key="n">
                <input type="text" v-model="form.type[n-1].type_name">
            </div>
        </div>
        <button @click="savePokedex">Add Pokemon</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import usePokedex from "@/store/pokedex"
import Pokedex from '@/types/pokedexType'

export default defineComponent({
    setup() {
        let form = reactive<Pokedex>({
            name_en: "",
            name_jp: "",
            type: [{type_name: ""}],
            file_path: ""
        })
        let image = ref<Blob>()

        let {pokedex, storePokedex} = usePokedex()
        let {num_type, increaseType} = usePokedex()

        const savePokedex = async () => {
            await storePokedex({...form}, image.value)
        }

        const addType = () => {
            form.type.push({type_name: ""})
            increaseType(1)
        }

        const onFileChange = ($event: Event) => {
            const target = $event.target as HTMLInputElement
            if(target && target.files){
                image.value = target.files[0]
            }
        }

        return {form, pokedex, num_type, savePokedex, onFileChange, addType}
    },
})
</script>
