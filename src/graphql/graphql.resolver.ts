import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { addvalInput } from './dto/add-val_input';
import { findByInput } from './dto/Find-val_input';
import { MongoGraphql } from './graphql.entity';
import { GraphqlService } from './graphql.service';
@Resolver((of) => MongoGraphql)
export class GraphqlResolver {
  constructor(private GraphqlService: GraphqlService) {}

  @Query((returns) => [MongoGraphql])
  gql(): Promise<MongoGraphql[]> {
    return this.GraphqlService.findAll();
  }

  @Mutation((returns) => MongoGraphql)
  addVal(@Args('addvalInput') addvalInput: addvalInput): Promise<MongoGraphql> {
    console.log("1")
    console.log(addvalInput);
    return this.GraphqlService.addDataByURL(addvalInput);
  }


  @Mutation((returns) => [MongoGraphql])
  findAll(@Args('findAll') findByInput: findByInput): Promise<MongoGraphql[]> {
    return this.GraphqlService.findAllWithlimit(findByInput);
  }

  @Mutation((returns) => [MongoGraphql])
  findByTag(@Args('findByTag') findByInput: findByInput): Promise<MongoGraphql[]> {
    return this.GraphqlService.findByTag(findByInput);
  }


  @Mutation((returns) => [MongoGraphql])
  findByResCode(@Args('findByResCode') findByInput: findByInput): Promise<MongoGraphql[]> {
    return this.GraphqlService.findByResCode(findByInput);
  }

  @Mutation((returns) => [MongoGraphql])
  findByMethod(@Args('findByMethod') findByInput: findByInput): Promise<MongoGraphql[]> {  
    return this.GraphqlService.findByMethod(findByInput);
  }

}
