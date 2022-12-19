<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-10 col-lg-4 mx-auto">
                <div class="text-start mb-3">
                    <label class="form-label">Pokedex Image</label>
                    <input type="file" class="form-control" @change="onFileChange" name="img">
                </div>
                <div class="text-start mb-3">
                    <label class="form-label">Name (EN)</label>
                    <input type="text" class="form-control" v-model="form.name_en">
                </div>
                <div class="text-start mb-3">
                    <label class="form-label">Name (JP)</label>
                    <input type="text" class="form-control" v-model="form.name_jp">
                </div>
                <div class="text-start mb-3">
                    <label class="form-label">Pokedex Type</label>
                    <div class="mt-1" v-for="n in num_type" :key="n">
                        <input type="text" class="form-control col-lg-5" v-model="form.type[n-1].type_name">
                        <button class="btn btn-outline-info mt-2" v-if="n == num_type" @click="addType">+</button>
                    </div>
                </div>
                <button class="text-center btn btn-outline-success" @click="savePokedex">Add Pokemon</button>
            </div>
        </div>
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
