const Menu = require('../models/menu');

exports.getMenus = async (req, res) => {

    const menuList = await Menu.find();

    if(!menuList) {
        return res.status(400).send({ message: 'No hay usuarios registrados'});
    }

    return res.status(200).send({ menuList });
}

exports.addMenu = async (req, res) => {
    
    try {
        
        const menu = await new Menu(req.body);

        await menu.save((error, createdMenu) => {
            if(error) {
                return res.status(500).send({ error });
            } else if(!createdMenu) {
                return res.status(404).send({ message: 'Error al crear el menú.' });
            } else {
                return res.status(200).send({ message: `Menú ${menu.title} creado correctamente.` });
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }

}

exports.updateMenu = async (req, res) => {
    
    const menuData = req.body;
    const { id } = req.params;

    try {
        
        let menuUpdate = await Menu.findByIdAndUpdate({ _id: id }, menuData);

        if(!menuUpdate) {
            return res.status(400).send({ message: 'Error al editar el menú.' });
        } 

        return res.status(200).send({ message: 'Menú actualizado correctamente.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.deleteMenu = (req, res) => {
    
    const { id } = req.params;

    Menu.findByIdAndDelete(id, (error, menuDeleted) => {
        if(error) {
            return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
        } else {
            if(!menuDeleted) {
                return res.status(404).send({ message: 'El menu que desea eliminar no existe.' });
            } else {
                return res.status(200).send({ message: 'El menu ah sido eliminado.' });
            }
        }
    });
}

exports.activeMenu = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    try {
        let menuActive = await Menu.findByIdAndUpdate(id, { active });

        let state = await Menu.findById(id);

        if(!menuActive) {
            res.status(404).send({ message: "No se ha encontrado ningún menú."});
        } else {
            if( state.active === true ) {
                res.status(200).send({ message: "Menú activado correctamente!"});
            } else {
                res.status(200).send({ message: "Menú desactivado correctamente!"});
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error en el servidor, intente de nuevo más tarde."});
    }
}

exports.getCount = async (req, res) => {
    
    const totalMenu = await Menu.countDocuments();

    if(!totalMenu) {
        return res.status(404).send({ message: 'Aun no se ha creado un menú.' });
    } else {
        return res.status(200).send({ totalMenu });
    }
}