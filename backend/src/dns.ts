const fs = require('fs');
const path = require('path');
const cfg = require('config');

import DnsService from './services/dnsService';
const dnsService = new DnsService();
const delay = require('delay');


(async () => {
    await delay(5000)
    let firstdns = await dnsService.ReadFileResolv();
    console.log("DNS: My first dns is: ", firstdns[0])
    await console.log("DNS: Invio la richiesta Post al server");
    await dnsService.SendPostRequest(firstdns[0]);
    await delay(1000)

    fs.watchFile(cfg.gateway.path_resolv, async (curr: any, prev: any) => {
        console.log(`[${new Date().toLocaleString()}] Watching for file changes on: ${cfg.gateway.path_resolv}`);
        console.log("RESOLV: News Changes");
        let firstdns = await dnsService.ReadFileResolv();
        console.log("DNS: My first dns is: ", firstdns[0])
        await console.log("DNS: Invio la richiesta Post al server");
        await dnsService.SendPostRequest(firstdns[0]);
    })

})
// (async () => {

//     console.log("DNS: Inizio");
//     const result = await delay(1000);
//     let firstdns = await dnsService.ReadFileResolv();
//     console.log("DNS: My first dns is: ",firstdns[0])
//     await console.log("DNS: Invio la richiesta Post al server");
//     await dnsService.SendPostRequest(firstdns[0]);

//     for(let i=0;i<10;i++){
//         i=0;
//         const result = await delay(100000);
//         let firstdns = await dnsService.ReadFileResolv();
//         console.log("DNS: My first dns is: ",firstdns[0])
//         await console.log("DNS: Invio la richiesta Post al server");
//         await dnsService.SendPostRequest(firstdns[0]);
//     }

// })();
