import { Injectable, Req } from '@nestjs/common';
import { MongoGraphql } from './graphql.entity';
import { startSession } from 'mongoose';
import Axios from 'axios';
import { addvalInput } from './dto/add-val_input';
const Content = require('../DB/contents');
import { arrayToObject } from 'src/GlobalFunctions';
import reg_pattern from '../reg_pattern';

@Injectable()
export class GraphqlService {


  async addDataByURL(data: addvalInput): Promise<MongoGraphql> {
    const RequestHeader = arrayToObject(data.requestHeaders)
    var requestData = null

    if (data.requestData != undefined) {
      requestData = arrayToObject(data.requestData)
    }
    data.requestURL.match(reg_pattern.pattern) ? (data.requestURL = data.requestURL) : (data.requestURL = `https://${data.requestURL}`);

    const buf = await Axios({
      url: data.requestURL,
      method: data.requestMethod,
      responseType: 'arraybuffer',
      headers: RequestHeader,
      data: requestData
    });

    var NewResponseHeader = []

    for (var key in buf.headers) {
      if (Array.isArray(buf.headers[key])) {
        buf.headers[key] = buf.headers[key][0]
      }
      NewResponseHeader.push({ key: key, value: buf.headers[key] })

    }

    data.responseCode = buf.status;
    data.responseHeader = NewResponseHeader;
    data.responseData = buf.data.toString('hex');
    // console.log(data)
    return this.addData(data);
  }

  async addDataByFile(data: addvalInput) {
    return this.addData(data);
  }


  async addData(data: MongoGraphql) {
    const session = await startSession();
    try {
      session.startTransaction();
      const newData = new Content(data);
      const result = await newData.save();
      await session.commitTransaction();
      return result;


    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }




  async findAll(): Promise<MongoGraphql[]> {
    return Content.find({}).limit(10);
  }
  async findAllWithlimit(val): Promise<MongoGraphql[]> {
    var limit: number
    var offset: number
    val.offset == undefined ? (offset = 0) : (offset = val.offset)
    val.limit == undefined ? (limit = 10) : (limit = val.limit)
    return Content.find({}).limit(limit).skip(offset).sort({ _id: -1 });
  }

  async findByTag(val): Promise<MongoGraphql[]> {
    var limit: number
    var offset: number
    val.offset == undefined ? (offset = 0) : (offset = val.offset)
    val.limit == undefined ? (limit = 10) : (limit = val.limit)
    let data = Content.find({ tag: { $all: val.tag } }).skip(offset).limit(limit)
    return data
  }

  async findByPath(val): Promise<MongoGraphql[]> {
    let data = Content.find({ path: { $in: val } })
    return data
  }

  async findByResCode(val): Promise<MongoGraphql[]> {
    var limit: number
    var offset: number
    val.offset == undefined ? (offset = 0) : (offset = val.offset)
    val.limit == undefined ? (limit = 10) : (limit = val.limit)
    let data = Content.find({ responseCode: { $in: val.responseCode } }).skip(offset).limit(limit)
    return data
  }

  async findByMethod(val): Promise<MongoGraphql[]> {
    var limit: number
    var offset: number
    val.offset == undefined ? (offset = 0) : (offset = val.offset)
    val.limit == undefined ? (limit = 10) : (limit = val.limit)
    let data = Content.find({ requestMethod: { $in: val.requestMethod } }).skip(offset).limit(limit)
    return data
  }


}
