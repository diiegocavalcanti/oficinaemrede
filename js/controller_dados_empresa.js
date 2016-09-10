loadDadosEmpresa();
function loadDadosEmpresa(){
	
	var id = getIdSalao();

	var dados = {"id_empresa": id};

	jQuery.ajax({
		type: "POST",
		url: getServer()+"/server/modulos/mod_salao/getEmpresa.php",
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

	setInput(data[0].nome_user_emp, "#nome_user_salao");
	setInput(data[0].fone_user_emp, "#fone_user_emp");
	appendDDDEmpresario(data[0].cod_fone_user_emp, "#cod_fone_user_emp");
	setInput(data[0].nome_salao, "#nome_salao");
	appendDDDEmpresario(data[0].cod_fone_salao, "#cod_fone_salao");
	setInput(data[0].fone_salao, "#fone_salao");
	setInput(data[0].cep_salao, "#cep_salao");
	setInput(data[0].rua_salao, "#rua_salao");
	setInput(data[0].numero_salao, "#numero_salao");
	setInput(data[0].complemento_salao, "#complemento_salao");
	setInput(data[0].bairro_salao, "#bairro_salao");
	setInput(data[0].cidade_salao, "#cidade_salao");
	setInput(data[0].estado_salao, "#estado_salao");
	setInput(data[0].site_salao, "#site_salao");
	setInput(data[0].facebook_salao, "#facebook_salao");
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