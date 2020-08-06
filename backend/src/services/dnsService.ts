const arp1 = require('arp-a');
const cfg = require('config');
const fs = require('fs');
const path = require('path');
const ping = require('ping');
// let tbl: any = { ipaddrs: {}, ifnames: {} };
const util = require('util');
const lineReader = require('line-reader');
const PromiseBB = require('bluebird');
import { Utilities } from '../shared/utilities';


export default class DnsService {

    async execute(dns: string) {
        await console.log('Ho ricevuto il nuovo dns', dns)
        
    }

    async GetDnsForResolv (){
        
        const eachLine = PromiseBB.promisify(lineReader.eachLine);
   
        const tmpDirectory = cfg.gateway.path_resolv;

        let firstdns = "";
        let flagfirstdns = 0;
        await eachLine(tmpDirectory, function (line: string) {
            let splitted = line.split(" ");

            
            for (let i in splitted) {
                //console.log(splitted);
                if (splitted[0] === 'nameserver')
                    if(flagfirstdns == 0) {
                        firstdns = splitted[1];
                        flagfirstdns = 1;
                    }
            //console.log("-----------------");
            //splitted.lenght();
            //console.log(data_file);
            //resolve(data_file);
            }
        });
        return firstdns
    }

    async SendPostRequest (firstdns: string){

        let request_data = {
            url: `http://${cfg.general.ipDnsServer}:3880/dns_request`,
            method: 'POST',
            body: {
                params: {
                    ipdns: firstdns
                }
            },
            json: true
        };
        await Utilities.request(request_data);
        await console.log("DnsService - SendPostRequest: Post send! " + `(http://${cfg.general.ipDnsServer}:3880/dns_request)`)
    }


}