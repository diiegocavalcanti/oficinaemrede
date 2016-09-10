
jQuery('#busca-candidato').submit(function(){

			var ok = true;

			if($("#busca_vaga").val() == ""){
				borderRed("#busca_vaga");
				alertMsg("Selecione um cargo.");
				ok = false;
				return false;
			}
			if($("#busca_estado").val() == ""){
				borderRed("#busca_estado");
				alertMsg("Selecione um estado.");
				ok = false;
				return false;
			}

			if($("#busca_cidade").val() == ""){
				borderRed("#busca_cidade");
				alertMsg("Selecione uma cidade.");
				ok = false;
				return false;
			}

			if(ok){

				loadScreen(true);
				var dados = jQuery(this).serialize();

				jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_vaga/buscaVagas.php",
					data: dados,
					success: function(data){ 
						
							var cargo = $("#busca_vaga").val();
							var estado = $("#busca_estado").val();
							var cidade = $("#busca_cidade").val();
							var bairro = $("#busca_bairro").val();

							
							montarCardsBusca(data, cargo, estado, cidade, bairro);
							navigatorViews('resultadoBusca');
						

					}
				});
				return false;
				}
		});

		function vagaEscolhida(){

			var id = getIdUser();
	
			var dados = {"id_candidato": id};

			jQuery.ajax({
					type: "POST",
					url: getServer()+"/server/modulos/mod_candidato_vaga/vagaEscolhida.php",
					data: dados,
					success: function(data){ 
						
						var cards = $(".card-resultado");

						for(i=0;i<cards.length;i++){
							inArray(cards[i].id);
						}

						function inArray(id){
							for(j=0;j<data.length;j++){
								if(data[j].id_vaga == id){
									pintarVaga(id);
								}
							}
						}

					}
				});
		}

		function montarCardsBusca(data, cargo, estado, cidade, bairro){

			setTimeout(function(){
				$("#info-cargo").html(cargo);
				$("#info-estado").html(estado);
				$("#info-cidade").html(cidade);
				if(bairro != ""){
					$("#info-bairro").html(bairro);
				}else{
					$("#info-bairro").html("--");
				}


				if(data.status == "false"){
					var resposta = '<p class="resposta-servidor">NENHUM RESULTADO PARA SUA BUSCA</p>';
					$('.feedback-buscas').html(resposta);

				}else{

					var qtde = data.length;

					var htmlVagas = '';

					for(i = 0; i < qtde; i++){

						htmlVagas += '<div class="card-resultado" id="'+ data[i].id_vaga +'"><div class="card-content-container mini-card"><div class="card-resultado-content"><h2>'+ data[i].nome_salao +'</h2><h3>'+ data[i].bairro_salao +' - '+ data[i].cidade_salao +' - '+ data[i].estado_salao +'</h3><h4>CARGO: <span>'+ data[i].cargo_vaga +'</span></h4></div><button data-id="'+ data[i].id_vaga +'" data-salao="'+ data[i].id_salao +'" class="btn-card btn-ver-vaga"><img src="images/ico-ver-vaga-29.svg" alt="">VER MAIS</button></div><div class="card-content-container big-card"><div class="card-resultado-content"><h2>'+ data[i].nome_salao +'</h2><h3>'+data[i].rua_salao+', '+data[i].numero_salao+' '+ data[i].complemento_salao+'</h3><h3>'+data[i].bairro_salao+' - '+data[i].cidade_salao+' - '+data[i].estado_salao+'</h3><h3>CEP: '+data[i].cep_salao+'</h3><h3>Fone: <span>('+data[i].cod_fone_salao+') '+data[i].fone_salao+'</span></h3><h3>Site: <span>'+data[i].site_salao+'</span></h3><h3>Facebook: <span>'+data[i].facebook_salao+'</span></h3><div class="delimiter-card"></div><h4>CARGO: <span>'+data[i].cargo_vaga+'</span></h4><h5>'+data[i].qtde_vaga+' Vagas | '+data[i].sexo_vaga+'</h5><div class="delimiter-card"></div><h5>Horário de Trabalho</h5><div class="row"><div class="col-xs-6"><h3>SEG: de '+data[i].seg_de+' às '+data[i].seg_as+'</h3><h3>TER: de '+data[i].ter_de+' às '+data[i].ter_as+'</h3><h3>QUA: de '+data[i].qua_de+' às '+data[i].qua_as+'</h3><h3>QUI: de '+data[i].qui_de+' às '+data[i].qui_as+'</h3></div><div class="col-xs-6"><h3>SEX: de '+data[i].sex_de+' às '+data[i].sex_as+'</h3><h3>SAB: de '+data[i].sab_de+' às '+data[i].sab_as+'</h3><h3>DOM: de '+data[i].dom_de+' às '+data[i].dom_as+'</h3></div></div><h5>Informações Adicionais</h5><h3>'+data[i].info_vaga+'</h3></div><button class="btn-card btn-concorrer-vaga" data-id="'+ data[i].id_vaga +'"><img src="images/ico-concrrer-vaga-31.svg" alt="">CONCORRER À VAGA</button><button class="btn-card btn-fechar-card" data-id="'+ data[i].id_vaga +'"><img src="images/ico-arquivar-30.svg" alt="">VER MENOS</button></div></div>';
					}

					$('.resultado-buscas').html(htmlVagas);

					$('.btn-ver-vaga').on('tap', function(event){
						var id_vaga = $(event.target).attr('data-id');
						mostrarVaga(id_vaga);
					});

					$('.btn-concorrer-vaga').on('tap', function(event){
						loadScreen(true);
						var id_vaga = $(event.target).attr('data-id');
						favoritarVaga(id_vaga);
						loadScreen(false);
					});

					$('.btn-fechar-card').on('tap', function(event){
						var id_vaga_fechar = $(event.target).attr('data-id');
						closeCard(id_vaga_fechar);
					});

					vagaEscolhida();

				}

				loadScreen(false);
				
			},300);	
		}
	

$('.btn-nova-busca').on('tap', function(event){
	loadScreen(true);
	navigatorViews("buscarVagas");
	loadScreen(false);
});


function mostrarVaga(id_vaga){
	$("#"+id_vaga+ " .mini-card").fadeOut(100);
	$("#"+id_vaga+ " .big-card").fadeIn(100);

}

function closeCard(id_vaga){
	$("#"+id_vaga+ " .mini-card").fadeIn(100);
	$("#"+id_vaga+ " .big-card").fadeOut(100);
	
}



function favoritarVaga(id_vaga){
	loadScreen(true);

	var id = getIdUser();
	
	var dados = {"id_candidato": id, "id_vaga": id_vaga, "favoritado": "true", "favoritado_emp": "false"};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato_vaga/addCandidatoVaga.php",
		data: dados,
		success: function(data){

				if(data == "IS_FAVORITED"){
					alertMsg("Você já se candidatou a esta vaga.");
				}
				if(data == "NOT_DATA_SERVER"){
					alertMsg("Servidor não recebeu dados");
				}
				if(data == "SUCCESS"){
					pintarVaga(id_vaga);
					alertMsg("Vaga selecionada!");
				}

				loadScreen(false);
			}
		});
}

function pintarVaga(id){					
	$("#"+id).addClass("card-selecionado");
}

