import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { addvalInput } from './dto/add-val_input';
import { MongoGraphql } from './graphql.entity';
import { GraphqlService } from './graphql.service';
@Resolver((of) => MongoGraphql)
export class GraphqlResolver {
  constructor(private GraphqlService: GraphqlService) {}

  @Query((returns) => [MongoGraphql])
  GPL(): Promise<MongoGraphql[]> {
    return this.GraphqlService.findAll();
  }

  @Mutation((returns) => MongoGraphql)
  addVal(@Args('addvalInput') addvalInput: addvalInput): Promise<MongoGraphql> {
    return this.GraphqlService.addData(addvalInput);
  }
}
