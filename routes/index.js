var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var quizCreditos = require('../creditos/quiz_creditos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz-SLV' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/creditos/credito', quizCreditos.credito);

module.exports = router;
