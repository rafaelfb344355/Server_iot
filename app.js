var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const Port = process.env.PORT || 3001;

// Estado para data e hora
var dateTimeConfig = {
    date: '',
    time: ''
};

// Estado para configuração do Pomodoro
var pomodoroConfig = {
    totalDuration: 0,
    studyTime: 0,
    breakTime: 0,
    selectedOption: ''
};

// Rotas de configuração
var configRoutes = express.Router();

// Rota POST para configurar data e hora
configRoutes.route('/datetime').post(function(req, res) {
    dateTimeConfig.date = req.body.date;
    dateTimeConfig.time = req.body.time;

    console.log('Configuração de Data e Hora:', dateTimeConfig);
    res.send({ status: 'success' });
});

// Rota GET para visualizar data e hora
configRoutes.route('/datetimes').get(function(req, res) {
    res.send(dateTimeConfig);
});

// Rota POST para configurar o Pomodoro
configRoutes.route('/pomodoro').post(function(req, res) {
    pomodoroConfig.totalDuration = Number(req.body.totalDuration);
    pomodoroConfig.studyTime = Number(req.body.studyTime);
    pomodoroConfig.breakTime = Number(req.body.breakTime);
    pomodoroConfig.selectedOption = req.body.selectedOption;

    console.log('Configuração de Pomodoro:', pomodoroConfig);
    res.send({ status: 'success' });
});

// Rota GET para visualizar a configuração do Pomodoro
configRoutes.route('/pomodoros').get(function(req, res) {
    res.send(pomodoroConfig);
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
