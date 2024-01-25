const  express =require('express'); 
const { createHandler } =require( 'graphql-http/lib/use/express');
const moongoose= require('mongoose');
const cors= require(cors);
mmongoose.connect('mongodb://localhost:27017');
mongoose.connection.once('open',()=>{
    console.log("connection is established");
})
const { schema } =require('./schema');
const app = express();
app.use(cors);
app.all('/graphql', createHandler({ schema }));

app.listen({ port: 4000 });
console.log('Listening to port 4000');
