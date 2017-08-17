const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const models = require ('./models');


var port = process.env.PORT || 3000;
const routes = require('./routes/users.js');

app.use('/vendor', express.static(path.join((__dirname, 'node_modules'))));
app.use(express.static(path.join(__dirname, './public')))


nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('method-override')('_method'));

app.get('/', (req, res, next)=>{
  res.render('index');
})

app.use('/users', routes);

//aaa

// app.listen(port,()=>{
//   console.log(`server listening on port ${port}`);
// })

models.db.sync({force: true})
  .then(function(){
      return Promise.all([
      models.User.create({name:'test'}),
      models.User.create({name:'bob'})
      ])
    })
  .then(function(){
    return Promise.all([
      models.Award.create({name: 'this award', userId: 1}),
      models.Award.create({name: 'that award', userId: 1}),
      models.Award.create({name: 'Cool dude', userId: 2})
      ])
  })
  .then((results)=>{


    app.listen(port, ()=>{
      console.log(`server listening on port ${port}`);
    })
  })


// app.use(function(err, req, res, next){
//   res.render('error', {err:err});
// })
