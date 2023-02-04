const Categoria = require('../models/categoria');
const Curso = require('../models/curso');

exports.getCategorias = async (req, res) => {
    
    try {
        
        let listCategories = await Categoria.find();

        if(listCategories.length === 0) {
            return res.status(404).send({ message: 'No se han encontrado categorias.' })
        } else {
            return res.status(200).send({ listCategories });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo mas tarde.' });
    }
}

exports.getCategoria = async (req, res) => {

    const { id } = req.params; 

    try {

        const category = await Categoria.findById( id );

        if(!category) {
            res.status(404).send({ message: 'La categoria no existe.'});
        } else {
            res.status(200).send({ category });
        }        

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo mas tarde.' });
    }
}

exports.addCategoria = async (req, res) => {

    const { name } = req.body

    try {
        let category = await Categoria.findOne({ name });
        
        if(category) {
            return res.status(400).send({ message: 'Error, la categoría ya existe.'});
        }

        category = new Categoria(req.body);

        await category.save();

        if(!category) {
            res.status(404).send({ message: 'No se puedo crear la categoría.' });
        }

        res.status(200).send({ message: 'Categoría creada con éxito!' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.deleteCategoria = async (req, res) => {
    const { id } = req.params;

    Categoria.findByIdAndDelete(id, (err, categoryDeleted) => {
        if(err) {
            res.status(500).send({ message: 'Error en el servidor, intente de nuevo mas tarde.' });
        } else {
            if(!categoryDeleted) {
                res.status(404).send({ message: 'Categoria no encontrada.' });
            } else {
                res.status(200).send({ message: 'La categoria a sido eliminada.' });
            }
        }
    })
}

exports.updateCategoria = async (req, res) => {

    const categoryData = req.body;
    const params = req.params;

    try {
        
        let categoryUpdate = await Categoria.findByIdAndUpdate({ _id: params.id }, categoryData);
        
        if(!categoryUpdate) {
            return res.status(404).send({ message: 'Error al editar categoría.' });
        } else {
            return res.status(200).send({ message: 'Categoria actualizada correctamente.' });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}