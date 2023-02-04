import clientAxios from "../utils/axios";

// Obtener proyectos
export async function GetPortfolio(limit) {

    if(limit) {
        let res = await clientAxios.get(`/portfolio?limit=${limit}`)
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data.message
        })
    return res;
    }

    let res = await clientAxios.get('/portfolio')
        .then(response => {
            return response
        })
        .catch(error => {
            return error.response.data.message
        })
    return res;
}

// Agregar proyectos
export async function AddProyectApi(token, proyect) {
    let res = await clientAxios.post('/portfolio', proyect, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })

    return res;

}

// Editar proyectos
export async function EditProyectApi(token, proyectId, data) {
    const res = await clientAxios.put(`/portfolio/proyect/${proyectId}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })

    return res;
}

// Borrar proyectos
export async function DeleteProyectApi(token, proyectId) {
    const res = await clientAxios.delete(`/portfolio/${proyectId}`, {
        headers: {
            'Authorization': token
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })

    return res;
}