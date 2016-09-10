loadDadosVaga();
function loadDadosVaga(){
	
	var id_vaga = getIdVaga();
	
	var id = getIdSalao();

	var dados = {"id_salao": id, "id_vaga": id_vaga};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_vaga/getVagaEditar.php",
		data: dados,
		success: function(data){
				
				if(data.status == "false"){
					if(data.msg == "NOT_DATA"){
						alertMsg("O servidor não recebeu dados. Tente novamente");
					}
					if(data.msg == "ERROR"){
						alertMsg("Aconteceu um erro! Tente novamente!");
					}
				}else{
					setForm(data);
				}
			},
			error: function(data){
				if(data.status == "false"){
					if(data.msg == "NOT_DATA"){
						alertMsg("O servidor não recebeu dados. Tente novamente");
					}
					if(data.msg == "ERROR"){
						alertMsg("Aconteceu um erro! Tente novamente!");
					}
				}
			}
		});
}

function setForm(data){

	setCargo(data[0].cargo_vaga);
	setQtdeVagas(data[0].qtde_vaga);
	setSexo(data[0].sexo_vaga);
	setHoras(data[0].seg_de, "Segunda", "De");
	setHoras(data[0].seg_as, "Segunda", "As");
	setHoras(data[0].ter_de, "Terça", "De");
	setHoras(data[0].ter_as, "Terça", "As");
	setHoras(data[0].qua_de, "Quarta", "De");
	setHoras(data[0].qua_as, "Quarta", "As");
	setHoras(data[0].qui_de, "Quinta", "De");
	setHoras(data[0].qui_as, "Quinta", "As");
	setHoras(data[0].sex_de, "Sexta", "De");
	setHoras(data[0].sex_as, "Sexta", "As");
	setHoras(data[0].sab_de, "Sábado", "De");
	setHoras(data[0].sab_as, "Sábado", "As");
	setHoras(data[0].dom_de, "Domingo", "De");
	setHoras(data[0].dom_as, "Domingo", "As");
	setInfo(data[0].info_vaga);

	loadScreen(false);
}


function setCargo(cargo){
	var cargos = getCargos();

	var qtde_cargos = cargos.length;

	var optCargos = "";

	optCargos += '<option value="">Cargo</option>';

	for(i = 0; i < qtde_cargos; i++){

		if(cargos[i] == cargo){
			optCargos += '<option selected value="'+ cargos[i] +'">'+ cargos[i] +'</option>';
		}else{
			optCargos += '<option value="'+ cargos[i] +'">'+ cargos[i] +'</option>';
		}
	}
	$('#cargo_vaga').html(optCargos);
}

function setQtdeVagas(qtde){
	var optVagas = "";
	optVagas += '<option value="">Quantidade de Vagas</option>';

	for(i = 1; i <= 30; i++){

		if(qtde == i){
			optVagas += '<option selected value="'+ i +'">'+ i +'</option>';
		}else{
			optVagas += '<option value="'+ i +'">'+ i +'</option>';
		}
	}
	$('#qtde_vaga').html(optVagas);
}

function setSexo(sexo){
	var sexos = ["Masculino", "Feminino", "Masculino e Feminino"];

	var qtde = sexos.length;

	var optSexos = "";

	optSexos += '<option value="">Selecione</option>';

	for(i=0;i<qtde;i++){
		if(sexos[i] == sexo){
			optSexos += '<option selected value="'+ sexos[i] +'">'+ sexos[i] + '</option>';
		}else{
			optSexos += '<option value="'+ sexos[i] +'">'+ sexos[i] + '</option>';
		}
	}

	$("#sexo_vaga").html(optSexos);
}

function setHoras(hora, dia, op){

	var horas = getHoras();

	var optHorasDe = '<option value="">De</option>';
	var optHorasAs = '<option value="">Às</option>';

	var qtde_horas = horas.length;

	for(i = 0; i < qtde_horas ; i++){
		if(dia == "Segunda" && op == "De"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}

			$('#seg_de').html(optHorasDe);
		}
		if(dia == "Segunda" && op == "As"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}
			$('#seg_as').html(optHorasDe);
		}

		if(dia == "Terça" && op == "De"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}

			$('#ter_de').html(optHorasDe);
		}
		if(dia == "Terça" && op == "As"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}
			$('#ter_as').html(optHorasDe);
		}

		if(dia == "Quarta" && op == "De"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}

			$('#qua_de').html(optHorasDe);
		}
		if(dia == "Quarta" && op == "As"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}
			$('#qua_as').html(optHorasDe);
		}

		if(dia == "Quinta" && op == "De"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}

			$('#qui_de').html(optHorasDe);
		}
		if(dia == "Quinta" && op == "As"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}
			$('#qui_as').html(optHorasDe);
		}

		if(dia == "Sexta" && op == "De"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}

			$('#sex_de').html(optHorasDe);
		}
		if(dia == "Sexta" && op == "As"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}
			$('#sex_as').html(optHorasDe);
		}

		if(dia == "Sábado" && op == "De"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}

			$('#sab_de').html(optHorasDe);
		}
		if(dia == "Sábado" && op == "As"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}
			$('#sab_as').html(optHorasDe);
		}

		if(dia == "Domingo" && op == "De"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}

			$('#dom_de').html(optHorasDe);
		}
		if(dia == "Domingo" && op == "As"){
			if(hora == horas[i]){
				optHorasDe += '<option selected value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}else{
				optHorasDe += '<option value="'+ horas[i] +'">'+ horas[i] +'</option>';
			}
			$('#dom_as').html(optHorasDe);
		}
	}
}

function setInfo(info){
	$("#info_vaga").val(info);
}

jQuery(document).ready(function(){
		jQuery('#editar_vaga').submit(function(){

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
				$("#id_salao_vaga").val(getIdSalao());
				$("#id_vaga").val(getIdVaga());
				var dados = jQuery(this).serialize();

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_vaga/editarVaga.php",
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
							alertMsg("Informações sobre a vaga atualizadas!");

							$('#editar_vaga').each(function(){
			  					this.reset();
								});

							navigatorViews('gerenciarVaga');
	
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



jQuery(document).ready(function(){
		jQuery('#excluir-vaga').submit(function(){

				loadScreen(true);

				var dados = {"id_vaga": getIdVaga(), "id_salao": getIdSalao() };

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_vaga/excluirVaga.php",
					data: dados,
					success: function(data)
					{ 
						loadScreen(false);
						
						if(data.msg == "TROUBLE"){
							alertMsg("Houve um problema.");
							return false;
						}
						if(data.msg == "SUCCESS"){
						
							alertMsg("Vaga excluída!");
							navigatorViews('gerenciarVaga');
						}
						if(data.msg == "NOT_DATA"){
							alertMsg("Houve um problema.");
							return false;
						}
					}
				});
				return false;
				
		});

	});