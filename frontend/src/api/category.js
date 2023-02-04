import clientAxios from "../utils/axios";

// Obtener categorias
export async function GetCategories() {
    let res = await clientAxios.get('/categoria')
        .then(response => {
            return response.data.listCategories
        })
    return res;
}