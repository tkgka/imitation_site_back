import { Controller, Get, Response, Req, Post, UseInterceptors, UploadedFile, Bind } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as Res } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
 
  @Get('/')
  async ReturnBuffer(@Response() res: Res, @Req() req) {
    try {
      const response = await this.appService.returnBuffer(req.query.url);
      // console.log(response.headers);
      return res.set(response.headers).send(response.data);
    } catch (e) {
      return res.send("Error");
    }
  }

  @Get('/hello')
  async getHello() {
    return this.appService.getHello();
  }
}


