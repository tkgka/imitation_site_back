import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class addvalInput {
  @Field()
  path: string;

  @Field((type) => [String], { nullable: true })
  tag?: string[];

  @Field()
  requestMethod: string;

  @Field((type) => String)
  requestURL: string;
    responseCode: number;
    responseHeader: KeyValInput[];
    responseData: string;

    @Field((type) => String, { nullable: true })
    Description?: string;

  
  @Field((type) => [KeyValInput], { nullable: true })
  requestHeaders?: KeyValInput[];

  @Field((type) => [KeyValInput], { nullable: true })
  requestData?: KeyValInput[];

}


@InputType()
export class KeyValInput {
  @Field()
  key: string;

  @Field()
  value: string;
}