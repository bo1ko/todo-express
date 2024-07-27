import mongoose from "mongoose";
import express from 'express';
import config from 'config';

import { taskRoutes, authRoutes } from './routes/index.js';


const app = express();
const dbURI = config.get('dbURI');
const port = config.get('port');

mongoose
    .connect(dbURI)
    .then(() => console.log("DB OK"))
    .catch((err) => console.log("DB ERROR", err));

app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log('SERVER OK')
});
