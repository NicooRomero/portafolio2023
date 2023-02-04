const Portfolio = require('../models/portfolio');

exports.getProjects = async (req, res) => {

    if (req.query) {

        const { limit } = req.query;

        const projectsList = await Portfolio.find().sort({ dateCreated: -1 }).limit(limit);

        if (projectsList.length === 0) return res.status(400).send({ message: 'No existe ningún proyecto.' });

        return res.status(200).send({ projectsList });

    }

    const projectsList = await Portfolio.find().sort({ dateCreated: -1 });

    if (projectsList.length === 0) return res.status(400).send({ message: 'No existe ningún proyecto.' });

    return res.status(200).send({ projectsList });

}

exports.getProject = async (req, res) => {

    const params = req.params

    const project = await Portfolio.findById(params.id);

    if (!project) {
        return res.status(400).send({ message: 'El proyecto no existe.' });
    }

    return res.status(200).send({ project });
}

exports.addProject = async (req, res) => {
    const body = req.body;

    try {

        const { title, description, img } = body;

        if (!title || !description || !img) {
            return res.status(400).send({ message: 'Titulo, descripcion e imagen, son campos obligatorios' });
        }

        const project = new Portfolio(body);

        if (!project) {
            return res.status(404).send({ message: 'Error al crear el proyecto.' })
        }

        await project.save();

        return res.status(200).send({ message: 'El nuevo proyecto fue creado con éxito.' })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde' });
    }
}

exports.editProject = async (req, res) => {
    const body = req.body;
    const params = req.params;

    try {

        //if(!body) return null

        const project = await Portfolio.findById(params.id);

        if (!project) return res.status(404).send({ message: 'El proyecto no existe.' });

        let projectUpdate = await Portfolio.findByIdAndUpdate({ _id: params.id }, body);

        if (!projectUpdate) return res.status(400).send({ message: 'Error al editar el proyecto.' });

        return res.status(200).send({ message: 'Proyecto actualizado correctamente.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde' });
    }
}

exports.deleteProject = (req, res) => {

    const { id } = req.params;

    Portfolio.findByIdAndDelete(id, (error, projectDeleted) => {
        if (error) {
            return res.status(500).send({ message: 'Error en el servidor, intente de nuevo mas tarde.' });
        } else {
            if (!projectDeleted) {
                return res.status(404).send({ message: 'Proyecto no encontrado.' });
            } else {
                return res.status(200).send({ message: 'El proyecto a sido eliminado correctamente.' });
            }
        }
    })

}

exports.getCount = async (req, res) => {

    const totalProjects = await Portfolio.countDocuments();

    if (!totalProjects) return res.status(400).send({ message: 'No hay projectos disponibles.' });

    return res.status(200).send({ totalProjects });

}

