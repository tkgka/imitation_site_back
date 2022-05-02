import { Controller, Get, Response, Req } from '@nestjs/common';
import { Response as Res } from 'express';
import { GraphqlService } from './graphql.service';
import { arrayToObject } from 'src/GlobalFunctions';
const fs = require("fs")

@Controller('graphql')
export class GraphqlController {
    constructor(private readonly GraphqlService: GraphqlService) {}

    @Get('/test')
    async ReturnBuffer(@Response() res: Res, @Req() req) {
        // fs.readFile("/Users/gimsuhwan/Documents/GitHub/response-copier/src/NaverResponse", (err, buf) => {
        //     if (!err) {
        //         // console.log(buf.toString('hex'));              
        //         res.socket.end(buf);
        //     }
        //   });
        return this.GraphqlService.findByTag(["B","C"]);
    }

    @Get('/hex')
    async ReturnHex(@Response() res: Res, @Req() req) {
        if (req.query.path == undefined || req.query.path == "" || req.query.path == null) {
            return res.send("Please provide a path");
        }
        const val = await this.GraphqlService.findByPath(req.query.path);
        const buf = Buffer.from(val[0].responseData, 'hex');

        //response Header to json object
        var ResHeader = val[0].responseHeader
        var ReHead = arrayToObject(ResHeader)
    
        return res.set(ReHead).send(buf);

    }
}



