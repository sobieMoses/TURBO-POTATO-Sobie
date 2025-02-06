const express = require('express')
require('dotenv').config()
const shajs = require('sha.js')
const app = express()
const port = process.env.PORT || 3000;  
const bodyParser = require('body-parser')

//console.log(uri)
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'))
 

//MongoClient Code
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

console.log(shajs('sha256').update('food').digest('hex'));

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);
//end of MongoClient Code

async function getData() {
  await client.connect();
  let collection = await client.db("secret-food-app").collection("secret-app-foods");
  console.log('a')
  //new code HERE
  let results = await collection.find({}).toArray();
  // console.log(results); 
  //.limit(50)
  //.toArray();
  //res.send(results).status(200);
  console.log(results);
  return results;
}
//getData();



app.get('/read', async function (req, res) {
  let getDataResults = await getData();
  console.log(getDataResults);
  res.render('foods',
    { foodData : getDataResults} );
  
  })
//FIX THIS SNIPPETT

//start of new code
app.post('/insert', async (req,res)=> {
  // app.get('/insert', async (req,res)=> {
  
    console.log('in /insert');
    
    let newSong = req.body.myName; //only for POST, GET is req.params? 
    // let newSong = req.query.myName;
    console.log(newSong);
  
    //connect to db,
    await client.connect();
    //point to the collection 
    await client
      .db("guitar-app-database")
      .collection("guitar-app-songs")
      .insertOne({ whatthewhatever: newSong});
  
    res.redirect('/read');
  
  }); 
  
  app.post('/update', async (req,res)=>{
  
    console.log("req.body: ", req.body)
  
    client.connect; 
    const collection = client.db("barrys-db").collection("whatever-collection");
    let result = await collection.findOneAndUpdate( 
    {"_id": new ObjectId(req.body.nameID)}, { $set: {"fname": req.body.inputUpdateName } }
  )
  .then(result => {
    console.log(result); 
    res.redirect('/');
  })
  }); 
  
  app.post('/delete/:id', async (req,res)=>{
  
    console.log("in delete, req.parms.id: ", req.params.id)
  
    client.connect; 
    const collection = client.db("barrys-db").collection("whatever-collection");
    let result = await collection.findOneAndDelete( 
    {"_id": new ObjectId(req.params.id)}).then(result => {
    console.log(result); 
    res.redirect('/');})
  
    
  
  })
//begin all my middlewares
app.get('/', function (req, res) {
  res.sendFile('index.html');

})
app.post('/saveMyName', (req,res)=>{
  console.log('did we hit the post endpoint?'); 
  console.log(req.body); 
  // res.redirect('/ejs'); 
  res.render('words',
  {pageTitle: req.body.myName});

})

app.get('/saveMyNameGet', (req,res)=>{
  console.log('did we hit the get endpoint?'); 

  console.log('req.query: ', req.query); 

  // console.log('req.params: ', req.params);

  let reqName = req.query.myNameGet; 
  // res.redirect('/ejs'); 

  res.render('words',
  {pageTitle: reqName});

})


app.get('/ejs', function (req, res) {
  res.render('words',
    {pageTitle: 'my cool ejs page'}
  );
})



app.get('/nodemon', function (req, res) {
  res.send('look ma, no kill node process then restart node then refresh browser...cool?');

})

//endpoint, middleware(s)
app.get('/helloRender', function (req, res) {
  res.send('Hello Express from Real World<br><a href="/">back to home</a>')
})




app.listen(
  port, 
  ()=> console.log(
    `server is running on ... ${port}`
    )
  );