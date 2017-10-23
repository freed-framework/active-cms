
import * as express from 'express';
import downloadFile from './download';

const app = express();

app.use('/api/download', downloadFile);

const server = app.listen(6666, function() {
	console.log('Listening on port %d', server.address().port);
});
