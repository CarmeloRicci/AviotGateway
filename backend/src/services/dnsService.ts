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
const exec = util.promisify(require('child_process').exec);


export default class DnsService {

    async execute(dns: any) {
        await console.log('Ho ricevuto il nuovo dns', dns)
        let listdns = await this.ReadFileResolv()
        if (!(listdns[0] === dns)) {
            this.CreateTempDns(dns);
            this.ReplaceResolv();
        }
    }

    async ReadFileResolv() {
        let file = cfg.gateway.path_resolv;
        try {
            //const promise = new Promise(async(resolve, reject) => {
            let listdns: string[] = new Array();

            const eachLine = PromiseBB.promisify(lineReader.eachLine);
            await eachLine(file, function (line: string) {
                let splitted = line.split(" ");

                for (let i in splitted) {
                    if (splitted[0] === 'nameserver') listdns.push(splitted[1])
                }

            });
            return listdns;
        } catch (error) {
            console.log("DnsService - ReadFileResolv: Error Read File Resolv.conf", error);
        }

    }


    async CreateTempDns(dns: String){
        let file = cfg.gateway.path_resolv;
        try {
            //const promise = new Promise(async(resolve, reject) => {
            let listdns: string = "";

            const eachLine = PromiseBB.promisify(lineReader.eachLine);
            await eachLine(file, function (line: string) {
                if(!(line.split(" ")[1] === dns))
                listdns= listdns + line + "\n"
            });
            const promise = await new Promise(async (resolve, reject) => {
                let path = cfg.gateway.path_temp_dns
                await fs.writeFile(path, listdns, function (err: any) {
                    if (err) console.log(err);
                    else { }
                    console.log("DnsService - SetFirstDns: temp file created");
                });
            });
        } catch (error) {
            console.log("DnsService - SetFirstDns: Error", error);
        }


    }


    async ReplaceResolv(){

        try {
            const { stdout, stderr } = await exec(`sudo echo ${cfg.gateway.path_temp_dns} > ${cfg.gateway.path_resolv}`);
            //const { stdout, stderr } = await exec(`sudo cp ${path_from} ${path_to}`);

            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        } catch (error) {
            console.log('error:', error);
        }


    }

    // async GetDnsForResolv (){
        
    //     const eachLine = PromiseBB.promisify(lineReader.eachLine);
   
    //     const tmpDirectory = cfg.gateway.path_resolv;

    //     let firstdns = "";
    //     let flagfirstdns = 0;
    //     await eachLine(tmpDirectory, function (line: string) {
    //         let splitted = line.split(" ");

    //         for (let i in splitted) {
    //             if (splitted[0] === 'nameserver')
    //                 if(flagfirstdns == 0) {
    //                     firstdns = splitted[1];
    //                     flagfirstdns = 1;
    //                 }
    //         }
    //     });
    //     return firstdns
    // }

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