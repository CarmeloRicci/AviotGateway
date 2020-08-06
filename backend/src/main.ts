import * as express from 'express';
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const pubApiPingRoute = require('./routes/public/pingRoutes');
app.use('/ping', pubApiPingRoute);

const pubApiDnsRoute = require('./routes/public/dnsRoutes');
app.use('/dns_response', pubApiDnsRoute);

console.log("CAIO");
//require('./resolv');
require('./dns');


app.listen(3800, () => {
  console.log('Application listening on port 3800!');
});

module.exports = app;
