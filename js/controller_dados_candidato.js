loadDadosCandidato();
function loadDadosCandidato(){

	loadScreen(true);
	
	var id = getIdUser();

	var dados = {"id_candidato": id};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_candidato/getCandidato.php",
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
					console.log(data);
					setFormConta(data);
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

function setFormConta(data){

	setInput(data[0].nome_user_cand, "#nome_user_cand");
	setSexo(data[0].sexo_user_cand);
	setData(data[0].dia_user_cand);
	setMes(data[0].mes_user_cand);
	setAno(data[0].ano_user_cand);
	setInput(data[0].fone_user_cand, "#fone_user_cand");
	setInput(data[0].wa_user_cand, "#wa_user_cand");
	setInput(data[0].cep_user_cand, "#cep_user_cand");
	setInput(data[0].rua_user_cand, "#rua_user_cand");
	setInput(data[0].numero_user_cand, "#numero_user_cand");
	setInput(data[0].complemento_user_cand, "#complemento_user_cand");
	setInput(data[0].bairro_user_cand, "#bairro_user_cand");
	setInput(data[0].cidade_user_cand, "#cidade_user_cand");
	setInput(data[0].estado_user_cand, "#estado_user_cand");
	appendDDDEmpresario(data[0].cod_fone_user_cand, "#cod_fone_user_cand");
	appendDDDEmpresario(data[0].cod_wa_user_cand, "#cod_wa_user_cand");
	setHabilidades(data[0].habilidades);

	loadScreen(false);
}

function setInput(dado, input){
	$(input).val(dado);
}


function appendDDDEmpresario(ddd, input){
	var ddds = getDDDs();

	var html = "<option value=''>DDD</option>";

	for(i=0; i< ddds.length; i++){
		if(ddds[i] == ddd){
			html += "<option selected value='"+ ddds[i] +"'>"+ ddds[i] +"</option>";
		}else{
			html += "<option value='"+ ddds[i] +"'>"+ ddds[i] +"</option>";
		}
		
	}

	$(input).html(html);
}

function setSexo(sexo){

	var sexos = ["Masculino","Feminino"];
	var optSexo = '<option value="">Selecione</option>';

	for(i=0;i<sexos.length;i++){
		if(sexos[i] == sexo){
			optSexo += '<option selected value="'+ sexos[i] +'">'+ sexos[i] +'</option>';
		}else{
			optSexo += '<option value="'+ sexos[i] +'">'+ sexos[i] +'</option>';
		}
	}

	$("#sexo_user_cand").html(optSexo);

}

function setData(data){

	var datas = 31;
	var optDatas = '<option value="">Dia</option>';

	for(i=0;i<datas;i++){
		if(i == data){
			optDatas += '<option selected value="'+ i +'">'+ i +'</option>';
		}else{
			optDatas += '<option value="'+ i +'">'+ i +'</option>';
		}
	}
	$("#dia_user_cand").html(optDatas);
}

function setMes(mes){
	var meses = ["Janeiro", "Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

	var qtde = meses.length;

	var optMeses = '<option value="">Mês</option>';

	for(i=0; i < qtde; i++){
		if((i+1) == mes){
			optMeses += '<option selected value="'+ (i+1) +'">'+ meses[i]+'</option>';
		}else{
			optMeses += '<option value="'+ (i+1) +'">'+ meses[i]+'</option>';
		}
	}
	$("#mes_user_cand").html(optMeses);
}

function setAno(ano_data){
	var d = new Date();
	d = d.getFullYear();

	var ano = d - 18;
	var opt = "";
	opt += '<option value="">Ano</option>';
	var output;

	for(i = 0; i < 55; i++){

		output = ano - i;
		if(output == ano_data){
			opt += '<option selected value="'+ output +'">'+ output +'</option>';
		}else{
			opt += '<option value="'+ output +'">'+ output +'</option>';
		}
	}
	$('#ano_user_cand').html(opt);

}

function setHabilidades(habilidades){

	var hab = getCargos();

	var check = "";

	var array = habilidades.split(",");

	for(i=0; i<hab.length; i++){

		check += '<div class="checkbox"><label><input type="checkbox" id="habilidade-'+ i +'" name="habilidade-'+ i +'" value="'+ hab[i] +'"> '+ hab[i] +'</label></div>';		
	}
	$('.habilidades-form').html(check);

	for(i=0;i < hab.length; i++){
		for(j=0; j< array.length; j++){
			if($("#habilidade-"+i).val() == array[j]){
				$("#habilidade-"+i).prop('checked', 'true');
			}
		}
	}
}