function cargos(){
	var cargos = getCargos();

	var qtde_cargos = cargos.length;

	var optCargos = "";

	optCargos += '<option value="">Cargo</option>';

	for(i = 0; i < qtde_cargos; i++){

		optCargos += '<option value="'+ cargos[i] +'">'+ cargos[i] +'</option>';
	}
	$('#busca_vaga').html(optCargos);
}

cargos();

function carregaEstados(retorno){

	var estados = retorno;
	var qtde = estados.length;
	var optEstados = '<option value="">Estado</option>';

	for(i = 0;i < qtde; i++){
		optEstados += '<option value="'+ estados[i] +'">'+ estados[i] +'</option>';
	}
	$('#busca_estado').html(optEstados);
	$('#busca_estado').prop('disabled', false);
	loadScreen(false);
}

function getEstados(){
	loadScreen(true);
	var retorno = [];
	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_vaga/getEstados.php",
		success: function(data){

				for(i=0;i<data.length;i++){
					
					retorno.push(data[i].estado_salao);

				}
				carregaEstados(retorno);
			}
		});
	
}

function carregaCidades(retorno){

	var cidades = retorno;
	var qtde = cidades.length;
	var optcidades = '<option value="">Cidade</option>';

	for(i = 0;i < qtde; i++){
		optcidades += '<option value="'+ cidades[i] +'">'+ cidades[i] +'</option>';
	}
	$('#busca_cidade').html(optcidades);
	$('#busca_cidade').prop('disabled', false);
	loadScreen(false);
}

function getCidade(estado){
	loadScreen(true);
	var dados = {"estado": estado};
	var retorno = [];

	jQuery.ajax({
		type: "POST",
		data: dados,
		url: getServer()+"/server/modulos/mod_vaga/getCidades.php",
		success: function(data){

				for(i=0;i<data.length;i++){
					
					retorno.push(data[i].cidade_salao);

				}
				carregaCidades(retorno);
			}
		});
}

function carregaBairros(retorno){

	var bairros = retorno;
	var qtde = bairros.length;
	var optbairros = '<option value="">Bairro</option>';

	for(i = 0;i < qtde; i++){
		optbairros += '<option value="'+ bairros[i] +'">'+ bairros[i] +'</option>';
	}
	$('#busca_bairro').html(optbairros);
	$('#busca_bairro').prop('disabled', false);
	loadScreen(false);
}

function getBairro(cidade){
	loadScreen(true);
	var dados = {"cidade": cidade};
	var retorno = [];

	jQuery.ajax({
		type: "POST",
		data: dados,
		url: getServer()+"/server/modulos/mod_vaga/getBairros.php",
		success: function(data){

				for(i=0;i<data.length;i++){
					
					retorno.push(data[i].bairro_salao);

				}
				carregaBairros(retorno);
			}
		});
}

$("#busca_vaga").change(function(){
	var vaga = $("#busca_vaga").val();

	if(vaga == ""){
		$('#busca_estado').prop('disabled', true);
		$("#busca_estado option[value='']").attr("selected", true);
	}else{
		getEstados();
	}
  	
});

$("#busca_estado").change(function(){
	var estado = $("#busca_estado").val();

	if(estado == ""){
		$('#busca_cidade').prop('disabled', true);
		$("#busca_cidade option[value='']").attr("selected", true);
	}else{
		getCidade(estado);
	}
  	
});

$("#busca_cidade").change(function(){
	var cidade = $("#busca_cidade").val();

	if(cidade == ""){
		$('#busca_bairro').prop('disabled', true);
		$("#busca_bairro option[value='']").attr("selected", true);
	}else{
		getBairro(cidade);
	}
  	
});