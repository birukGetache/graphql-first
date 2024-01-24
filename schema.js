const graphql = require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLSchema}=graphql;//grab this properties
const BooKType= new GraphQLObjectType({
    name:"BookType",
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},//these property is wraped to this function
        genre:{type:GraphQLString}
    })
})
const RootQuery= new GraphQLObjectType({
    name:"rootQuery",
    fields:{
        book:{
            type:BooKType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
            //parent come to play when I make relation ship between types

        }
    }
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery
})