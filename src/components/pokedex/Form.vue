<template>
    <div>
        <div>
            <label for="name_en">Name (EN)</label>
            <input type="text" v-model="form.name_en">
        </div>
        <div>
            <label for="name_jp">Name (JP)</label>
            <input type="text" v-model="form.name_jp">
        </div>
        <div>
            <label for="type">Type</label>
            <input type="text" v-model="form.type">
        </div>
        <button @click="savePokedex">Add Pokemon</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import usePokedex from "@/store/pokedex"
import Pokedex from '@/types/pokedexType'

export default defineComponent({
    setup() {
        const form = reactive<Pokedex>({
            name_en: "",
            name_jp: "",
            type: ""
        })

        const {storePokedex} = usePokedex()

        const savePokedex = async () => {
            const res = await storePokedex({...form})
            console.log(res)
        }

        return {form, savePokedex}
    },
})
</script>
