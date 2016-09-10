function criarSessao(user){
	user = JSON.stringify(user);
	localStorage.setItem('usuario', user);
}

function getUsuario(){
	user = localStorage.getItem("usuario");
	user = JSON.parse(user);
	return user;
}


function logOut(){
	localStorage.removeItem('usuario');
	localStorage.clear();
	loadLogin(true);
	clearMenu();
}

function getIdSalao(){
	var user = getUsuario();

	if(user.tipo == "empresa"){
		return user.id_salao;
	}else{
		return false;
	}
	
}
function getIdUser(){
	var user = getUsuario();

	if(user.tipo == "candidato"){
		return user.id_user_cand;
	}else{
		return false;
	}
	
}

function registraIdVaga(id_vaga){
   localStorage.setItem('id_vaga', id_vaga);
}
function getIdVaga(id_vaga){
   return localStorage.getItem("id_vaga");
}

