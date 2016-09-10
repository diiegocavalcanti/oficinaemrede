var isOpen = false;
$('.menu_touch').on('tap', function(event){
	
	if(isOpen == false){
		isOpen = true;
		$('.menu').css('margin-left', '20%');
	}else{
		isOpen = false;
		$('.menu').css('margin-left', '100%');
	}
});

$('.fixheight').on('swiperight', function(event){
	if(isOpen == true){
		$('.menu').css('margin-left', '100%');
		isOpen = false;
	}else{
		isOpen = false;
	}
});

$('.fixheight').on('swipeleft', function(event){

	if(isOpen == false){
		$('.menu').css('margin-left', '20%');
		isOpen = true;
		
	}else{
		isOpen = false;
	}
});

$('.app_view').on('tap', function(event){
	
	if(isOpen){
		$('.menu').css('margin-left', '100%');
		isOpen = false;
	}
	
});

$('.back-button').on('tap', function(event){
	console.log("tap!");
	backButton();
});



var t = $(window).height();

function checkConnection(){
	if(navigator.onLine){
		return true;
	}else{
		return false;
	}
}

function noConnection(){
	alertMsgLogin("Você não está conectado a internet!");
}

function navigatorViews(view){
	if(checkConnection()){
		if(view == "logOut"){
			logOut();
			historicoAdd('login');
			clearHistorico();
		}else{
			
			$('.app_view').load("views/"+view+".html");
			historicoAdd(view);
		}
	}else{
		loadLogin(true);
		noConnection();

	}
}



function historicoAdd(view){
	
	if(localStorage.getItem('historico') != null){
		console.log("entrou no se");
		var historico_get = localStorage.getItem('historico');
		historico_get = JSON.parse(historico_get);

		historico_get.push(view);

		localStorage.setItem('historico', JSON.stringify(historico_get));
		console.log(localStorage.getItem('historico'));
	}else{
		console.log("entrou no else");
		var historico = [];
		historico.push(view);
		localStorage.setItem('historico', JSON.stringify(historico));
		console.log(localStorage.getItem('historico'));
	}

}

function clearHistorico(){
	localStorage.removeItem('historico');
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    backButton();
}

function backButton(){
	var historico_local = localStorage.getItem('historico');

	if(historico_local != null){
		historico_local = JSON.parse(historico_local);

		if(historico_local.length == 1){

			var view = historico_local[0];

			if(view == "preCadastro"){
				clearHistorico();
				loadLogin(true);
			}else{
				$('.app_view').load("views/"+view+".html");
				localStorage.setItem('historico', JSON.stringify(historico_local));
			}
		}else if(historico_local.length > 1){

			historico_local.pop();
			var view = historico_local[historico_local.length -1];

			$('.app_view').load("views/"+view+".html");
			localStorage.setItem('historico', JSON.stringify(historico_local));
			

		}
	}
}


function loadLogin(boo){
	if(boo){
		$('.login-view').css('display', 'block');
		$('.fixheight').css('display', 'none');
	}else{
		$('.login-view').css('display', 'none');
		$('.fixheight').css('display', 'block');
	}
}

$('.login-view').load("views/login.html");




$(":file").filestyle({badge: false});


if(localStorage.getItem('usuario') != null){

	var user = getUsuario();

	if(user.tipo == "candidato"){
		navigatorViews('homeCandidato');
	}
	if(user.tipo == "empresa"){
		navigatorViews('homeEmpresa');
	}

	loadLogin(false);
}else{
	loadLogin(true);
}







