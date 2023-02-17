import clientAxios from '../utils/axios';

// Obtener listado cursos
export function GetCursos() {
    let res = clientAxios.get('/cursos')
        .then(response => {
            return response.data.cursosList;
        })
        .catch(err => {
            return err;
        })

    return res;
}

export function GetCursosDev() {
    let res = clientAxios.get('/cursos?category=63ec301fe65349c39b657db6')
        .then(response => {
            return response.data.cursosList;
        })
        .catch(err => {
            return err;
        })

    return res;
}

export function GetCursosCib() {
    let res = clientAxios.get('/cursos?category=63ec2fd0e65349c39b657db5')
        .then(response => {
            return response.data.cursosList;
        })
        .catch(err => {
            return err;
        })

    return res;
}

// Agregar curso
export async function AddCurso(token, formData) {
    let res = clientAxios.post('/cursos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    })
        .then(response => {
            return response.data
        })
        .catch(err => {
            return err
        })

    return res;
}

// Editar curso
export async function EditCurso(token, formData, userId) {
    const res = await clientAxios.put(`/cursos/${userId}`, formData, {
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
    return res;
}

// Eliminar Curso
export async function DeleteCurso(cursoId, token) {
    const res = await clientAxios.delete(`/cursos/${cursoId}`, {
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