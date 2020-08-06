const fs = require('fs');
const path = require('path');
const cfg = require('config');

import DnsService from './services/dnsService';
const dnsService = new DnsService();
const delay = require('delay');

(async () => {
    
    console.log("DNS: Inizio");
    const result = await delay(1000);
    console.log("DNS: Invio la richiesta Post al server");
    dnsService.SendPostRequest("8.8.8.8");


})();
