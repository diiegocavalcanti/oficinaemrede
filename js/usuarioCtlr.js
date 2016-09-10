function getNome(tipo){

	if(tipo == "candidato"){
		var usuario = getUsuario();
		$('.nome_user_cand').html(usuario.nome_user_cand);
	}
	if(tipo == "empresa"){
		var usuario = getUsuario();
		$('.nome_salao').html(usuario.nome_salao);
		console.log(usuario);
	}
	
}
function getId(tipo){
	if(tipo == "candidato"){
		var usuario = getUsuario();
		$('.nome_user_cand').html(usuario.nome_user_cand);
	}
	if(tipo == "empresa"){
		var usuario = getUsuario();
		$('.nome_salao').html(usuario.nome_salao);
	}
}