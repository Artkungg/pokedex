interface pokedex_type{
    type_name: string
}
interface Pokedex{
    id?: number,
    name_en: string,
    name_jp: string,
    type: Array<pokedex_type>,
    file_path?: string
}

export default Pokedex