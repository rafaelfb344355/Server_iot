var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// Certifique-se de que o caminho está correto
const Port = process.env.PORT || 3001;

var User = {
 usuario:"tsd",
 senha: 'none',
 
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

userRoutes.route('/login').post(async function(req, res) {
  const { usuario, senha } = req.body;

  try {
    const user = await User.findOne({ Email: usuario });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    if (user.Senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    console.log( user._id );
    res.status(200).json({ message: 'Login bem-sucedido', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
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