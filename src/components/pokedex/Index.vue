<template>
    <div style="text-align: right">
        <button @click="addPokemon">Add Pokemon</button>
    </div>
    <div style="text-align: center">
        <h1>Pokedex Table</h1>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name (En)</th>
                    <th>Name (Jp)</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({ 
    setup() {
        const addPokemon = () => {
            router.push({name: "PokedexCreate"})
        }

        return {addPokemon}
    },
})
</script>
