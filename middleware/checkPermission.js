

// Middleware para verificar los permisos antes de acceder a las rutas
const checkPermissions = (role) => {
    return (req, res, next) => {
        const ruta = req.path;
        if (roles[role].includes(ruta)) {
            next(); // El usuario tiene permiso para acceder a la ruta
        } else {
            res.status(403).send('Acceso denegado'); // El usuario no tiene permiso para acceder a la ruta
        }
    };
};
