const Post = require('../models/post');

exports.getPosts = async (req, res) => {
    
    try {
        
        if(req.query) {

            const { limit } = req.query;

            let  listPost = await Post.find().sort({ date: -1 }).limit(limit)
            
            if(listPost.totalDocs === 0) return res.status(404).send({ message: 'No se han creado post aún.' });
            
            return res.status(200).send({ listPost });
        }

        let listPost = await Post.find().sort({ date: -1 }) //Post.paginate({}, options);

        if(listPost.totalDocs === 0) return res.status(404).send({ message: 'No se han creado post aún.' });
            
        return res.status(200).send({ listPost });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }

}

exports.addPost = async (req, res) => {
    
    const body = req.body;
    const file = req.file
    

    try {
        
        let post = await new Post(body);

        if(!file) return res.status(404).send({ message: 'La imagen es obligatoria.' });

        let imagepath;

        if(file) {
            const fileName = file.filename;
            const basePath = res.protocol ? `${res.protocol}://${req.get('host')}/public/uploads/posts/` : `http://${req.get('host')}/public/uploads/posts/`
            imagepath = `${basePath}${fileName}`;
            post.img = imagepath;
        }

        if(!post) return res.status(400).send({ message: 'Error al crear un nuevo post.' });

        await post.save();

        return res.status(200).send({ message: 'La publicacion fue creada con éxito.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.updatePost = async (req, res) => {

    const postData = req.body;
    const params = req.params;
    const file = req.file
    console.log(postData)
    try {

        let imagepath;

        if(file) {
            const fileName = file.filename;
            const basePath = res.protocol ? `${res.protocol}://${req.get('host')}/public/uploads/posts/` : `http://${req.get('host')}/public/uploads/posts/`
            imagepath = `${basePath}${fileName}`;
            postData.img = imagepath;
        }

        let postUpdate = await Post.findByIdAndUpdate(params.id, postData);

        if(!postUpdate) return res.status(400).send({ message: "No se han econtrado posts."});

        return res.status(200).send({ message: "El post se ah actualizado correctamente!"});

        
    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.deletePost = async (req, res) => {
    const params = req.params;

    try {
        
        let postDelete = await Post.findByIdAndRemove(params.id);

        if(!postDelete) return res.status(400).send({ code: 400, message: "No se han encontrado posts."})
        
        return res.status(200).send({ code: 200, message: "El post se ah eliminado con éxito!" })

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.getPost = async (req, res) => {
    const { url } = req.params;
    console.log('hola')
    try {
        
        let postStored = await Post.findOne( { url } );

        if(!postStored) {
            res.status(400).send({ code: 400, message: "No se han encontrado posts."})
        } else {
            res.status(200).send({ code: 200, post: postStored })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ code: 500, message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.getPinned = async (req, res) => {

    //const count = req.params.count ? req.params.count : 0
    
    const postPinned = await Post.find({ isPinned: true }) //.limit(+count);

    if(!postPinned) {
        return res.status(404).send({ message: 'No hay productos destacados'});
    } else {
        return res.status(200).send({ postPinned });
    } 
}

exports.totalPosts = async (req, res) => {

    try {

        let total = await Post.countDocuments();

        if(!total) {
            res.status(400).send({ message: "No hay publicaciones creadas."})
        } else {
            res.status(200).send({ count: total })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde." });
    }
    
}