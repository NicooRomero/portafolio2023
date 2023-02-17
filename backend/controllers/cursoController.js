const Curso = require('../models/curso');
const Categoria = require('../models/categoria');
const mongoose = require('mongoose');

exports.getCursos = async (req, res) => {

    // obtener cruso filtrando por categoria
    // ejemplo endpoint: http://localhost:4000/api/v1/cursos?category=628e4f78368fdea001652486
    let filter = {};

    if(req.query.category) {
        filter = { category: req.query.category.split(',') };
    }

    const cursosList = await Curso.find(filter).populate('category').sort({ dateCreated: -1 });
    

    if(!cursosList) {
        return res.status(400).send({ message: 'No existe ningún curso.' });
    }

    return res.status(200).send({ cursosList });

}

exports.getCurso = async (req, res) => {
    const { id } = req.params;

    const curso = await Curso.findById( id ).populate('category');

    if(!curso) {
        return res.status(404).send({ message: 'El producto solicitado no existe.' });
    } else {
        return res.status(200).send({ curso });
    }

}

exports.addCurso = async (req, res) => {
    
    const { category } = req.body;
    const file = req.file
    try {
        
        const categorySelected = await Categoria.findById(category);

        if(!categorySelected) {
            return res.status(404).send({ message: 'La categoría seleccionada no existe.' });
        }

        let curso = new Curso(req.body);

        if(!file) return res.status(404).send({ message: 'La imagen es obligatoria.' });

        const fileName = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/cursos/`;

        curso.image = await `${basePath}${fileName}`;

        if(!curso) {
            return res.status(404).send({ message: 'Error al crear el curso.' })
        }

        curso = await curso.save();

        return res.status(200).send({ curso, message: 'Curso creado con éxito.' });


    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.updateCurso = async (req, res) => {

    const cursoData = req.body;
    const params = req.params;
    const file = req.file;
    
    if(!mongoose.isValidObjectId( params.id )) {
        return res.status(400).send({ message: 'ID de curso no válido.' });
    }

    try {        
        
        const curso = await Curso.findById( params.id ).populate('category');

        const categorySelected = await Categoria.findById(curso.category.id);
        
        if(!categorySelected) return res.status(404).send({ message: 'La categoría seleccionada no es válida.' });

        if(!curso) return res.status(404).send({ message: 'El curso no existe.' });

        let imagepath;

        if(file) {
            const fileName = file.filename;
            const basePath = res.protocol ? `${res.protocol}://${req.get('host')}/public/uploads/cursos/` : `http://${req.get('host')}/public/uploads/cursos/`
            imagepath = `${basePath}${fileName}`;
            cursoData.image = imagepath;
        }
        
        let cursoUpdate = await Curso.findByIdAndUpdate({ _id: params.id }, cursoData);
        
        if(!cursoUpdate) {
            return res.status(400).send({ message: 'Error al editar el curso.' });
        }

        return res.status(200).send({ cursoUpdate, message: 'Curso actualizado correctamente.' });


    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.deleteCurso = (req, res) => {

    const { id } = req.params;
    
    Curso.findByIdAndDelete(id, (error, cursoDeleted) => {
        if(error) {
            return res.status(500).send({ message: 'Error en el servidor, intente de nuevo mas tarde.' });
        } else {
            if(!cursoDeleted) {
                return res.status(404).send({ message: 'Curso no encontrado.' });
            } else {
                return res.status(200).send({ message: 'El curso a sido eliminado correctamente.' });
            }
        }
    })

}

exports.getCount = async (req, res) => {

    const totalCursos = await Curso.countDocuments();

    if(!totalCursos) return res.status(400).send({ message: 'No hay cursos disponibles.' });
    
    return res.status(200).send({ totalCursos });

}

