ct270.map = (function(){
	var
		swatchSel = '.color',
		undistributedSel = '#undistributed',
		stateInfoSel = '#state_info',
		graphSel = '.graph',
		saveSel = '#save',
		statesTopSel = '#states2 .state',
		statesBottomSel = '#states1 .state',
		
		$mapContainer,
		$swatches,
		$undistributed,
		$stateInfo,
		$graph,
		$save,
		$statesTop,
		$statesBottom,
		
		activeCandidate = "r1",
		votes = {},
		

		getVotes = function(states){
			return votes;
		},
		
		setVotes = function(states){
			var origCandidate = activeCandidate;
			$.each(states, function(name, candidate) { 
				activeCandidate = candidate;
				$('#states2 .state[data-name='+name+']').click();
			});
			activeCandidate = origCandidate;
			
			//$("<style type='text/css'> .CANDIDATE_SLUG{ fill:PARTY_COLOR; } </style>").appendTo("head");
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
				votes[$el.attr('data-name')] = activeCandidate;
			}
		},
		
		saveMap = function(){
			$save.addClass('loading');
			
			var
				callback = function(){ $save.removeClass('loading'); };
			
			ct270.user.saveMap(callback);
			return false;
		},
	
		init = function(mapContainerSel){
			$mapContainer = $(mapContainerSel);
			$swatches = $mapContainer.find(swatchSel);
			$undistributed = $mapContainer.find(undistributedSel);
			$stateInfo = $mapContainer.find(stateInfoSel);
			$graph = $mapContainer.find(graphSel);
			$save = $mapContainer.find(saveSel);
			$statesTop = $mapContainer.find(statesTopSel);
			$statesBottom = $mapContainer.find(statesBottomSel);
			
			$swatches.click(setActiveCandidate);
			$save.click(saveMap);
			
			$statesTop
				.hover(stateMouseOver, stateMouseOff)
				.mousemove(stateMouseMove)
				.click(stateMouseClick);
		};
	
	return {
		init: init,
		setVotes: setVotes,
		getVotes: getVotes
	};
}());
