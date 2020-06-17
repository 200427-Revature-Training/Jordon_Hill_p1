import express from 'express';
import bodyParser from 'body-parser';
import { db } from './daos/db';
import { userRouter } from './routers/user-router';
import { reimbursementRouter } from './routers/reimbursement-router';
import { statusRouter } from './routers/status-router';
import { typeRouter } from './routers/type-router';

const app = express();

const port = process.env.port || 3002;
app.set('port', port);

process.title = "myApp"

/*
    ? Middleware Registration
*/
app.use(bodyParser.json());
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST");
    next();
});
app.use('/shutdown', (request, response, next) => {
    if (request.ip !== "::ffff:172.31.45.201") {
        response.send("Sender is not authorized to perform this task.\n");
        next();
    } else {
        response.send("Now closing server.\n");
        process.exit();
    }
});
/*
    ? Router Registration
*/
app.use('/user', userRouter);
app.use('/reimbursement', reimbursementRouter);
app.use('/status', statusRouter);
app.use('/type', typeRouter);

process.on('unhandledRejection', (err) => {
    console.log(err)
    db.end().then(() => {
        console.log('Database pool closed');
    });
});

app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});