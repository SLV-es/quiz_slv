var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var quizCreditos = require('../creditos/quiz_creditos');

/* GET home page. */
// Página de entrada (home page)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz-SLV' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes',                quizController.index);
router.get('/quizes/:quizId',        quizController.show);
router.get('/quizes/:quizId/answer', quizController.answer);

// Definición de rutas de /creditos
router.get('/creditos/credito', quizCreditos.credito);

module.exports = router;
