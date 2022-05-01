import { Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';
import { GraphqlResolver } from './graphql.resolver';

@Module({
  providers: [GraphqlService, GraphqlResolver],
})
export class GraphqlModule {}
