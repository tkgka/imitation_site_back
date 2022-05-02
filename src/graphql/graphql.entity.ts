import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MongoGraphql {
  @Field()
  path: string;

  @Field((type) => [String], { nullable: true })
  tag?: string[];

  @Field()
  requestMethod: string;

  @Field()
  responseCode: number;

  @Field((type) => [KeyVal])
  responseHeader!: KeyVal[];

  @Field((type) => String)
  responseData: string;

  @Field((type) => String, { nullable: true })
  description?: string;
}

@ObjectType()
export class KeyVal {
    @Field()
    key: string;
  
    @Field()
    value: string;
  }