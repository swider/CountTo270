ct270.user = (function(){
	var
		username,
		votes = {
			presidential: {
				Indiana: 'r1',
				Wisconsin: 'd1'
			}
		},
		
		init = function(){
			username = "swider";
			votes.presidential.Ohio = 'i1';
		},

		getPresidential = function(){
			return votes.presidential;
		},
		
		saveMap = function(callback){
			setTimeout(callback,1250);
//$.ajax({
//	url: "test.html",
//	type: "POST",
//	data: "name=John&location=Boston"
//	success: function(html){
//		
//	}
//});
		}

	return {
		init: init,
		getPresidential: getPresidential,
		saveMap: saveMap
	};
}());
