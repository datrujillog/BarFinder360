

export const permissions = {
    ADMIN: {
        users: {
            create: true, //puede crear
            read: true, //puede leer
            update: true, //puede actualizar
            delete: true //puede borrar
        },
        products: {
            create: true, //puede crear
            read: true, //puede leer
            update: true, //puede actualizar
            delete: true //puede borrar
        },
        orders: {
            create: true, //puede crear
            read: true, //puede leer
            update: true, //puede actualizar
            delete: true //puede borrar
        }


    },
    CAJA: {
        users: {
            read: false, // no puede leer
            write: false, //no puede escribir
            delete: false // no puede borrar
        },
        products: {
            read: true, //puede leer
            write: false, //puede escribir
            delete: false //puede borrar
        },
        orders: {
            read: true, //puede leer
            write: true, //puede escribir
            delete: true //puede borrar
        }
    },

    VENDEDOR : {
        users: {
            read: true, //puede leer
            write: false, //no puede escribir
            delete: false // no puede borrar
        },
        products: {
            read: true, //puede leer
            write: true, //puede escribir
            delete: true //puede borrar
        },
        orders: {
            read: true, //puede leer
            write: true, //puede escribir
            delete: true //puede borrar
        }
    },

    COODINADOR: {
        users: {
            read: true, //puede leer
            write: true, //puede escribir
            delete: true //puede borrar
        },
        products: {
            read: true, //puede leer
            write: true, //puede escribir
            delete: true //puede borrar
        },
        orders: {
            read: true, //puede leer
            write: true, //puede escribir
            delete: true //puede borrar
        }
    }


}