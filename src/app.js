import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routing from './routes'
import config from './config';
import {AppError} from './helpers';


// app
const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors({origin: true}));






//----------------------------------------------------------------------------------------------------------------------


// routing
app.use('/', routing);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new AppError('Not Found', 404));
});


// if error is not an instanceOf APIError, convert it
app.use((err, req, res, next) => {
    if (!(err instanceof AppError)) {
        const apiError = new AppError(err.message, err.status, err.details);
        return next(apiError);
    }
    return next(err);
});


// error handler

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res
        .status(err.status)
        .json({
            message: err.message,
            details: err.details,
            stack: config.get('NODE_ENV') == 'development' ? err.stack : undefined
        });
});


export default app;
