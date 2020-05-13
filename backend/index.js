const express= require('express');
const graphqlHTTP= require('express-graphql');
const schema= require('./schema/schema');
const cors= require('cors');
const app= express();
const mongoose = require('mongoose');
const { mongoDB } = require('./config');

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectInterval: 500,
    poolSize: 500,
    bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, ()=>{
    console.log("GraphQL server is running on port 3001 as in 'localhost:3001/graphql' ");
})