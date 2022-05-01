import { Controller, Get, Response, Req } from '@nestjs/common';
import { Response as Res } from 'express';
import { AppService } from './app.service';
import { MongoGraphql } from './graphql/graphql.entity';
const Content = require('./DB/contents');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async ReturnBuffer(@Response() res: Res, @Req() req) {
    try {
      const response = await this.appService.returnBuffer(req.query.url);
      console.log(response.headers);
      return res.set(response.headers).send(response.data);
    } catch (e) {
      return e;
    }
  }

  @Get('/hello')
  async getHello(@Response() res: Res, @Req() req) {
    const val = await findAll();
    const buf = Buffer.from(val[9].responseData, 'hex');

        
    //response Header to json object
    var ResHeader = val[9].responseHeader
    console.log(ResHeader)
    var ReHead = {}

    for (var i in ResHeader) {
      ReHead[ResHeader[i].key] = ResHeader[i].value
    }

    return res.set(ReHead).send(buf);
    // return this.appService.getHello();
  }
}

async function findAll(): Promise<MongoGraphql[]> {
  return Content.find();
}
