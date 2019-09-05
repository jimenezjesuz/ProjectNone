const dbConecction = require('../../config/connectionDb');
module.exports = app => {
    const cnnc = dbConecction();
    app.get('/', (req, res) => {
        cnnc.query('select * from user', (err, resultUser) => {
            cnnc.query('select * from task', (err, resultTask) => {

                /*  for (var i = 0; i < resultTask.length; i++) {
                      var tasks = new Array();
                      var p = {
                          id: resultTask[i].id,
                          name: resultTask[i].name,
                          description: resultTask[i].description,
                          id_user: cnnc.query('select * from user where id_user=?',
                              [resultTask[i].id_user], (err, user) => {return user}),
                          id_status_task: cnnc.query('select * from status where id=?',
                              [resultTask[i].id_status_task], (err, status) => {return status})
  
                      }
                      console.log(p);
                      tasks.push(p);
  
                  }*/
                cnnc.query('select * from status', (err, resultStatus) => {
                    res.render('task/task', {
                        statusList: resultStatus,
                        taskLits: resultTask,
                        userList: resultUser
                    })
                });
            });
        });

    });
    //save task
    app.post('/task', (req, res) => {
        const { name, description, id_user, id_status_task } = req.body;
        console.log(name, description, id_user, id_status_task);
        var instertar = cnnc.query('insert into task SET?', {
            name, description, id_user, id_status_task
        }, (err, result) => {
            res.redirect('/');
        });
    })

    // SHOW EDIT TASK FORM
    app.get('/task/edit/(:id)', function (req, res, next) {
        cnnc.query('SELECT * FROM task WHERE id = ' + req.params.id, function (err, rows, fields) {
            if (err) throw err
            // if task not found
            if (rows.length <= 0) {
                res.redirect('/')
            } cnnc.query('select * from user', (err, resultUser) => {
                cnnc.query('select * from status', (err, resultStatus) => {
                    // if task found
                    // render to views/task/edit.ejs template file
                    res.render('task/edit', {
                        task: rows[0],
                        statusList: resultStatus,
                        userList: resultUser
                    })
                });
            });
        })
    })


    // EDIT USER POST ACTION
    app.post('/task/update/(:id)', function (req, res, next) {
        cnnc.query('UPDATE task SET ? WHERE id = ' + req.params.id, req.body, function (err, result) {
            res.redirect('/');
        })
    })

    // DELETE USER POST ACTION
    app.get('/task/delete/(:id)', function (req, res, next) {
        cnnc.query('UPDATE task SET id_user=null WHERE id = ' + req.params.id, function (err, result) {
            res.redirect('/');
        })
    })
} 