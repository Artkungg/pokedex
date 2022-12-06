<template>
    <div>
        <div style="text-align: right">
            <button @click="addPokemon">Add Pokemon</button>
        </div>
        <div style="text-align: center">
            <h1>Pokedex Table</h1>
            <div style="text-align: left">
                Search: <input v-model="find_pokedex" type="text" placeholder="Name (English)">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name (En)</th>
                        <th>Name (Jp)</th>
                        <th>Type</th>
                        <th>image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(poke, index) in pokedexs" :key="poke.id">
                        <td>{{parseInt(index) + 1}}</td>
                        <td>{{poke.name_en}}</td>
                        <td>{{poke.name_jp}}</td>
                        <td>{{poke.type}}</td>
                        <td v-if="poke.file_path">
                            <img :src="poke.file_path" width="50" height="50"> 
                            <img >
                        </td>
                        <td>
                            <button @click="editPokedex(poke.id)">Edit</button> |
                            <button @click="destroyPokedex(poke.id, index)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, onMounted, ref, watch } from 'vue'
import usePokedex from "@/store/pokedex"

export default defineComponent({ 
    setup() {
        const find_pokedex = ref("")
        const {pokedexs, getPokedexs, deletePokedex, getPokedexByName} = usePokedex()

        onMounted(getPokedexs)

        const addPokemon = () => {
            router.push({name: "PokedexForm"})
        }

        const editPokedex = (id:number) => {
            router.push("/pokedex/edit?edit_id="+id)
        }

        const destroyPokedex = async(id:number, index:number) => {
            await deletePokedex(id, index)
        }

        watch(find_pokedex, (curValue) => {
            getPokedexByName(curValue)          
        })

        return {find_pokedex, pokedexs, addPokemon, editPokedex, destroyPokedex}
    },
})
</script>
