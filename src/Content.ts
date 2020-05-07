import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Sandbox 9A</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        res.write("Másodfokú egyenlet gyökei\n");
        res.write("Kérem az együtthatókat\n");

        res.write("a = ");
        let a: number = parseInt(params.a as string);
        if (isNaN(a)) {
            a = 1;
        }
        res.write(`<input type='number' name='a' value=${a} style='width:5em' onChange='this.form.submit();'\n`);

        res.write("b = ");
        let b: number = parseInt(params.b as string);
        if (isNaN(b)) {
            b = 2;
        }
        res.write(`<input type='number' name='b' value=${b} style='width:5em' onChange='this.form.submit();'\n`);

        res.write("c = ");
        let c: number = parseInt(params.c as string);
        if (isNaN(c)) {
            c = 3;
        }
        res.write(`<input type='text' name='c' value=${c} style='width:5em' onChange='this.form.submit();'\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
