jQuery(document).ready(function(){
		jQuery('#conta-candidato').submit(function(){

			var ok = true;

			if($("#nome_user_cand").val() == ""){
				borderRed("#nome_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#sexo_user_cand").val() == ""){
				borderRed("#sexo_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#dia_user_cand").val() == ""){
				borderRed("#dia_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#mes_user_cand").val() == ""){
				borderRed("#mes_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#ano_user_cand").val() == ""){
				borderRed("#ano_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#cep_user_cand").val() == ""){
				borderRed("#cep_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#rua_user_cand").val() == ""){
				borderRed("#rua_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#numero_user_cand").val() == ""){
				borderRed("#numero_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#bairro_user_cand").val() == ""){
				borderRed("#bairro_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#cidade_user_cand").val() == ""){
				borderRed("#cidade_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#estado_user_cand").val() == ""){
				borderRed("#estado_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#cod_fone_user_cand").val() == ""){
				borderRed("#cod_fone_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#fone_user_cand").val() == ""){
				borderRed("#fone_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			
			var qtde_cargos = getCargos().length;
			var qtde_checked = 0;

			for(i=0;i<qtde_cargos;i++){
				if($("#habilidade-"+i).is(":checked")){
					qtde_checked++;
				}
			}

			if(qtde_checked == 0){
				alertMsg("Você não selecionou habilidades!");
				ok = false;
				return false;
			}

		

			if(ok){

				loadScreen(true);
				var id = getIdUser();

				$("#id_usuario").val(id);

				var dados = jQuery(this).serialize();

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_candidato/editarCandidato.php",
					data: dados,
					success: function(data)
					{ 
						loadScreen(false);
						if(data.msg == "NOT_VALID_MAIL"){
							alertMsg("Este e-mail já está em uso, tente outro.");
							return false;
						}
						if(data.msg == "TROUBLE"){
							alertMsg("Houve um problema.");
							return false;
						}
						if(data.msg == "SUCCESS"){
							alertMsg("Dados atualizados!");

							$('#conta-candidato').each(function(){
			  					this.reset();
								});

							atualizarSession();
							navigatorViews("homeCandidato");
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
                                alert("CEP não encontrado.");
                            }
                        });
                    } //end if.
                    else {
                        //cep é inválido.
                        limpa_formulário_cep();
                        alert("Formato de CEP inválido.");
                    }
                } //end if.
                else {
                    //cep sem valor, limpa formulário.
                    limpa_formulário_cep();
                }
            });
        });

function atualizarSession(){

	var id = getIdUser();

	var dados = {"id_candidato": id};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato/getCandidato.php",
		data: dados,
		success: function(data){
				
				criarSessao(data[0]);
				getNome("candidato");
			}
		});
}