var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const Port = process.env.PORT || 3001;

// Estado para controle de porta e alarme
var controlConfig = {
    openDoor: false,
    closeDoor: false,
    alarmOn: false,
    alarmOff: false
};

// Rotas de configuração
var configRoutes = express.Router();

// Rota POST para controle de porta e alarme
configRoutes.route('/control').post(function(req, res) {
    controlConfig.openDoor = req.body.openDoor || false;
    controlConfig.closeDoor = req.body.closeDoor || false;
    controlConfig.alarmOn = req.body.alarmOn || false;
    controlConfig.alarmOff = req.body.alarmOff || false;

    console.log('Configuração de Controle:', controlConfig);
    res.send({ status: 'success' });
});

// Rota GET para visualizar a configuração de controle
configRoutes.route('/controls').get(function(req, res) {
    res.send(controlConfig);
});

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/config', configRoutes);

app.get('/', (req, res) => {
    res.send('API Server is running');
});

app.listen(Port, function(){
    console.log('Escutando na porta ' + Port);
});
