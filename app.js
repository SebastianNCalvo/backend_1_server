import express from 'express';
import { engine } from 'express-handlebars';
import path, { extname } from 'path';
import { fileURLToPath } from 'url';
import homeRouter from './routes/home.router.js'
import uploadRouter from './routes/upload.router.js'
import { title } from 'process';

const app = express();
const PORT = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', homeRouter);
app.use('/upload', uploadRouter)

app.use((req, res) =>{
    res.status(404).render('404', {title: '404 - pagina no encontrada'})
})


app.listen(PORT, () => console.log(`Servidor funcionando con express en http://localhost:${PORT}`))