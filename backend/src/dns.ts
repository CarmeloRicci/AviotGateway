const fs = require('fs');
const path = require('path');
const cfg = require('config');

import DnsService from './services/dnsService';
const dnsService = new DnsService();
const delay = require('delay');

(async () => {
    
    console.log("DNS: Inizio");
    const result = await delay(10000);
    let dnslist = dnsService.GetDnsForResolv;
})
