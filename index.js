import { GraphQLServer } from "graphql-yoga";

const Users = [
  {
    id: 1,
    username: "john",
    city: "Melbourne",
  },
  {
    id: 2,
    username: "mseven",
    city: "Istanbul",
  },
  {
    id: 3,
    username: "maria",
    city: "Zagreb",
  },
];
const Posts = [
  {
    id: 1,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    userId: 1,
  },
  {
    id: 2,
    title:
      "Lorem Ipsum je jednostavno probni tekst koji se koristi u tiskarskoj i slovoslagarskoj industriji.",
    userId: 3,
  },
  {
    id: 3,
    title:
      "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir.",
    userId: 2,
  },
  {
    id: 4,
    title:
      "Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir22222.",
    userId: 1,
  },
];

const typeDefs = `
 type Query {
    hello: String
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User!
    post(id:ID!): Post!   
 }

 type Mutation{
    addUser(id:ID!, username:String!, city:String! ): User
  }

 type User{
    id: ID!
    username: String!
    city: String
    posts: [Post!]
}

type Post{
    id: ID!
    title: String!
    userId: ID!
    user: User!
}  
`;
const resolvers = {
  Query: {
    user: (parent, args) => Users.find((user) => String(user.id) === args.id),
    users: (parent, args) => Users,

    post: (parent, args) => Posts.find((post) => String(post.id) === args.id),
    posts: (parent, args) => Posts,
  },
  Post: {
    user: (parent, args) => Users.find((user) => user.id === parent.userId),
  },
  User: {
    posts: (parent, args) => Posts.filter((post) => parent.id === post.userId),
  },
  Mutation: {
    addUser: (_, { id, username, city }) => {
      const newUser = {
        id: id,
        username: username,
        city: city,
      };
      Users.push(newUser);
      return newUser;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: 4000 }, () =>
  console.log("Server is running on http://localhost:4000")
);
