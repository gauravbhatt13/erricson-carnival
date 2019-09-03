var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/carnival';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var EmployeeModelSchema = new Schema({
    name: String,
    email: String
});

EmployeeModelSchema.plugin(AutoIncrement, {inc_field: 'id'});

var Employee = mongoose.model('employee', EmployeeModelSchema );

const title = 'Erriccson Carnival';

router.get('/', function (req, res, next) {
    res.render('index', {title: title, success: false});
});

/* POST page. */
router.post('/', function(req, res, next) {
  console.log(req.body.email);
  var employeeInstance = new Employee({ name: req.body.name, email: req.body.email });
  employeeInstance.save(()=>{
      res.redirect('/');
  });
});

module.exports = router;
