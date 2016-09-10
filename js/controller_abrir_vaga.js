jQuery(document).ready(function(){
		jQuery('#abrir_vaga').submit(function(){

			var ok = true;

			if($("#cargo_vaga").val() == ""){
				borderRed("#cargo_vaga");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#qtde_vaga").val() == ""){
				borderRed("#qtde_vaga");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#sexo_vaga").val() == ""){
				borderRed("#sexo_vaga");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#seg_de").val() == ""){
				borderRed("#seg_de");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#seg_as").val() == ""){
				borderRed("#seg_as");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#ter_de").val() == ""){
				borderRed("#ter_de");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#ter_as").val() == ""){
				borderRed("#ter_as");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#qua_de").val() == ""){
				borderRed("#qua_de");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#qua_as").val() == ""){
				borderRed("#qua_as");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#qui_de").val() == ""){
				borderRed("#qui_de");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#qui_as").val() == ""){
				borderRed("#qui_as");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#sex_de").val() == ""){
				borderRed("#sex_de");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#sex_as").val() == ""){
				borderRed("#sex_as");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#sab_de").val() == ""){
				borderRed("#sab_de");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#sab_as").val() == ""){
				borderRed("#sab_as");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#dom_de").val() == ""){
				borderRed("#dom_de");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			if($("#dom_as").val() == ""){
				borderRed("#dom_as");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
			}
			if($("#info_vaga").val() == ""){
				borderRed("#info_vaga");
				alertMsg("Preencha todos os campos com (*).");
				ok = false;
				return false;
			}
			


			if(ok){

				loadScreen(true);
				var dados = jQuery(this).serialize();

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_vaga/addVaga.php",
					data: dados,
					success: function(data)
					{ 
						loadScreen(false);
						
						if(data == "TROUBLE"){
							alertMsg("Houve um problema.");
							return false;
						}
						if(data == "SUCCESS"){
							loadScreen(false);
							alertMsg("Vaga aberta com sucesso!");

							$('#abrir_vaga').each(function(){
			  					this.reset();
								});

							navigatorViews('homeEmpresa');
	
						}
						if(data == "NOT_DATA"){
							alertMsg("Houve um problema.");
							return false;
						}
					}
				});
				return false;
				}
		});

	});


function vagasQtde(){
	var optVagas = "";
	optVagas += '<option value="">Quantidade de Vagas</option>';

	for(i = 1; i <= 30; i++){

		optVagas += '<option value="'+ i +'">'+ i +'</option>';
	}
	$('#qtde_vaga').html(optVagas);
}

function cargos(){
	var cargos = getCargos();

	var qtde_cargos = cargos.length;

	var optCargos = "";

	optCargos += '<option value="">Cargo</option>';

	for(i = 0; i < qtde_cargos; i++){

		optCargos += '<option value="'+ cargos[i] +'">'+ cargos[i] +'</option>';
	}
	$('#cargo_vaga').html(optCargos);
}

function horarios(){

	var horas = getHoras();

	var optHorasDe = '<option value="">De</option>';
	var optHorasAs = '<option value="">As</option>';

	var qtde_horas = horas.length;

	for(i = 0; i < qtde_horas ; i++){
		optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>'; 
		optHorasAs += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
	}

	$('.optDe').html(optHorasDe);
	$('.optAs').html(optHorasAs);
}
function idSalaoVaga(){
	var id = getIdSalao();
	$('#id_salao_vaga').val(id);
}

function Sexo(){
	var sexos = ["Masculino", "Feminino", "Masculino e Feminino"];

	var qtde = sexos.length;

	var optSexos = "";

	optSexos += '<option value="">Selecione</option>';

	for(i=0;i<qtde;i++){
		optSexos += '<option value="'+ sexos[i] +'">'+ sexos[i] + '</option>';
	}

	$("#sexo_vaga").html(optSexos);
}
Sexo();
cargos();
vagasQtde();
horarios();
idSalaoVaga();