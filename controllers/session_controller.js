// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// GET /login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new.ejs', {errors: errors});
};

// POST /login
exports.create = function(req, res) {
	var login    = req.body.login;
	var password = req.body.password;
	var downtime = 2*60*1000; // tiempo límite inactividad sesión: 2 minutos
	var timeout = (new Date()).getTime()+downtime;
	
	var userController = require('./user_controller');
	userController.autenticar(login,password,function(error,user){
		if (error){ // si hay un error retornamos mensajes de error de sesión
			req.sessions.errors = [{"message": 'Se ha producido un error: ' + error}];
			res.redirect("/login");
			return;
		}
		
		// si no hay error, crear req.session.user y guardar campos id y username
		// la sesión se define por la existencia de req.session.user
		// se define el límite de tiempo de sesión inactiva en 2 minutos
		req.session.user = {id: user.id, username: user.username, timeout: timeout, downtime: downtime };
		res.redirect(req.session.redir.toString());  // redirección al path anterior al login
	});
};

// DELETE /logout 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString());  // redirección al path anterior al login
};