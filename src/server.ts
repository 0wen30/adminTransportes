import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.static('public'));

export default app;