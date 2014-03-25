(function ($) {

    "use strict";

    var mapLayers = {
        congrDist_TL: L.mapbox.tileLayer('computech.hj38elg7'),
        congrDist_GL: L.mapbox.gridLayer('computech.hj38elg7'),
        cnty_TL: L.mapbox.tileLayer('computech.hj2ghocl'),
        cnty_GL: L.mapbox.gridLayer('computech.hj2ghocl'),
        schoolDist_TL: L.mapbox.tileLayer('computech.hin0bi84'),
        schoolDist_GL: L.mapbox.gridLayer('computech.hin0bi84')
    },
        eRateMap = {
            init: function () {
                var map = L.mapbox.map('map').setView([38.82, -94.96], 3),
                    hash = L.hash(map);

                //L.control.fullscreen().addTo(map);
                map.scrollWheelZoom.disable();

                this.activeLayerGroup = new L.LayerGroup();
                this.addLayers(map, mapLayers.congrDist_TL, mapLayers.congrDist_GL);

                $('.list-layerSwitch').on('click', 'li', {
                    map: map
                }, eRateMap.switchLayer);
            },
            addLayers: function (map, layer_TL, layer_GL) {
                eRateMap.activeLayerGroup.addLayer(layer_TL);
                eRateMap.activeLayerGroup.addLayer(layer_GL);
                //eRateMap.activeLayerGroup.addLayer(congrDist_GC);
                eRateMap.activeLayerGroup.addTo(map);
                L.mapbox.gridControl(layer_GL.on('click', eRateMap.getMapData));
            },
            switchLayer: function (event) {

                var targetID = event.target.id,
                    tile_TL = mapLayers[targetID + '_TL'],
                    tile_GL = mapLayers[targetID + '_GL'],
                    mapDesc = event.target.getAttribute('href');

                event.preventDefault();
				
				eRateMap.clearMapData();
                eRateMap.activeLayerGroup.clearLayers();
                eRateMap.addLayers(event.data.map, tile_TL, tile_GL);

                $('.list-layerSwitch').find('.active').removeClass('active');
                $('#' + targetID).addClass('active');

                // Show Map Description
				$('#content-main').find('.map-desc').addClass('hide');
                $(mapDesc).removeClass('hide');
            },
            getMapData: function (o) {
                var data;

                if (o.data !== undefined) {
                    data = o.data;

                    // Populate stats
                    $('#stat-geography').text(data.GEOGRAPHY_);
                    $('#stat-geoID').text(data.GEOGRAP_01);
                    $('#stat-geoDesc').text(data.GEOGRAP_02);
                    $('#stat-state').text(data.STATE);
                    $('#stat-pctSchool').text(data.PCT_SCHOOL);
                    $('#stat-totSchools').text(data.TOTAL_SCHO);
                    $('#stat-fiber').text(data.WITH_FIBER);

                } else { 
                    eRateMap.clearMapData();
                }
            },
			clearMapData: function () {
				$('#stat-state').text('--');
                $('.dl-stats').find('span').text('-----');
			}
        };

    eRateMap.init();

}(jQuery));