import express from 'express';

import homeRouter from './routes/home.router.js'
import products from './routes/products.router.js';

const app = express();
const PORT = 3000;

app.use('/', homeRouter);
app.use('/products', products)


app.use((req, res) =>{
    res.status(404).render('404', {title: '404 - pagina no encontrada'})
})

app.listen(PORT, () => console.log(`Servidor funcionando con express en http://localhost:${PORT}`))