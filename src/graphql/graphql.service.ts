import { Injectable, Req } from '@nestjs/common';
import { MongoGraphql } from './graphql.entity';
import { startSession } from 'mongoose';
import Axios from 'axios';
import { addvalInput } from './dto/add-val_input';
const Content = require('../DB/contents');
import { arrayToObject } from 'src/GlobalFunctions';

@Injectable()
export class GraphqlService {


  async addDataByURL(data: addvalInput): Promise<MongoGraphql> {
    
    const RequestHeader = arrayToObject(data.requestHeaders)
    const requestData = arrayToObject(data.requestData)

    const buf = await Axios({
      url: data.requestURL,
      method: data.requestMethod,
      responseType: 'arraybuffer',
      headers: RequestHeader,
      data: requestData
    });

    var NewResponseHeader = []

    for (var key in buf.headers) {
        NewResponseHeader.push({key: key, value: buf.headers[key]})
    }
    
    data.responseCode = buf.status;
    data.responseHeader = NewResponseHeader;
    data.responseData = buf.data.toString('hex');
    // console.log(data)
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
    return Content.find();
  }

  async findByTag(val): Promise<MongoGraphql[]> {
    let data = Content.find({ tag: { $all: val }} ,{path:1, Description:1, _id:0})
    return data
  }

  async findByPath(val): Promise<MongoGraphql[]> {
    let data = Content.find({ path: { $in: val }})
    return data
  }

}
