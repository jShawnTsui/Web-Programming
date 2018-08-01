import express from 'express';
import morgan from 'morgan';

export default app => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.disable('etag');
};