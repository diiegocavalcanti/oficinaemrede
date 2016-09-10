$('.btn-nova-busca').on('tap', function(event){
	loadScreen(true);
	navigatorViews("buscarVagas");
	loadScreen(false);
});