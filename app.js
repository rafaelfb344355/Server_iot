var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// const usuario= process.env.USER || "teste";
// const senha = process.env.PASSWORD || 123;
const Port = process.env.PORT || 3001;

 var User = {
usuario:"teste",
 senha: '123',
 
 };
var state = {
  motor: false,
  speed: 0,
  direction: 'none',
  heater: false,
  temperature: 0
};

var stateRoutes = express.Router();
var userRoutes = express.Router();

stateRoutes.route('/').get(function (req, res) {
  res.send(state);
});

stateRoutes.route('/post').post(function (req, res) {
  state.motor = req.body.motor ==='true';
  state.direction = req.body.direction;
  state.speed = Number(req.body.speed );
  state.heater = req.body.heater === 'true';
  state.temperature = Number(req.body.temperature);
  
  console.log( state);
  res.send({ status: 'success' });
});

userRoutes.route('/login').post(function(req, res) {
  const { usuario, senha } = req.body;

  // Imprime os dados recebidos no console
  console.log('Dados recebidos:', req.body);

  if (usuario === User.usuario && senha === User.senha) {
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/state', stateRoutes);

app.get('/', userRoutes);

app.listen(Port, function(){
    console.log('Escutando na porta ' + Port);
});