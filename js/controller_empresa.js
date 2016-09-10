$('.bt-home-abrir').on('tap', function(event){
	loadScreen(true);
	navigatorViews("abrirVaga");
	loadScreen(false);
});
$('.bt-home-gerenciar').on('tap', function(event){
	loadScreen(true);
	navigatorViews("gerenciarVaga");
	loadScreen(false);
});
$('.bt-home-buscar').on('tap', function(event){
	loadScreen(true);
	navigatorViews("buscarCandidatos");
	loadScreen(false);
});
$('.tab-abertas').on('tap', function(event){
	loadScreen(true);
	navigatorViews("gerenciarVaga");
	loadScreen(false);
});
$('.tab-fechadas').on('tap', function(event){
	loadScreen(true);
	navigatorViews("vagasFechadas");
	loadScreen(false);
});

$('.tab-candidato-vagas').on('tap', function(event){
	loadScreen(true);
	navigatorViews("verCandidatos");
	
});
$('.tab-candidato-favoritado').on('tap', function(event){
	loadScreen(true);
	navigatorViews("verCandidatosFavoritados");
	
});


