import express from 'express';

const port = 5000;
const app = express();

app.get('/', (_req, res) => {
    res.end('Hello asdasd!');
});


app.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`Ready on port ${port}`);
});
