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
		};

	return {
		init: init,
		getPresidential: getPresidential
	};
}());
