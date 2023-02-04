import clientAxios from "../utils/axios";

// Obtener posts
export function GetPosts(limit) {
    let res = clientAxios.get(`/posts?limit=${limit}`)
        .then(response => {
            return response
        })
        .catch(err => {
            return err.response
        })
    return res
}

export function GetPost(urlPost) {
    let res = clientAxios.get(`/posts/get-post/${urlPost}`)
    .then(response => {
        return response
    })
    .catch(err => {
        return err.response
    })
return res
}

// Obtener post pinned
export function GetPinned(limit) {
    let res = clientAxios.get(`/posts/pinned?limit=${limit}`)
        .then(response => {
            return response
        })
        .catch(err => {
            return err.response
        })
    return res
}

// Agregar Post
export async function AddPost(token, formData) {
    return await clientAxios.post('/posts', formData, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })
}

// Editar Post
export async function EditPost(token, formData, postId) {
    return await clientAxios.put(`/posts/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })
}

// Eliminar Post
export function DeletePost(token, postId) {
    return clientAxios.delete(`/posts/${postId}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    })
        .then(response => {
            return response
        })
        .catch(err => {
            return err
        })
}