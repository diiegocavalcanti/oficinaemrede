clearMenu();
function alertMsg(mensagem){
	$(".pelicula").fadeIn(250);
	$(".popup h6").text(mensagem);
	altMsg();
	return false;
}
altMsg();
function alertMsgLogin(mensagem){
	$(".pelicula-login").fadeIn(250);
	$(".popup-login h6").text(mensagem);
	altMsgLogin();
	return false;
}
altMsgLogin();

function loadScreen(option){
	if(option){
		$(".load").fadeIn(250);
	}else{
		$(".load").fadeOut(250);
	}
}

function borderRed(seletor){
	$('input, select').css('border-color', '#ccc');
	$(seletor).css('border-color', 'red');
}

function clearBorder(seletor){
	$(seletor).css('border-color', 'rgb(204, 204, 204)');
}

$(".bt-ok-pelicula").on('tap', function(event) {
	event.preventDefault();
	$(".pelicula").fadeOut(250);
	return true;
});

function getCargos(){
	var cargos = ["Alinhador","Analista de Suprimentos","Analista de Recursos Humanos","Analista de TI","Aplicador de Película","Assistente Administrativo","Assistente Comercial","Assistente de Logística","Assistente de TI","Assistente Financeiro","Auxiliar de DP","Auxiliar de Escritório","Auxiliar de Logística","Auxiliar de Mecânica","Auxiliar de Serviços Gerais (Faxineiro)","Consultor Técnico","Encarregado (Líder) de Oficina Mecânica","Estoquista","Encarregado (Líder) de Expedição","Gerente de Loja","Gerente de Oficina","Gerente de Peças","Gerente Financeiro","Mecânico ","Montador","Motoqueiro","Operador de Caixa","Promotor Técnico","Recepcionista","Supervisor Administrativo","Supervisor de Estoque","Supervisor de Suprimentos","Supervisor de Vendas","Técnico em Injeção Eletrônica","Técnico em Arcondicionado","Vendedor Balcão","Vendedor externo"];
	return cargos;
}

function altMsg(){
	var alt = $(".popup").height();
	var t = $(window).height();
	$(".popup").css('margin-top', ((t/2) - (alt/2))+'px');
}
function altMsgLogin(){
	var alt = $(".popup-login").height();
	var t = $(window).height();
	$(".popup-login").css('margin-top', ((t/2) - (alt/2))+'px');
}

defineMenu();
function defineMenu(){

	$(".menu").css('display', 'block');
	$(".menu_touch").css('display', 'block');

	if(localStorage.length != 0){
		var user = getUsuario();
		
		if(user != null){
			if(user.tipo == "empresa"){
			var menu = '<ul><li class="n_zebrado"><a class="app_link" href="homeEmpresa">INÍCIO</a></li><li class="zebrado"><a class="app_link" href="abrirVaga">ABRIR VAGAS</a></li><li class="n_zebrado"><a class="app_link" href="gerenciarVaga">GERENCIAR VAGAS</a></li><li class="zebrado"><a class="app_link" href="buscarCandidatos">BUSCAR CANDIDATOS</a></li><li class="n_zebrado"><a class="app_link" href="contaEmpresa">CONTA</a></li><li class="zebrado"><a class="app_link" href="sobreApp">SOBRE O APP</a></li><li class="n_zebrado"><a class="app_link" href="logOut">SAIR</a></li></ul>';
			}else if(user.tipo = "candidato"){
				var menu = '<ul><li class="n_zebrado"><a class="app_link" href="homeCandidato">INÍCIO</a></li><li class="zebrado"><a class="app_link" href="buscarVagas">BUSCAR VAGAS</a></li><li class="n_zebrado"><a class="app_link" href="vagasEscolhidas">VAGAS ESCOLHIDAS</a></li><li class="zebrado"><a class="app_link" href="contaCandidato">CONTA</a></li><li class="n_zebrado"><a class="app_link" href="sobreApp">SOBRE O APP</a></li><li class="zebrado"><a class="app_link" href="logOut">SAIR</a></li></ul>';
			}
		}

		$(".menu").html(menu);

		$('.app_link').on('tap', function(event){
			loadScreen(true);
			event.preventDefault();
			var view = $(event.target).attr('href');
			navigatorViews(view);
			$('.menu').css('margin-left', '100%');
			loadScreen(false);
		});
	}
}

function clearMenu(){
	if(localStorage.length == 0 || getUsuario() == null){
		$(".menu").css('display', 'none');
		$(".menu_touch").css('display', 'none');
		$(".menu").html("");
	}
}

function getDDDs(){
	var ddds = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "22", "21", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"];

	return ddds
}

function getServer(){
	var server = "http://oficinaemrede.com.br";
	return server;
}

function getHoras(){
	var horas = ["Folga","7h", "7h30", "8h", "8h30", "9h", "9h30", "10h", "10h30", "11h", "11h30", "12h", "12h30", "13h", "13h30", "14h", "14h30", "15h", "15h30", "16h", "16h30", "17h", "17h30", "18h", "18h30", "19h", "19h30", "20h", "20h30", "21h", "21h30", "22h", "22h30", "23h", "23h30", "0h"];

	return horas;
}




