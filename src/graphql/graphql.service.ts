import { Injectable, Req } from '@nestjs/common';
import { MongoGraphql } from './graphql.entity';
import { startSession } from 'mongoose';
import Axios from 'axios';
import { addvalInput } from './dto/add-val_input';
const Content = require('../DB/contents');
import { arrayToObject } from 'src/GlobalFunctions';
import reg_pattern from '../reg_pattern';
import { findByInput } from './dto/find-val_input';

@Injectable()
export class GraphqlService {


  async addDataByURL(data: addvalInput) {
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
    try {
      await this.addData(data);
      return true
    } catch {
      return false
    }

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


  async deleteData(val: findByInput): Promise<Boolean> {
    if (val.path.length <= 0) {
      return false
    }
    try {
      await Content.deleteOne({ path: { $in: val.path } })
      return true
    } catch {
      return false
    }
  }

  async findAll(): Promise<MongoGraphql[]> {
    return Content.find({}).limit(12);
  }
  async findAllWithlimit(val): Promise<MongoGraphql[]> {
    var limit: number
    var offset: number
    val.offset == undefined ? (offset = 0) : (offset = val.offset)
    val.limit == undefined ? (limit = 12) : (limit = val.limit)
    return Content.find({}).limit(limit).skip(offset).sort({ _id: -1 });
  }

  async findByTag(val): Promise<MongoGraphql[]> {
    var limit: number
    var offset: number
    val.offset == undefined ? (offset = 0) : (offset = val.offset)
    val.limit == undefined ? (limit = 10) : (limit = val.limit)
    let data = Content.find({ tag: { $all: val.tag } }).skip(offset).limit(limit).sort({ _id: -1 });
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
    let data = Content.find({ responseCode: { $in: val.responseCode } }).skip(offset).limit(limit).sort({ _id: -1 });
    return data
  }

  async findByMethod(val): Promise<MongoGraphql[]> {
    var limit: number
    var offset: number
    val.offset == undefined ? (offset = 0) : (offset = val.offset)
    val.limit == undefined ? (limit = 10) : (limit = val.limit)
    let data = Content.find({ requestMethod: { $in: val.requestMethod } }).skip(offset).limit(limit).sort({ _id: -1 });
    return data
  }

  async updatedata(val: findByInput): Promise<Boolean> {
    if (val.responseData == "" || (await this.findByPath(val.path)).length <= 0 || val.responseCode < 100) {
      return false
    }
    try {
      await Content.updateOne({ path: { $in: val.path } }, { $set: { responseData: val.responseData, tag: val.tag, responseHeader: val.responseHeader, description: val.description, responseCode: val.responseCode } })
      return true
    } catch {
      return false
    }

  }

  //delete data by path
  async deleteDataByPath(val: string): Promise<Boolean> {
    // for the exception handling
    if (val.length <= 0) {
      return false
    }

    try {
      await Content.deleteOne({ path: { $in: val } })
      return true
    } catch {
      return false
    }
  }
}
