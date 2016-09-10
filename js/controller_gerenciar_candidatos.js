loadCardsCandidatos();
function loadCardsCandidatos(){
	
	var id_vaga = getIdVaga();
	
	var id = getIdSalao();

	var dados = {"id_salao_vaga": id, "id_vaga": id_vaga};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/listCandidatoVaga.php",
		data: dados,
		success: function(data){

				montarCardsCandidatos(data);
			}
		});

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/listCandidatoVagaFavoritado.php",
		data: dados,
		success: function(data){ 
				montarCardsFavoritados(data);
			}
		});
}

function montarCardsCandidatos(data){

	if(data.status == "false"){
		var resposta = '<p class="resposta-servidor">NÃO HÁ CANDIDATOS PARA ESSA VAGA, VERIFIQUE OS FAVORITOS.</p>';
		$('.cards-candidatos').html(resposta);
	}else{

	var qtde = data.length;

	date = new Date();
    ano = date.getFullYear();


	var htmlVagas = '';

	for(i = 0; i < qtde; i++){

		var arrayHab = data[i].habilidades.split(",");
		var htmlHab = "";

		for(j=0; j < arrayHab.length; j++){
			if(arrayHab[j] != ""){
				htmlHab += '<span class="habilidade-c">'+ arrayHab[j] +'</span>';
			}
		}

		htmlVagas += '<div class="card card-candidato" data-id="'+ data[i].id_vaga+'"> <div class="card-content"> <h3>'+ data[i].nome_user_cand +'</h3> <h4>'+ data[i].sexo_user_cand +' | '+ (ano - data[i].ano_user_cand) +' anos</h4> <h5>Imbiribeira - Recife - PE</h5> <h5>Habilidades: <span class="habilidades-card">' + htmlHab + '</span></h5> <h6>Telefone: <span>('+ data[i].cod_fone_user_cand +') '+ data[i].fone_user_cand +'</span></h6> <h6>Whatsapp: <span>('+ data[i].cod_wa_user_cand +') '+ data[i].wa_user_cand +'</span></h6> </div><button class="btn-card btn-favoritar" data-id="'+ data[i].id_candidato_vaga +'"><img src="images/ico-favoritar-candidato-30.svg" alt="">FAVORITAR</button></div>';
	}

	$('.cards-candidatos').html(htmlVagas);

	$('.btn-favoritar').on('tap', function(event){
		loadScreen(true);
		var id_vaga = $(event.target).attr('data-id');
		favoritar(id_vaga);
	});

	}
	loadScreen(false);

}

function montarCardsFavoritados(data){

	if(data.msg == "NOT_CANDIDATO_VAGA"){
		var resposta = '<p class="resposta-servidor-cinza">VOCÊ AINDA NÃO FAVORITOU NENHUM CANDIDATO</p>';
		$('.cards-favoritados').html(resposta);
	}else{

	var qtde = data.length;

	date = new Date();
    ano = date.getFullYear();

	var htmlVagas = '';

	for(i = 0; i < qtde; i++){

		htmlVagas += '<div class="card card-candidato" data-id="'+ data[i].id_vaga+'"><div class="card-content"><h3>'+ data[i].nome_user_cand +'</h3><h4>'+ data[i].sexo_user_cand +' | '+ (ano - data[i].ano_user_cand) +' anos</h4><h5>Imbiribeira - Recife - PE</h5><h6>Telefone: <span>('+ data[i].cod_fone_user_cand +') '+ data[i].fone_user_cand +'</span></h6><h6>Whatsapp: <span>('+ data[i].cod_wa_user_cand +') '+ data[i].wa_user_cand +'</span></h6></div><button class="btn-card btn-remover" data-id="'+ data[i].id_candidato_vaga +'"><img src="images/ico-remover-31.svg" alt="">REMOVER DOS FAVORITOS</button></div>';
	}

	$('.cards-favoritados').html(htmlVagas);
	$('.btn-remover').on('tap', function(event){
		loadScreen(true);
		var id_candidato_vaga = $(event.target).attr('data-id');
		desfavoritar(id_candidato_vaga);
	});

	}
	loadScreen(false);
}


function favoritar(id_candidato_vaga){
	
	var dados = {"id_candidato_vaga": id_candidato_vaga};
	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/favoritarCandidato.php",
		data: dados,
		success: function(data){
				if(data.msg == "SUCCESS"){
					alertMsg("Candidato Favoritado!");
					loadCardsCandidatos();
				
				}else if(data.msg == "ERROR"){
					alertMsg("Aconteceu um erro.");
				}
				loadScreen(false);
			}
		});
}

function desfavoritar(id_candidato_vaga){
	
	var dados = {"id_candidato_vaga": id_candidato_vaga};
	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/desfavoritarCandidato.php",
		data: dados,
		success: function(data){

				if(data.msg == "SUCCESS"){
					alertMsg("Candidato removido dos favoritos!");
					loadCardsCandidatos();
				
				}else if(data.msg == "ERROR"){
					alertMsg("Aconteceu um erro.");
				}
				loadScreen(false);
			}
		});
}





		