import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './server/routes/';



// Set up the express app
const app = express();


app.use(express.static(path.join(__dirname, 'dist')));



// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes.users(app);
routes.groups(app);

app.all('*', (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`);
});

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => console.log('server started'));

