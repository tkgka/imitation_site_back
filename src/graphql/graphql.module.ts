import { Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';
import { GraphqlResolver } from './graphql.resolver';
import { GraphqlController } from './graphql.controller';

@Module({
  providers: [GraphqlService, GraphqlResolver],
  controllers: [GraphqlController],
})
export class GraphqlModule {}
