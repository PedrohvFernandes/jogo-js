// Usando o Jquery
function start() { // Inicio da função start()

    // hide -> ocultar, a gente oculta 
	$("#inicio").hide();
	// acrescentar -> append
	$("#fundoGame").append("<div id='jogador'></div>");
	$("#fundoGame").append("<div id='inimigo1'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo'></div>");

} // Fim da função start