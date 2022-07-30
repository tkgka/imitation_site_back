import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class addvalInput {
  @Field((type) => String, { nullable: true })
  path: string; // not using now

  @Field((type) => [String], { nullable: true })
  tag?: string[];

  @Field((type) => String, { nullable: true })
  requestURL: string;

  @Field()
  requestMethod: string;

  @Field()
  responseCode: number;

  @Field((type) => [KeyValInput])
  responseHeader!: KeyValInput[];

  @Field((type) => String)
  responseData: string;

  @Field((type) => String, { nullable: true })
  description?: string;
}

@InputType()
export class KeyValInput {
  @Field()
  key: string;

  @Field()
  value: string;
}
