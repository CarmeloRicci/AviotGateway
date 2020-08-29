import * as express from 'express';
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const pubApiPingRoute = require('./routes/public/pingRoutes');
app.use('/ping', pubApiPingRoute);

const pubApiDnsRoute = require('./routes/public/dnsRoutes');
app.use('/dns', pubApiDnsRoute);

console.log("CIAO");
//require('./resolv');
//require('./dns');
import PingService from './dns';
const pingService = new PingService();

pingService.first();
pingService.watch();


app.listen(3800, () => {
  console.log('Application listening on port 3800!');
});

module.exports = app;
