ct270.map = (function(){
	var
		swatchSel = '.color',
		undistributedSel = '#undistributed',
		stateInfoSel = '#state_info',
		graphSel = '.graph',
		statesTopSel = '#states2 .state',
		statesBottomSel = '#states1 .state',
		
		$mapContainer,
		$swatches,
		$undistributed,
		$stateInfo,
		$graph,
		$statesTop,
		$statesBottom,
		
		activeCandidate = "r1",
		

		seed = function(states){
			var origCandidate = activeCandidate;
			$.each(states, function(name, candidate) { 
				activeCandidate = candidate;
				$('#states2 .state[data-name='+name+']').click();
			});
			activeCandidate = origCandidate;
		},
	
		setActiveCandidate = function(){
			var $el = $(this);
			activeCandidate = $el.attr("data-color");
			$(".selected").removeClass("selected");
			$el.addClass("selected");
		},
		
		stateMouseOver = function(){
			var $el = $(this);
			$statesBottom.filter('[data-name='+$el.attr("data-name")+']').addClass("hover");
			// TODO: Force repaint in Chrome 15 (and 16? 17 is fine.)
			$stateInfo.css('display','block');
			$stateInfo.html($el.attr("data-info"));
		},
		stateMouseOff = function(){
			$statesBottom.filter('[data-name='+$(this).attr('data-name')+']').removeClass('hover');
			$stateInfo.css('display','none');
		},
		stateMouseMove = function(e){
			$stateInfo.css({'top':e.pageY+10,'left':e.pageX+10});
		},
		stateMouseClick = function(){
			var 
				$el = $(this),
				$el2 = $statesBottom.filter('[data-name='+$el.attr('data-name')+']'),
				$newtotal = $swatches.filter('.'+activeCandidate).siblings('.total'),
				$oldtotal = $undistributed;
			if(!$el2.hasClass(activeCandidate)){
				$.each(ct270.candidates, function(name, cssClass){
					if($el2.hasClass(cssClass)){
						$oldtotal = $swatches.filter('.'+cssClass).siblings('.total');
					}
				});
				$oldtotal.text(parseInt($oldtotal.text()) - parseInt($el.attr('data-votes')));
				$newtotal.text(parseInt($newtotal.text()) + parseInt($el.attr('data-votes')));
				$el2.attr('class', 'state '+activeCandidate);

				$.each(ct270.candidates, function(name, cssClass) {
					$graph.filter('.'+cssClass).width(parseInt(($swatches.filter('.'+cssClass).siblings('.total').text())/538*100) + '%');
				});
			}
		},
	
		init = function(mapContainerSel){
			$mapContainer = $(mapContainerSel);
			$swatches = $mapContainer.find(swatchSel);
			$undistributed = $mapContainer.find(undistributedSel);
			$stateInfo = $mapContainer.find(stateInfoSel);
			$graph = $mapContainer.find(graphSel);
			$statesTop = $mapContainer.find(statesTopSel);
			$statesBottom = $mapContainer.find(statesBottomSel);
			
			$swatches.click(setActiveCandidate);
			
			$statesTop
				.hover(stateMouseOver, stateMouseOff)
				.mousemove(stateMouseMove)
				.click(stateMouseClick);
		};
	
	return {
		init: init,
		seed: seed
	};
}());
