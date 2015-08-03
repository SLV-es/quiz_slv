 // Definición del modelo de Quiz con validación

 module.exports = function( sequelize, DataTypes ) {
	return sequelize.define( 'Quiz',
	{	pregunta:  {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "-> Falta la pregunta"} ,
				esPregunta: function(value){
					if(value==='Pregunta'){
						throw new Error("-> Escriba un texto en pregunta")
					}
				}
			}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "-> Falta la respuesta"} ,
				esRespuesta: function(value){
					if(value==='Respuesta'){
						throw new Error("-> Escriba un texto en respuesta")
					}
				}
			}
		},
		tema: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {msg: "-> Falta el tema"}
			}
		}
	}
	);
 }