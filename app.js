const express = require('express')
const app = express()
const port = process.env.PORT || 3000;  

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

// change my code 

app.get('/', function (req, res) {
  res.sendFile('index.html');

})

//ejs stuff
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