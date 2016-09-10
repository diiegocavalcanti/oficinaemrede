
$('.faca-cadastro').on('tap', function(event){
	loadLogin(false);
	clearMenu();
	navigatorViews("preCadastro");
});

jQuery(document).ready(function(){
		jQuery('#form-login').submit(function(){

			var ok = true;

			if($("#email").val() == ""){
				borderRed("#email");
				alertMsgLogin("Preencha todos os campos.");
				ok = false;
				return false;
			}
			if($("#senha").val() == ""){
				borderRed("#senha");
				alertMsgLogin("Preencha todos os campos.");
				ok = false;
				return false;
			}

			if(ok && checkConnection()){
				loadLogin(false);
				loadScreen(true);

				var dados = jQuery(this).serialize();

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_login/login.php",
					data: dados,
					success: function(data){

						if(data.status == "false"){
							if(data.msg == "NOT_USER"){
								loadScreen(false);
								loadLogin(true);
								alertMsgLogin("Nenhum usuário encontrado");
							}
							if(data.msg == "INVALID_PASS"){
								loadScreen(false);
								loadLogin(true);
								alertMsgLogin("Senha incorreta!");
							}
							if(data.msg == "NOT_ACTIVED"){
								loadScreen(false);
								loadLogin(true);
								alertMsgLogin("Seu e-mail ainda não foi validado! Acesse seu e-mail de cadastro e faça a validação!");
							}
						}else{

							if(data[0].tipo == "empresa"){
								
								navigatorViews('homeEmpresa');
								criarSessao(data[0]);
								loadScreen(false);
							}
							if(data[0].tipo == "candidato"){
								
								navigatorViews('homeCandidato');
								criarSessao(data[0]);
								loadScreen(false);
							}
							defineMenu();
						}						
					},
					  error: function(data){
					  	if(data.msg == "NOT_USER"){
							loadScreen(false);
							loadLogin(true);
							alertMsgLogin("Nenhum usuário encontrado");
						}
					  }
				});
				return false;
				}else{
					noConnection();
					return false;
				}
		});

	});

$(".bt-ok-pelicula-login").on('tap', function(event) {
	event.preventDefault();
	$(".pelicula-login").fadeOut(500);
	return true;
});