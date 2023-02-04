const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('../services/jwt');
const mongoose = require('mongoose');

exports.getUsers = async (req, res) => {
    
    const userList = await User.find().select('-password');

    if(userList.length === 0) {
        return res.status(400).send({ message: 'No hay usuarios registrados'});
    }

    return res.status(200).send({ userList });
}

exports.getUser = async (req, res) => {

    const { id } = req.params;

    const user = await User.findById( id );

    if(!user) {
        return res.status(404).send({ message: 'Error! El usuario no existe.' });
    } else {
        return res.status(200).send({ user });
    }
}

exports.addUser = async (req, res) => {
    
    const { name, email, password, repassword } = req.body;
    const file = req.file;

    
    if(!name || !email || !password || !repassword || !file ) {
        return res.status(400).send({ message: 'ERROR! Todos los campos son obligatorios.' });
    } else {
        
        try {
            
    
            let user = await User.findOne({ email });
    
            if(user) {
                return res.status(400).send({ message: 'El usuario ya existe.' });
            }
    
            user = new User(req.body);
    
            if(file) {
                const fileName = req.file.filename;
                const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
                user.image = await `${basePath}${fileName}`;
            }
            
            user.email = email.toLowerCase();
    
            if(!password) return res.status(400).send({ message: 'Error, la contraseña es obligatoria.' });
            
            if(password !== repassword) return res.status(400).send({ message: 'Las contraseñas no coinciden.'});
            
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
    
            await user.save();
            return res.status(200).send({ status: 200, message: 'Usuario creado con éxito.', user });
    
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
        }
    }

}

exports.updateUser = async (req, res) => {
    
    const userData = req.body;
    const { id } = req.params;
    const file = req.file;

    if(!mongoose.isValidObjectId( id )) {
        return res.status(400).send({ message: 'ID de usuario no válido.' });
    }

    try {

        const { password } = userData;
        
        const user = await User.findById( id );

        if(!user) return res.status(404).send({ message: 'El usuario no existe.' });

        let imagepath;

        if(file) {
            const fileName = req.file.filename;
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            imagepath = `${basePath}${fileName}`;
            userData.image = imagepath;
        }

        if(password) {
            const salt = await bcryptjs.genSalt(10);
            userData.password = await bcryptjs.hash(password, salt);
        }


        let userUpdate = await User.findByIdAndUpdate({ _id: id }, userData);

        if(!userUpdate) {
            return res.status(400).send({ message: 'Error al editar el usuario.' });
        } 

        return res.status(200).send({ message: 'Usuario actualizado correctamente.' });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

exports.deleteUser = (req, res) => {

    const { id } = req.params;

    User.findByIdAndRemove(id, (err, userDeleted) => {
        if(err) {
            return res.status(500).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
        } else {
            if(!userDeleted) {
                return res.status(404).send({ message: 'Usuario no encontrado.' });
            } else {
                return res.status(200).send({ message: 'El usuario a sido eliminado.' });
            }
        }
    })
}

exports.getCount = async (req, res) => {

    const userCount = await User.countDocuments();

    if(!userCount) {
        return res.status(404).send({ message: 'No hay usuarios registrados.' });
    } else {
        return res.status(200).send({ userCount });
    }  

}

exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(404).send({ message: 'Error! El usuario no existe.' });
        }

        const passOk = await bcryptjs.compare(password, user.password);

        if(!passOk) {
            return res.status(400).send({ message: 'Password incorrecta!' });
        } 

        return res.status(200).send({ accessToken: jwt.accessToken(user), refreshToken:jwt.refreshToken(user) , userName: user.name });

    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: 'Error en el servidor, intente de nuevo más tarde.' });
    }
}

