import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class findByInput {

    @Field((type) => String, { nullable: true })
    path: string;

    @Field((type) => [String], { nullable: true })
    tag?: string[];

    @Field((type) => String, { nullable: true })
    requestMethod: string;

    @Field((type) => Int, { nullable: true })
    responseCode: number;

    @Field((type) => Int, { nullable: true })
    limit: number;
    @Field((type) => Int, { nullable: true })
    offset: number;
}