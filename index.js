import mongoose from "mongoose";
import express from 'express';
import config from 'config';
import path from 'path';
import { fileURLToPath } from "url";

import { taskRoutes, authRoutes, mainRoutes } from './routes/index.js';


const app = express();
const dbURI = config.get('dbURI');
const port = config.get('port');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
    .connect(dbURI)
    .then(() => console.log("DB OK"))
    .catch((err) => console.log("DB ERROR", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', mainRoutes);
app.use('/todo', taskRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log('SERVER OK')
});

