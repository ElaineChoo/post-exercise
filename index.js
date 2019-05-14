const jsonfile = require('jsonfile');
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

// tell your app to use the module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

////////////////////////////////////
app.engine('handlebars', handlebars());
// this line sets handlebars to be the default view engine
app.set('view engine', 'handlebars')
////////////////////////////////////

app.post('/animals', function(request, response) {

  //debug code (output request body)
  console.log(request.body);


  // save the request body
  jsonfile.writeFile('data.json', request.body, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(response.body);
  });
});

let handleRequest = (request, response) => {
  console.log("handling request");
  
  response.render('home');
};

app.get('/', handleRequest);

app.listen(3000, () => console.log('Listening @ 3000'));