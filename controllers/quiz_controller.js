﻿var models = require('../models/models.js');

// Autoload: Id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
	  where: { id: Number(quizId) },
	  include: [{ model: models.Comment }]
  }).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

// GET /quizes
exports.index = function(req, res) {
	if (req.query.search) {
		var search = "%" + req.query.search + "%";
		search = search.replace(" ","%");
		models.Quiz.findAll({where: ["pregunta like ?", search], order: "pregunta ASC"}).then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
		).catch(function(error){next(error)});
	} else if (req.query.tema) {
		var tema = req.query.tema;
		models.Quiz.findAll({where: {tema: tema}, order: "pregunta ASC"}).then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
		).catch(function(error){next(error)});		
	} else {
		models.Quiz.findAll( {order: "pregunta ASC"} ).then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
		).catch(function(error){next(error)});
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {resultado = 'Correcto';}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema" });  // crea objeto quiz
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);  // crea objeto quiz

	quiz.validate().then(
		function(err){
			if (err) { res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				// guarda en la BDD los campos pregunta y respuesta de quiz
				quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(
					function(){ res.redirect('/quizes')} // Redirección HTTP (URL relativo) lista de preguntas
				)
			}
		}
	);
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
	var quiz = req.quiz; // autoload de instancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta  = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema      = req.body.quiz.tema;	

	req.quiz.validate().then(
		function(err){
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz  // save: guarda campos pregunta y respuesta en la BDD
				.save( {fields: ["pregunta","respuesta","tema"]} )
				.then( function(){ res.redirect('/quizes');} );  // Redirección HTTP (URL relativo) lista de preguntas
			}
		}
	);
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy()
	.then( 
		function(){ res.redirect('/quizes');}  // Redirección HTTP (URL relativo) lista de preguntas
	).catch( function(error){next(error)});
};

// GET /quizes/search
exports.search = function(req, res) {
	res.render('quizes/search', { errors: [] });
};

// GET /author
exports.author = function(req, res) {
	var d = new Date();
	res.render('credits/author', {autor: 'SLV-es', anyo: d.getFullYear(), errors: [] });
};