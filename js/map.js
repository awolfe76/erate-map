// Define map layers
var congrDist_TL = L.mapbox.tileLayer('computech.hj38elg7'),
	congrDist_GL = L.mapbox.gridLayer('computech.hj38elg7'),
	congrDist_GC = L.mapbox.gridControl(congrDist_GL, {follow: false});
		
var cnty_TL = L.mapbox.tileLayer('computech.hj2ghocl'),
	cnty_GL = L.mapbox.gridLayer('computech.hj2ghocl'),
	cnty_GC = L.mapbox.gridControl(cnty_GL, {follow: false});

var schoolDist_TL = L.mapbox.tileLayer('computech.hin0bi84'),
	schoolDist_GL = L.mapbox.gridLayer('computech.hin0bi84'),
	schoolDist_GC = L.mapbox.gridControl(schoolDist_GL, {follow: false});


var mapDetails = {
  'congrDist': {
    title: 'Congressional District',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
  },
  'cnty': {
    title: 'County',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
  },
  'schoolDist': {
    title: 'School District',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
  }
  
}

			
var eRateMap = {
	init: function() {
		var map = L.mapbox.map('map').setView([38.82, -94.96], 3),
			hash = L.hash(map);
			
		this.activeLayerGroup = new L.LayerGroup();
		this.activeLayerGroup.addLayer(congrDist_TL);
		this.activeLayerGroup.addLayer(congrDist_GL);
		//this.activeLayerGroup.addLayer(congrDist_GC);
		this.activeLayerGroup.addTo(map);
		
		L.control.fullscreen().addTo(map);
		L.mapbox.gridControl(eval(congrDist_GL).on('mousemove', eRateMap.getMapData));
		map.scrollWheelZoom.disable();
		
		$('.sel-layer').on('click', { map: map }, eRateMap.switchLayer);
	},
	switchLayer: function(event) {
		
		var tileName = event.target.id;

		event.preventDefault();
		
		$('.sel-layer').removeClass('active');
		$('#'+tileName).addClass('active');
		
		eRateMap.activeLayerGroup.clearLayers();
		eRateMap.activeLayerGroup.addLayer(eval(tileName + "_TL"));
		eRateMap.activeLayerGroup.addLayer(eval(tileName + "_GL"));
		//eRateMap.activeLayerGroup.addLayer(eval(tileName+"_GC"));
		eRateMap.activeLayerGroup.addTo(event.data.map);
		
		L.mapbox.gridControl(eval(tileName + "_GL").on('mousemove', eRateMap.getMapData));
	
		$('#map-hd').text(mapDetails[tileName].title);
		$('#map-desc').html(mapDetails[tileName].description);
		$('#map-legend').html(mapDetails[tileName].legend);		
	},
	getMapData: function(o) {
		var data;
	
		if (o.data != undefined) {
		   data = o.data;   
			
			// Populate stats
			$('#stat-geography').text(data.GEOGRAPHY_);
			$('#stat-geoID').text(data.GEOGRAP_01);
			$('#stat-geoDesc').text(data.GEOGRAP_02);
			$('#stat-state').text(data.STATE);		
			$('#stat-pctSchool').text(data.PCT_SCHOOL);
			$('#stat-totSchools').text(data.TOTAL_SCHO);
			$('#stat-fiber').text(data.WITH_FIBER);
		
		} else { // Reset the text labels
			$('#stat-state').text('--');
			$('.dl-stats').find('span').text('-----');	
		}
	}
}
			
eRateMap.init();
