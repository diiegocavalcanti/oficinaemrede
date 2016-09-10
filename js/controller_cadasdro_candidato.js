jQuery(document).ready(function(){
		jQuery('#cadastro-candidato').submit(function(){

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
			if($("#email_user_cand").val() == ""){
				borderRed("#email_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
			}
			if($("#senha_user_cand").val() == ""){
				borderRed("#senha_user_cand");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#senha_confirm_user_cand").val() == ""){
				borderRed("#senha_confirm_user_cand");
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

			// if(qtde_checked>5){
			// 	alertMsg("Selecione no máximo 5 habilidades!");
			// 	ok = false;
			// 	return false;
			// }
			
			if(qtde_checked == 0){
				alertMsg("Você não selecionou habilidades!");
				ok = false;
				return false;
			}

			

			if($("#termos_candidato").is(":checked") == false){
				alertMsg("Precisamos que você aceite nossos termos e condições para efetuar o cadastro.");
				ok = false;
				return false;
			}


			if(ok){

				loadScreen(true);
				var dados = jQuery(this).serialize();

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_candidato/addCandidato.php",
					data: dados,
					success: function(data)
					{ 
						console.log(data);
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

							$('#cadastro-candidato').each(function(){
			  					this.reset();
								});

							navigatorViews("confirmCadastro");
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




function anoCand(){
	var d = new Date();
	d = d.getFullYear();

	var ano = d - 18;
	var opt = "";
	opt += '<option value="">Ano</option>';
	var output;

	for(i = 0; i < 55; i++){

		output = ano - i;
		opt += '<option value="'+ output +'">'+ output +'</option>';
	}
	$('#ano_user_cand').html(opt);

}
function diaCand(){
	var optDia = "";
	optDia += '<option value="">Dia</option>';

	for(i = 1; i <= 31; i++){

		optDia += '<option value="'+ i +'">'+ i +'</option>';
	}
	$('#dia_user_cand').html(optDia);
}
diaCand();
anoCand();

$("#cep_user_cand").mask("99999-999");

        $(document).ready(function() {

        	

            function limpa_formulário_cep() {
                // Limpa valores do formulário de cep.
                $("#rua_user_cand").val("");
                $("#bairro_user_cand").val("");
                $("#cidade_user_cand").val("");
                $("#estado_user_cand").val("");

            }
            
            //Quando o campo cep perde o foco.
            $("#cep_user_cand").blur(function() {

                //Nova variável "cep" somente com dígitos.
                var cep = $(this).val().replace(/\D/g, '');

                //Verifica se campo cep possui valor informado.
                if (cep != "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
                        $("#rua_user_cand").val("...")
                        $("#bairro_user_cand").val("...")
                        $("#cidade_user_cand").val("...")
                        $("#estado_user_cand").val("...")

                        //Consulta o webservice viacep.com.br/
                        $.getJSON("http://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                $("#rua_user_cand").val(dados.logradouro);
                                $("#bairro_user_cand").val(dados.bairro);
                                $("#cidade_user_cand").val(dados.localidade);
                                $("#estado_user_cand").val(dados.uf);
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
habilidades();
function habilidades(){

	var hab = getCargos();

	var check = "";

	for(i=0; i<hab.length; i++){

		check += '<div class="checkbox"><label><input type="checkbox" id="habilidade-'+ i +'" name="habilidade-'+ i +'" value="'+ hab[i] +'"> '+ hab[i] +'</label></div>';
	}
	$('.habilidades-form').html(check);
}

validaSenha();
function validaSenha(){
	ok = false
	$("#senha_user_cand").blur(function(event) {
		if($("#senha_user_cand").val().length < 6){
			borderRed("#senha_user_cand");
			alertMsg("A senha deve conter no mínimo 6 caracteres!");
			ok = false;
		}else{
			ok = true;
			clearBorder("#senha_user_cand");
		}
	});
	$("#senha_confirm_user_cand").blur(function(event) {
		if(ok == true){
			if($("#senha_user_cand").val() != $("#senha_confirm_user_cand").val()){
				borderRed("#senha_confirm_user_cand");
				alertMsg("As senhas não correspondem!");
				ok = false;
			}else{
				clearBorder("#senha_confirm_user_cand");
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

	$('#cod_fone_user_cand').html(html);
	$('#cod_wa_user_cand').html(html);
}