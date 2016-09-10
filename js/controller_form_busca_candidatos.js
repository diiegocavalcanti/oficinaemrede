
jQuery('#busca-candidatos').submit(function(){

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
					url: getServer()+"/server/modulos/mod_candidato/buscaCandidatos.php",
					data: dados,
					success: function(data){ 
						
							var cargo = $("#busca_vaga").val();
							var estado = $("#busca_estado").val();
							var cidade = $("#busca_cidade").val();
							var bairro = $("#busca_bairro").val();

							
							montarCardsBusca(data, cargo, estado, cidade, bairro);
							navigatorViews('resultadoBuscaCandidatos');
						

					}
				});
				return false;
				}
		});


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
					$('.feedback-buscas-candidatos').html(resposta);

				}else{

					var qtde = data.length;

					date = new Date();
    				ano = date.getFullYear();

					var htmlVagas = '';

					for(i = 0; i < qtde; i++){

						console.log(data[i].habilidades);

						var arrayHab = data[i].habilidades.split(",");
						var htmlHab = "";

						for(j=0; j < arrayHab.length; j++){
							if(arrayHab[j] != ""){
								htmlHab += '<span class="habilidade-c">'+ arrayHab[j] +'</span>';
							}
						}

						htmlVagas += '<div class="card card-candidato" data-id="' + data[i].id_vaga + '"> <div class="card-content"> <h3>' + data[i].nome_user_cand + '</h3> <h4>' + data[i].sexo_user_cand + ' | ' + (ano - data[i].ano_user_cand) + ' anos</h4> <h5>Imbiribeira - Recife - PE</h5> <h5>Habilidades: <span class="habilidades-card">' + htmlHab + '</span></h5> <h6>Telefone: <span>(' + data[i].cod_fone_user_cand + ') ' + data[i].fone_user_cand + '</span></h6> <h6>Whatsapp: <span>(' + data[i].cod_wa_user_cand + ') ' + data[i].wa_user_cand + '</span></h6> </div></div>';

						
					}

					$('.resultado-buscas-candidatos').html(htmlVagas);


				}

				loadScreen(false);
				
			},300);	
		}
	

$('.btn-nova-busca-candidatos').on('tap', function(event){
	loadScreen(true);
	navigatorViews("buscarCandidatos");
	loadScreen(false);
});






