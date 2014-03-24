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
		
var eRateMap = {
	init: function() {
		var map = L.mapbox.map('map').setView([38.82, -94.96], 3),
			hash = L.hash(map);
			
		this.activeLayerGroup = new L.LayerGroup();
		this.addLayers(map, congrDist_TL, congrDist_GL);
		
		L.mapbox.gridControl(eval(congrDist_GL).on('mousemove', eRateMap.getMapData));
		L.control.fullscreen().addTo(map);
		map.scrollWheelZoom.disable();
		
		$('.list-layerSwitch').on('click', 'li', { map: map }, eRateMap.switchLayer);
	},
	addLayers: function(map, layer_TL, layer_GL) { 
		eRateMap.activeLayerGroup.addLayer(layer_TL);
		eRateMap.activeLayerGroup.addLayer(layer_GL);
		//eRateMap.activeLayerGroup.addLayer(congrDist_GC);
		eRateMap.activeLayerGroup.addTo(map);
	},
	switchLayer: function(event) {
		
		var tileName = event.target.id;

		event.preventDefault();
		
		$('.list-layerSwitch').find('.active').removeClass('active');
		$('#'+tileName).addClass('active');
		
		eRateMap.activeLayerGroup.clearLayers();
		eRateMap.addLayers(event.data.map, eval(tileName + "_TL"), eval(tileName + "_GL"));

		L.mapbox.gridControl(eval(tileName + "_GL").on('mousemove', eRateMap.getMapData));
		
		$('.map-desc').hide();
		$('#desc-'+tileName).show();	
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