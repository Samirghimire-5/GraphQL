import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../types/user";

let users: User[] = [
  { id: 1, name: "Suman", email: "XXXXXXXXXXXXXXX" },
  { id: 2, name: "Samir", email: "sdajflkjf" }
];
let id = 2; 

@Resolver(User)
export class UserResolver {
  @Query (() => [User])
  getUsers() {
    return users;
  }

  @Mutation(() => User)
  addUser(
    @Arg("name") name: string,
    @Arg("email") email: string
  ): User {
    const user = {id: id++, name, email};
    users.push(user);
    return user;
  }
}
