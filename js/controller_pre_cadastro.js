$('.bt-pre-emp').on('tap', function(event){
	loadScreen(true);
	navigatorViews("cadastroEmpresario");
	loadScreen(false);
});
$('.bt-pre-cand').on('tap', function(event){
	loadScreen(true);
	navigatorViews("cadastroCandidato");
	loadScreen(false);
});
$('.btn-voltar-cadastro').on('tap', function(event){
	loadScreen(true);
	loadLogin(true);
	loadScreen(false);
});