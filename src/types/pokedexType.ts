interface Pokedex{
    id?: number,
    name_en: string,
    name_jp: string,
    type: Array<string>,
    file_path?: string
}

export default Pokedex