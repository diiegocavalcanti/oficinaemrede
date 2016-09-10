jQuery(document).ready(function(){
		jQuery('#form_cad_empresa').submit(function(){

			var ok = true;

			if($("#nome_user_salao").val() == ""){
				borderRed("#nome_user_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#cod_fone_user_emp").val() == ""){
				borderRed("#cod_fone_user_emp");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#fone_user_emp").val() == ""){
				borderRed("#fone_user_emp");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#email_user_emp").val() == ""){
				borderRed("#email_user_emp");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#senha_user_emp").val() == ""){
				borderRed("#senha_user_emp");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#senha_confirm_user_emp").val() == ""){
				borderRed("#senha_confirm_user_emp");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#nome_salao").val() == ""){
				borderRed("#nome_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#cod_fone_salao").val() == ""){
				borderRed("#cod_fone_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#fone_salao").val() == ""){
				borderRed("#fone_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#cep_salao").val() == ""){
				borderRed("#cep_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#rua_salao").val() == ""){
				borderRed("#rua_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#numero_salao").val() == ""){
				borderRed("#numero_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#bairro_salao").val() == ""){
				borderRed("#bairro_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#cidade_salao").val() == ""){
				borderRed("#cidade_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#estado_salao").val() == ""){
				borderRed("#estado_salao");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}

			if($("#termos_empresario").is(":checked") == false){
				alertMsg("Precisamos que você aceite nossos termos e condições para efetuar o cadastro.");
				ok = false;
				return false;
			}


			if(ok){

				loadScreen(true);
				var dados = jQuery(this).serialize();

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_salao/addSalao.php",
					data: dados,
					success: function(data)
					{ 
						loadScreen(false);
						
						if(data.msg == "NOT_VALID_MAIL"){
							alertMsg("Este e-mail já está em uso, tente outro.");
							return false;
						}
						if(data.msg == "ERROR"){
							alertMsg("Houve um problema.");
							return false;
						}
						if(data.msg == "SUCCESS"){
							alertMsg("Cadastro realizado!");

							$('#form_cad_empresa').each(function(){
			  					this.reset();
								});

							navigatorViews("confirmCadastroEmpresario");
							
						}
						if(data.msg == "NOT_DATA"){
							alertMsg("Houve um problema.");
							return false;
						}

					}
				});
				return false;
				}
		});

	});

$("#cep_salao").mask("99999-999");

        $(document).ready(function() {

        	

            function limpa_formulário_cep() {
                // Limpa valores do formulário de cep.
                $("#rua_salao").val("");
                $("#bairro_salao").val("");
                $("#cidade_salao").val("");
                $("#estado_salao").val("");

            }
            
            //Quando o campo cep perde o foco.
            $("#cep_salao").blur(function() {

                //Nova variável "cep" somente com dígitos.
                var cep = $(this).val().replace(/\D/g, '');

                //Verifica se campo cep possui valor informado.
                if (cep != "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
                        $("#rua_salao").val("...")
                        $("#bairro_salao").val("...")
                        $("#cidade_salao").val("...")
                        $("#estado_salao").val("...")

                        //Consulta o webservice viacep.com.br/
                        $.getJSON("http://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                $("#rua_salao").val(dados.logradouro);
                                $("#bairro_salao").val(dados.bairro);
                                $("#cidade_salao").val(dados.localidade);
                                $("#estado_salao").val(dados.uf);
                            } //end if.
                            else {
                                //CEP pesquisado não foi encontrado.
                                limpa_formulário_cep();
                                alertMsg("CEP não encontrado.");
                            }
                        });
                    } //end if.
                    else {
                        //cep é inválido.
                        limpa_formulário_cep();
                        alertMsg("Formato de CEP inválido.");
                    }
                } //end if.
                else {
                    //cep sem valor, limpa formulário.
                    limpa_formulário_cep();
                }
            });
        });

validaSenhaEmpresario();
function validaSenhaEmpresario(){
	ok = false
	$("#senha_user_emp").blur(function(event) {
		if($("#senha_user_emp").val().length < 6){
			borderRed("#senha_user_emp");
			alertMsg("A senha deve conter no mínimo 6 caracteres!");
			ok = false;
		}else{
			ok = true;
			clearBorder("#senha_user_emp");
		}
	});
	$("#senha_confirm_user_emp").blur(function(event) {
		if(ok == true){
			if($("#senha_user_emp").val() != $("#senha_confirm_user_emp").val()){
				borderRed("#senha_confirm_user_emp");
				alertMsg("As senhas não correspondem!");
				ok = false;
			}else{
				clearBorder("#senha_confirm_user_emp");
			}
		}
	});
}
appendDDDs();
function appendDDDs(){
	var ddds = getDDDs();

	var html = "<option value=''>DDD</option>";

	for(i=0; i< ddds.length; i++){
		html += "<option value='"+ ddds[i] +"'>"+ ddds[i] +"</option>";
	}

	$('#cod_fone_user_emp').html(html);
	$('#cod_fone_salao').html(html);
}
  