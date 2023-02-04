import clientAxios from '../utils/axios';

// Iniciar sesion
export async function LogInApi(data) {
    const result = await clientAxios.post('/user/login', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.response.data
        })
    
        return result;
}

// Registrarse
export async function RegisterApi(data) {
    const result = await clientAxios.post('/user', data)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err.response.data
        })

        return result;
}

// Obtener usuarios
export function GetUsers(token) {
    const result = clientAxios.get('/user', {
        headers: {
            "Content-Type": "application/json",
            'Authorization': token
        }
    })
        .then(response => {
            return response.data.userList
        })
        .catch(err => {
            return err.response.data
        })
    
    return result;
}

// Editar usuarios
export async function UpdateUser(token, formData, userId) {

    const result = await clientAxios.put(`/user/${userId}`, formData, {
        headers: {
            'Content-Type':'multipart/form-data',
            'Authorization': token
        }
    })
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err
        })
    
        return result;
}

// Eliminar usuario

export async function DeleteUser(userId, token) {
    const res = await clientAxios.delete(`/user/${userId}`, {
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