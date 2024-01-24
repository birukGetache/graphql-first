const express = require("express");
const schema= require('./schema');
 const { graphqlHTTP } = require("express-graphql");
const app = express();
app.use('/graphql',graphqlHTTP({
    schema:schema//by the way we can write simply schema
}));
app.listen(3000,()=>{
    console.log("the server is listening");
});