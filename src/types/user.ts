import { Field, Int, ObjectType } from "type-graphql";

@ObjectType() 
export class User {
  @Field(() => Int)
  id!: number

  @Field()
  name!: string;

  @Field()
  email!: string;
  // password: string;
  // createdAt: Date;
  // updatedAt: Date;
}

