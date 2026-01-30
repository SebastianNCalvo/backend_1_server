const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

let baseDeDatos = JSON.parse(fs.readFileSync('Base de datos.json', 'utf-8'));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json(`Bienvenido, estas usando el puerto ${PORT}`)
});

app.get('/products', (req, res) => {
    res.status(200).json({title:'Bienvenido, estos son nuestros productos:', productos: baseDeDatos})
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productById = baseDeDatos.find(p => p.id === id);
    if(!productById) {
        return res.status(404).json({error: "Producto no encontrado"})
    }
    res.status(200).json(productById)
});


app.post('/products', (req, res) => {
    const {name, description, price, status, stock, category} = req.body;
    const nuevoProducto = {
        id: baseDeDatos.length ? baseDeDatos[baseDeDatos.length -1].id + 1 : 1, 
        name, 
        description, 
        price, 
        status, 
        stock, 
        category
    }
    baseDeDatos.push(nuevoProducto)
    fs.writeFileSync('Base de datos.json', JSON.stringify(baseDeDatos))
    res.status(201).json({message: "Producto creado con exito ", producto: nuevoProducto})
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, description, price, status, stock, category} = req.body;
    const productById = baseDeDatos.find(p => p.id === id);

    if(!productById) {
        return res.status(404).json({error: "Producto no encontrado"})
    }

    productById.name = name ?? productById.name;
    productById.description = description ?? productById.description;
    productById.price = price ?? productById.price;
    productById.status = status ?? productById.status;
    productById.stock = stock ?? productById.stock;
    productById.category = category ?? productById.category;

    fs.writeFileSync('Base de datos.json', JSON.stringify(baseDeDatos))
    res.status(200).json({message: "Producto actualizado con exito", producto: productById})
    }
)

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productById = baseDeDatos.find(p => p.id === id);
    if(!productById) {
        return res.status(404).json({error: "Producto no encontrado"})
    }
    baseDeDatos = baseDeDatos.filter(p => p.id !== id);
    fs.writeFileSync('Base de datos.json', JSON.stringify(baseDeDatos))
    res.status(204).send();
})

app.listen(PORT, () => console.log(`Servidor funcionando con express en http://localhost:${PORT}`));