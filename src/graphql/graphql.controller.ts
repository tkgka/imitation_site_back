import { Controller, Get, Response, Req, Body, Post, UploadedFile, Bind, UseInterceptors } from '@nestjs/common';
import { Response as Res } from 'express';
import { GraphqlService } from './graphql.service';
import { arrayToObject, HexToJson } from 'src/GlobalFunctions';
import { FileInterceptor } from '@nestjs/platform-express';
import { MongoGraphql } from './graphql.entity';
import { addvalInput } from './dto/add-val_input';
const fs = require("fs")

@Controller('graphql')
export class GraphqlController {
    constructor(private readonly GraphqlService: GraphqlService) { }




    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Response() res: Res, @Body() body): Promise<any> {
        // console.log(file,body.path)
        if ((file != undefined && file != null) && (body.path != undefined && body.path != null) && (body.toDB != undefined && body.toDB != null)) {

            const ReturnCodeNHeader = await HexToJson(file.buffer.toString('hex').split('0d0a0d0a')[0])

            const UploadFile: addvalInput = {
                path: body.path,
                tag: [],
                requestMethod: '',
                requestURL: '',
                responseCode: ReturnCodeNHeader.return_code, // hextojson return_code
                responseHeader: ReturnCodeNHeader.return_header, //hextojson return_header
                responseData: file.buffer.toString('hex').split('0d0a0d0a')[1],
                description: body.description
            }
            if (body.toDB == "true" || body.toDB == 1) {
                var resCode = 400
                if ((await this.GraphqlService.findByPath(body.path)).length <= 0) {
                    resCode = 406;
                    try {
                        await this.GraphqlService.addDataByFile(UploadFile)
                        return res.send(true)
                    } catch {

                        return res.status(resCode).send(false)
                    }
                } else {
                    return res.status(resCode).send(false)
                }

            }
            const buf = Buffer.from(UploadFile.responseData, 'hex');

            //response Header to json object
            var ResHeader = UploadFile.responseHeader
            var ReHead = arrayToObject(ResHeader)

            return res.set(ReHead).send(buf);


        }
        return res.send(true)
    }


    @Post('/tag')
    FindByTag(@Body() payload) {
        return this.GraphqlService.findByTag(payload.val);
    }


    @Get('/rescode')
    async FindByResCode(@Req() req) {
        return await this.GraphqlService.findByResCode(req.query.val);
    }

    @Get('/method')
    async FindByMethod(@Req() req) {
        return await this.GraphqlService.findByMethod(req.query.val);
    }
    @Get('/path')
    async FindByPath(@Req() req) {
        return await this.GraphqlService.findByPath(req.query.val);
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



