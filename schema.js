const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull}=graphql;//grab this properties or packages
const Book = require('./model/book');
const Author= require('./model/author');
const BooKType= new GraphQLObjectType({
    name:"BookType",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},//these property is wraped to this function
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
             // return _find(author,{id:parent.authorid});
             return Author.findById(parent.authorid);
            }
        }
    })
})


const AuthorType= new GraphQLObjectType({
    name:"AuthorType",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},//these property is wraped to this function
        age:{type:graphql.GraphQLInt},
        books:{
            type : new GraphQLList(BooKType),
            resolve(parent,args){
                //return _.filter(book,{authorid:parent.id});
                return Book.find({authorid:parent.id});
            }
        }
    })
})
const RootQuery= new GraphQLObjectType({
    name:"rootQuery",
    fields:{
        book:{
            type:BooKType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
            //parent come to play when I make relation ship between types
            return Book.findById(args.id);
        }
    },
    author:{
        type:AuthorType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            //
            return Author.findById(args.id);
        }
    },
    books:{
        type : new GraphQLList(BooKType),
       resolve(parent,args){
        // return books;
        return Book.find({});
       }
    },
    authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent,args){
            // return authors;
            return Author.find({});
        }
    }
    }
})
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addauthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author= new Author({
                    name:args.name,
                    age:args.ages
                })
               return author.save();
            }
        },
        addBook:{
            type:BooKType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                genre:{type:GraphQLNonNull(GraphQLString)},
                authorid:{type:GraphQLID},
            },
             resolve(parent,args){
               let book = new Book({
                name:args.name,
                genre:args.genre,
                authorid:args.authorid
               }) 
               return book.save();

             }
        }
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})