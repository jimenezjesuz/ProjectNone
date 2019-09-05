const app = require('./config/server');
require('./app/routes/task')(app);

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})