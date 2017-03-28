import path from 'path';
import { getProperties, client } from './controllers';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('port', process.env.PORT || 8080);
app.set('x-powered-by', false);
app.use(express.static(path.join(__dirname, '../../dist/client')));
app.use(bodyParser.json());

app.get('/properties', getProperties);
app.get('/*', client);

var server = app.listen(app.get('port'), () => {
	console.log(`Listening on port ${server.address().port}`);
});