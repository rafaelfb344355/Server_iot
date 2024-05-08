var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Objeto para armazenar as variáveis localmente
var state = {
  motor: false,
  speed: 0,
  direction: 'none',
  heater: false,
  temperature: 0
};

app.post('/state', function(req, res) {


    state.motor = req.body.motor ==='true'  ;
    state.direction = req.body.direction;
    state.speed = Number(req.body.speed );
    state.heater = req.body.heater === 'true' ;
    state.temperature = Number(req.body.temperature);
    
    console.log( state);
    res.send({ status: 'success' });
  });

app.get('/state', function(req, res) {
   
    res.send(state);
  });

app.listen(3000, function() {
  console.log('Listening on *:3000');
});