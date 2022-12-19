import router from "@/router";
import Pokedex from "@/types/pokedexType";
import { reactive, ref } from "vue";
import { inject } from "vue";

export default function usePokedex(){
    const axios: any = inject('axios')
    const url = "http://localhost:3000"

    let pokedex = ref<Pokedex[]>([])
    let pokedexs = ref<Pokedex[]>([])
    let num_type = ref(1)

    async function getPokedexs(){
        const res = await axios.get(url + "/api/pokedexs")
        pokedexs.value = res.data.pokedexs        
    }
    async function getPokedexById(){
        let id = router.currentRoute.value.query.edit_id
        let res = await axios.get(url + "/api/pokedexs/" + id)
        pokedex.value = res.data.pokedex
    }
    async function storePokedex(data:Pokedex, image:Blob | undefined){
        let formData = new FormData()
        formData.append("name_en", data.name_en)
        formData.append("name_jp", data.name_jp)
        if(image){
            formData.append("img", image)
        }        
        formData.append("type", JSON.stringify(data.type))
        let res = await axios.post(url + "/api/pokedexs", formData)
        if(res.status == 200){
            router.push({name: "PokedexView"})
        }
    }
    async function editPokedex(data:Pokedex|any, image:Blob){
        let edit_id = router.currentRoute.value.query.edit_id
        let res = await axios.put(url + "/api/pokedexs/" + edit_id, data)
        if(res.status === 200){
            router.push({name: "PokedexView"})
        }
    }
    async function deletePokedex(id:number, index:number) {
        let res = await axios.delete(url + "/api/pokedexs/" + id)
        if(res.status === 200){
            pokedexs.value.splice(index, 1)
        }
        else{
            alert("Cannot Delete Pokedex")
        }  
    }
    async function getPokedexByName(name:string){
        if(name){
            const res = await axios.get(url + "/api/pokedexs/find_name/" + name)
            if(res.status === 200){
                pokedexs.value = res.data.pokedexs
            }
        }
        else{
            getPokedexs()
        }
    }
    function increaseType(num:number){
        num_type.value += num
    }
    return {
        pokedex, 
        pokedexs,
        num_type,
        getPokedexs,
        getPokedexById,
        storePokedex,
        editPokedex,
        deletePokedex,
        getPokedexByName,
        increaseType
    }
}