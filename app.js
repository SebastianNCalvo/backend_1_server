import express from 'express';
import { connectMongoDB } from './config/db/connect.config.js';

import homeRouter from './routes/home.router.js';
import products from './routes/products.router.js';
import userRouter from './routes/user.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/', homeRouter);
app.use('/products', products);
app.use('/user', userRouter);
app.use('/cart', cartRouter);


app.use((req, res) =>{
    res.status(404).json({title: '404 - pagina no encontrada'})
})

const startServer = async () => {
    await connectMongoDB();
    app.listen(PORT, () => console.log(`✅ Servidor funcionando con express en http://localhost:${PORT}`));
}

startServer();