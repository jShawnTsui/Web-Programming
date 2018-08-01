import express from 'express';
import dbCOnfig from './config/db';
import middlewaresConfid from './middlewares';
import { MeetupRoutes } from './modules';

const app = express();

/**
 * Database
 */

dbCOnfig();

middlewaresConfid(app);

app.use('/api', [MeetupRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('APP listen to PORT: ' + PORT);
    }
});