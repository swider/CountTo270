var ct270 = {
	candidates: {
		romney: "r1",
		obama: "d1",
		cobb: "i1"
	}
}

$(document).ready(function(){
	ct270.map.init("#map-container");
	ct270.user.init();
	ct270.map.seed(ct270.user.getPresidential());
});
