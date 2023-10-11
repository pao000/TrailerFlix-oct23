const sequelize = require('./src/conexion/connection');
const contenido = require('./src/modelos/contenido');
const categorias = require('./src/modelos/categorias');
const generos = require('./src/modelos/generos');


let express = require("express");
let app = express();


app.use(express.json());

app.use(async (req, res, next) => {
    try {
        await sequelize.authenticate();
        await categorias.sync();
        await contenido.sync();
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error al conectarse al servidor', description: error.message });
    }
});

app.get('/categorias', async (req, res) => {
    try {
        const allcategorias = await categorias.findAll();
        if (allcategorias.length !== 0) {
            res.status(200).json(allcategorias);
        } else {
            res.status(404).json({ error: "No se encontraron categorías" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse al servidor", description: error.message });
    }
});

app.get('/catalogo', async (req, res) => {
    try {
        const allcontenidos = await contenido.findAll();
        if (allcontenidos.length !== 0) {
            res.status(200).json(allcontenidos);
        } else {
            res.status(404).json({ error: "No se encontraron productos" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al conectarse al servidor", description: error.message });
    }
});

app.get('/catalogo/:catalogoid', async (req, res) => {
    try {
        const { catalogoid } = req.params;
        const catalogo = await contenido.findByPk(catalogoid);

        if (!catalogo) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.status(200).json(catalogo);
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
});

app.get('/catalogo/titulo/:titulo', async (req, res) => {
    try {
        const { titulo } = req.params;
        const catalogo = await contenido.findOne({ where: { titulo } });
        if (!catalogo) {
            res.status(404).json({ error: "Producto no encontrado" });
        } else {
            res.status(200).json(catalogo);
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
});


app.get('/catalogo/genero/:genero', async (req, res) => {
    try {
        const { genero } = req.params;
        const generoEncontrado = await generos.findOne({ where: { genero } });

        if (!generoEncontrado) {
            res.status(404).json({ error: "Género no encontrado" });
        } else {
            res.status(200).json(generoEncontrado);
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
});



app.get('/catalogo/categoria/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;
        const contenidoPorCategoria = await contenido.findAll({ where: { categoria } });

        if (contenidoPorCategoria.length !== 0) {
            res.status(200).json(contenidoPorCategoria);
        } else {
            res.status(404).json({ error: "No se encontro contenido por esta categoria" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", description: error.message });
    }
});

app.get('/', (req, res) => {
    res.status(200).json({ message: "¡Bienvenido a la API de Trailerflix!" });
});

app.listen(3000, function () {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});