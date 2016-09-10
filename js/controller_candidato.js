$('.bt-home-buscar').on('tap', function(event){
	loadScreen(true);
	navigatorViews("buscarVagas");
	loadScreen(false);
});
$('.bt-home-escolhidas').on('tap', function(event){
	loadScreen(true);
	navigatorViews("vagasEscolhidas");
	
});

$('.tab-escolhidas').on('tap', function(event){
	loadScreen(true);
	navigatorViews("vagasEscolhidas");
	
});
$('.tab-arquivadas').on('tap', function(event){
	loadScreen(true);
	navigatorViews("vagasArquivadas");
	
});