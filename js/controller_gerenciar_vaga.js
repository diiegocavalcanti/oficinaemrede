loadCardsVagas();
function loadCardsVagas(){
	var id = getIdSalao();

	var dados = {"id_salao_vaga": id};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_vaga/listVagas.php",
		data: dados,
		success: function(data){

				montarCardsVagas(data);
			}
		});

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_vaga/listVagasFechadas.php",
		data: dados,
		success: function(data){ 
				montarCardsVagasFechadas(data);
			}
		});
}

function montarCardsVagas(data){

	if(data.status == "false"){
		var resposta = '<p class="resposta-servidor">NÃO HÁ VAGAS ABERTAS</p>';
		$('.cards-vagas').html(resposta);
	}else{

	var qtde = data.length;


	var htmlVagas = '';

	for(i = 0; i < qtde; i++){

		htmlVagas += '<div class="card"><div class="card-content"><h3>'+ data[i].cargo_vaga +'</h3><h4>'+ data[i].qtde_vaga +' vagas | '+ data[i].sexo_vaga +'</h4><div class="row horario"><div class="col-xs-12"><h4>Horário de Trabalho:</h4></div><div class="col-xs-6"><p>SEG: '+ data[i].seg_de +' às '+ data[i].seg_as +'</p><p>TER: '+ data[i].ter_de +' às '+ data[i].ter_as +'</p><p>QUA: '+ data[i].qua_de +' às '+ data[i].qua_as +'</p><p>QUI: '+ data[i].qui_de +' às '+ data[i].qui_as +'</p></div><div class="col-xs-6"><p>SEX: '+ data[i].sex_de +' às '+ data[i].sex_as +'</p><p>SAB: '+ data[i].sab_de +' às '+ data[i].sab_as +'</p><p>DOM: '+ data[i].dom_de +' às '+ data[i].dom_as +'</p></div></div><div class="row info"><div class="col-xs-12"><h4>Informações Adicionais:</h4></div><div class="col-xs-12"><p>'+ data[i].info_vaga +'</p></div></div></div><button class="btn-card btn-ver-candidato" data-id="'+ data[i].id_vaga +'"><img src="images/ico-ver-candidatos-22.svg" alt="">VER CANDIDATOS</button><button data-id="'+ data[i].id_vaga +'" class="btn-card btn-editar-vaga"><img src="images/ico-editar-vaga-23.svg" alt="">EDITAR VAGA</button><button data-id="'+ data[i].id_vaga +'" class="btn-card btn-fechar-vaga"><img src="images/ico-fechar-vaga-24.svg" alt="">FECHAR VAGA</button></div>';

	}

	$('.cards-vagas').html(htmlVagas);

	$('.btn-fechar-vaga').on('tap', function(event){
		loadScreen(true);
		var id_vaga = $(event.target).attr('data-id');
		fecharVaga(id_vaga);
	});

	$('.btn-ver-candidato').on('tap', function(event){
		loadScreen(true);
		var id_vaga = $(event.target).attr('data-id');
		registraIdVaga(id_vaga);
		navigatorViews("verCandidatos");
		loadScreen(false);
	});

	$('.btn-editar-vaga').on('tap', function(event){
		loadScreen(true);
		var id_vaga = $(event.target).attr('data-id');
		registraIdVaga(id_vaga);
		navigatorViews("editarVaga");
		
	});

	}
}


function montarCardsVagasFechadas(data){

	if(data.status == "false"){
		var resposta = '<p class="resposta-servidor-cinza">NÃO HÁ VAGAS FECHADAS</p>';
		$('.cards-vagas-fechadas').html(resposta);
	}else{

	var qtde = data.length;


	var htmlVagas = '';

	for(i = 0; i < qtde; i++){

		htmlVagas += '<div class="card"><div class="card-content"><h3>'+ data[i].cargo_vaga +'</h3><h4>'+ data[i].qtde_vaga +' vagas | '+ data[i].sexo_vaga +'</h4><div class="row horario"><div class="col-xs-12"><h4>Horário de Trabalho:</h4></div><div class="col-xs-6"><p>SEG: '+ data[i].seg_de +' às '+ data[i].seg_as +'</p><p>TER: '+ data[i].ter_de +' às '+ data[i].ter_as +'</p><p>QUA: '+ data[i].qua_de +' às '+ data[i].qua_as +'</p><p>QUI: '+ data[i].qui_de +' às '+ data[i].qui_as +'</p></div><div class="col-xs-6"><p>SEX: '+ data[i].sex_de +' às '+ data[i].sex_as +'</p><p>SAB: '+ data[i].sab_de +' às '+ data[i].sab_as +'</p><p>DOM: '+ data[i].dom_de +' às '+ data[i].dom_as +'</p></div></div><div class="row info"><div class="col-xs-12"><h4>Informações Adicionais:</h4></div><div class="col-xs-12"><p>'+ data[i].info_vaga +'</p></div></div></div><button data-id="'+ data[i].id_vaga +'" class="btn-card btn-ver-candidato"><img src="images/ico-ver-candidatos-22.svg" alt="">VER CANDIDATOS</button><button data-id="'+ data[i].id_vaga +'" class="btn-card btn-editar-vaga"><img src="images/ico-editar-vaga-23.svg" alt="">EDITAR VAGA</button><button data-id="'+ data[i].id_vaga +'" class="btn-card btn-reabrir-vaga"><img src="images/ico-reabrir-vaga-27.svg" alt="">REABRIR VAGA</button></div>';

	}

	$('.cards-vagas-fechadas').html(htmlVagas);

	$('.btn-reabrir-vaga').on('tap', function(event){
		loadScreen(true);
		var id_vaga = $(event.target).attr('data-id');
		reabrirVaga(id_vaga);
		
	});

	$('.btn-ver-candidato').on('tap', function(event){
		loadScreen(true);
		var id_vaga = $(event.target).attr('data-id');
		registraIdVaga(id_vaga);
		navigatorViews("verCandidatos");
		loadScreen(false);
	});

	$('.btn-editar-vaga').on('tap', function(event){
		loadScreen(true);
		var id_vaga = $(event.target).attr('data-id');
		registraIdVaga(id_vaga);
		navigatorViews("editarVaga");
		
	});

	}
}


function fecharVaga(id_vaga){
	var id = getIdSalao();
	
	var dados = {"id_salao_vaga": id, "id_vaga": id_vaga};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_vaga/fecharVaga.php",
		data: dados,
		success: function(data){

				if(data.msg == "SUCCESS"){
					alertMsg("Sua vaga foi fechada!");
					loadCardsVagas();
				
				}else if(data.msg == "ERROR"){
					alertMsg("Aconteceu um erro.");
				}
				loadScreen(false);
			}
		});
}

function reabrirVaga(id_vaga){
	var id = getIdSalao();
	
	var dados = {"id_salao_vaga": id, "id_vaga": id_vaga};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_vaga/reabrirVaga.php",
		data: dados,
		success: function(data){

				if(data.msg == "SUCCESS"){
					alertMsg("Sua vaga foi reaberta!");
					loadCardsVagas();
				
				}else if(data.msg == "ERROR"){
					alertMsg("Aconteceu um erro.");
				}
				loadScreen(false);
			}
		});
}




		