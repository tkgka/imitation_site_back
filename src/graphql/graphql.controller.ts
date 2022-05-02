import { Controller, Get, Response, Req, Body, Post } from '@nestjs/common';
import { Response as Res } from 'express';
import { GraphqlService } from './graphql.service';
import { arrayToObject } from 'src/GlobalFunctions';
const fs = require("fs")

@Controller('graphql')
export class GraphqlController {
    constructor(private readonly GraphqlService: GraphqlService) {}
    


    @Post('/tag')
    FindByTag(@Body() payload){
        return this.GraphqlService.findByTag(payload.tag);
    }


    @Get('/rescode')
    async FindByResCode(@Req() req) {
        return await this.GraphqlService.findByResCode(req.query.val);
    }

    @Get('/method')
    async FindByMethod(@Req() req) {
        return await this.GraphqlService.findByMethod(req.query.val);
    }

    @Get('/hex')
    async ReturnHex(@Response() res: Res, @Req() req) {
        if (req.query.val == undefined || req.query.val == "" || req.query.val == null) {
            return res.send("Please provide a path");
        }
        const val = await this.GraphqlService.findByPath(req.query.val);
        const buf = Buffer.from(val[0].responseData, 'hex');

        //response Header to json object
        var ResHeader = val[0].responseHeader
        var ReHead = arrayToObject(ResHeader)
    
        return res.set(ReHead).send(buf);

    }
}



