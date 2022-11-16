import Pokedex from "@/types/pokedexType";
import { ref } from "vue";
import { inject } from "vue";

export default function usePokedex(){
    const axios: any = inject('axios')
    const url = "http://localhost:3000"
    async function storePokedex(data:Pokedex){
        let res = await axios.post(url + "/api/pokedexs",data)
        return res
    }
    return {storePokedex}
}