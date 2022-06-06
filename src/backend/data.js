var db = require('./database')
const { ConnectableObserveble } = require ('rxjs');
const express = require ('express');
const app = express();
 const bodyparser = require('body-parser');
 const cors = require('cors');



 app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 
  'Content-Type');   next();
 });

db.connect(err => {
  if (err) { console.log('err'); }
  console.log('database Connected....');
})



app.get('/user', (req, res) => {

  let qr = `Select * from public."login"`;

  db

      .query({

          // rowMode: "array",

          text: qr

      })

      .then(result => {



          var data1 = [];

          for (var i = 0; i < result.rows.length; i++) {

              data1.push({

   
                  username: result.rows[i].username,

                  password: result.rows[i].password,

                  

              });

          }

          res.send(


              data1

          );


      })

      .catch(err => console.log(err, 'errs'));

});

app.listen(3000, () => {

  console.log('Server Running');

})