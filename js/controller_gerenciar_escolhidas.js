loadCardsVagasEscolhidas();
function loadCardsVagasEscolhidas(){
	var id = getIdUser();

	var dados = {"id_candidato": id};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/listVagasEscolhidas.php",
		data: dados,
		success: function(data){



				montarCardsVagasEscolhidas(data);
			}
		});

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/listVagasArquivadas.php",
		data: dados,
		success: function(data){ 
				montarCardsVagasArquivadas(data);
			}
		});
}

function montarCardsVagasEscolhidas(data){

	if(data.status == "false"){
		var resposta = '<p class="resposta-servidor">VOCÊ AINDA NÃO ESCOLHEU NENHUMA VAGA</p>';
		$('.cards-vagas-escolhidas').html(resposta);
	}else{

	var qtde = data.length;


	var htmlVagas = '';

	for(i = 0; i < qtde; i++){

		htmlVagas += '<div class="card-resultado"><div class="card-resultado-content"><h2>'+ data[i].nome_salao +'</h2><h3>'+data[i].rua_salao+', '+data[i].numero_salao+' '+ data[i].complemento_salao+'</h3><h3>'+data[i].bairro_salao+' - '+data[i].cidade_salao+' - '+data[i].estado_salao+'</h3><h3>CEP: '+data[i].cep_salao+'</h3><h3>Fone: <span>('+data[i].cod_fone_salao+') '+data[i].fone_salao+'</span></h3><h3>Site: <span>'+data[i].site_salao+'</span></h3><h3>Facebook: <span>'+data[i].facebook_salao+'</span></h3><div class="delimiter-card"></div><h4>CARGO: <span>'+data[i].cargo_vaga+'</span></h4><h5>'+data[i].qtde_vaga+' Vagas | '+data[i].sexo_vaga+'</h5><div class="delimiter-card"></div><h5>Horário de Trabalho</h5><div class="row"><div class="col-xs-6"><h3>SEG: de '+data[i].seg_de+' às '+data[i].seg_as+'</h3><h3>TER: de '+data[i].ter_de+' às '+data[i].ter_as+'</h3><h3>QUA: de '+data[i].qua_de+' às '+data[i].qua_as+'</h3><h3>QUI: de '+data[i].qui_de+' às '+data[i].qui_as+'</h3></div><div class="col-xs-6"><h3>SEX: de '+data[i].sex_de+' às '+data[i].sex_as+'</h3><h3>SAB: de '+data[i].sab_de+' às '+data[i].sab_as+'</h3><h3>DOM: de '+data[i].dom_de+' às '+data[i].dom_as+'</h3></div></div><h5>Informações Adicionais</h5><h3>'+data[i].info_vaga+'</h3></div><button class="btn-card btn-desistir-vaga" data-id="'+ data[i].id_vaga +'" data-candidato-vaga="'+ data[i].id_candidato_vaga +'"><img src="images/ico-arquivar-30.svg" alt="">DESISTIR DA VAGA</button></div>';

	}

	$('.cards-vagas-escolhidas').html(htmlVagas);

	$('.btn-desistir-vaga').on('tap', function(event){
		loadScreen(true);
		var id_candidato_vaga = $(event.target).attr('data-candidato-vaga');
		desistirVaga(id_candidato_vaga);
		
	});

	}
	loadScreen(false);
}


function montarCardsVagasArquivadas(data){

	if(data.status == "false"){
		var resposta = '<p class="resposta-servidor-cinza">NÃO HÁ VAGAS ENCERRADAS</p>';
		$('.cards-vagas-arquivadas').html(resposta);
	}else{

	var qtde = data.length;


	var htmlVagas = '';

	for(i = 0; i < qtde; i++){

		htmlVagas += '<div class="card-resultado"><div class="card-resultado-content"><h2>'+ data[i].nome_salao +'</h2><h3>'+data[i].rua_salao+', '+data[i].numero_salao+' '+ data[i].complemento_salao+'</h3><h3>'+data[i].bairro_salao+' - '+data[i].cidade_salao+' - '+data[i].estado_salao+'</h3><h3>CEP: '+data[i].cep_salao+'</h3><h3>Fone: <span>('+data[i].cod_fone_salao+') '+data[i].fone_salao+'</span></h3><h3>Site: <span>'+data[i].site_salao+'</span></h3><h3>Facebook: <span>'+data[i].facebook_salao+'</span></h3><div class="delimiter-card"></div><h4>CARGO: <span>'+data[i].cargo_vaga+'</span></h4><h5>'+data[i].qtde_vaga+' Vagas | '+data[i].sexo_vaga+'</h5><div class="delimiter-card"></div><h5>Horário de Trabalho</h5><div class="row"><div class="col-xs-6"><h3>SEG: de '+data[i].seg_de+' às '+data[i].seg_as+'</h3><h3>TER: de '+data[i].ter_de+' às '+data[i].ter_as+'</h3><h3>QUA: de '+data[i].qua_de+' às '+data[i].qua_as+'</h3><h3>QUI: de '+data[i].qui_de+' às '+data[i].qui_as+'</h3></div><div class="col-xs-6"><h3>SEX: de '+data[i].sex_de+' às '+data[i].sex_as+'</h3><h3>SAB: de '+data[i].sab_de+' às '+data[i].sab_as+'</h3><h3>DOM: de '+data[i].dom_de+' às '+data[i].dom_as+'</h3></div></div><h5>Informações Adicionais</h5><h3>'+data[i].info_vaga+'</h3></div></div>';
	}

	$('.cards-vagas-arquivadas').html(htmlVagas);

	}
	loadScreen(false);
}


function desistirVaga(id_candidato_vaga){
	
	var dados = {"id_candidato_vaga": id_candidato_vaga};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/deletarVaga.php",
		data: dados,
		success: function(data){
			loadScreen(false);
			if(data.msg == "SUCCESS"){
				alertMsg("Você desistiu dessa vaga!");
				loadCardsVagasEscolhidas();
			}else if(data.msg == "ERROR"){
				alertMsg("Aconteceu um erro");
			}
			}
		});
}





		