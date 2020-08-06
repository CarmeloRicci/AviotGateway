const fs = require('fs');
const path = require('path');
const cfg = require('config');

import DnsService from './services/dnsService';
const dnsService = new DnsService();
const delay = require('delay');

(async () => {
    
    console.log("DNS: Inizio");
    const result = await delay(1000);
    let firstdns = await dnsService.GetDnsForResolv();
    console.log("DNS: My fisrt dns is: ",firstdns)
    await console.log("DNS: Invio la richiesta Post al server");
    await dnsService.SendPostRequest("8.8.8.8");

})();
