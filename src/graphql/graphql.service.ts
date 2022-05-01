import { Injectable } from '@nestjs/common';
import { MongoGraphql } from './graphql.entity';
import { startSession } from 'mongoose';
import Axios from 'axios';
import { addvalInput } from './dto/add-val_input';
const Content = require('../DB/contents');

@Injectable()
export class GraphqlService {
  async addData(data: addvalInput): Promise<MongoGraphql> {
    const session = await startSession();
    const buf = await Axios({
      url: data.requestURL,
      method: data.requestMethod,
      responseType: 'arraybuffer',
    });

    console.log(buf.headers);
    var NewResponseHeader = []

    for (var key in buf.headers) {
        NewResponseHeader.push({key: key, value: buf.headers[key]})
    }
    
    data.responseCode = buf.status;
    data.responseHeader = NewResponseHeader;
    data.responseData = buf.data.toString('hex');
    
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
}
