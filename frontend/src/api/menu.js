import clientAxios from '../utils/axios';

// Obtener lista menú
export function GetMenu() {
    let result = clientAxios.get('/menu')
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err
        })
    
        return result;
}

// Crear nuevo menú
export async function  AddMenu(token, menu) {
    let res = await clientAxios.post('/menu', menu, {
        headers: {
            'Content-Type':'application/json',
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

// Editar menú
export async function EditMenu(token, data, userId) {
    const res = await clientAxios.put(`/menu/${userId}`, data, {
        headers: {
            'Content-Type':'application/json',
            Authorization: token
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

// Activar/Desactivar menú
export async function ActiveMenu(token, menuId, status) {
    const res = await clientAxios.put(`/menu/activate/${menuId}`, status, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })

        return res;
}

// Borrar menú
export async function DeleteMenu(menuId, token) {
    const res = await clientAxios.delete(`/menu/${menuId}`, {
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