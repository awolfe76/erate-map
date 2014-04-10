(function ($) {

    "use strict";
    
    // Define map layers
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
                var defLat = 38.82,
                    defLon = -94.96,
                    defZoom = 4;
                                
                var map = L.mapbox.map('map', null, {minZoom: 2, maxZoom: 9, zoom: defZoom});
                
                //.setView([defLat, defLon], defZoom);

				var	image = '<img align="left" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAASCAYAAAC5ICcsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0JGNDU3NjZDNjlBMTFFMEEwNDU5QkY4MjlFMkJGN0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0JGNDU3NjdDNjlBMTFFMEEwNDU5QkY4MjlFMkJGN0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QkY0NTc2NEM2OUExMUUwQTA0NTlCRjgyOUUyQkY3RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QkY0NTc2NUM2OUExMUUwQTA0NTlCRjgyOUUyQkY3RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjqrMHUAAAWmSURBVHja7Jp5bFRVFMZnWrpCK6BWLWJtaXEBa4mJFJeQgkskAa24JC5xSdRYDWIQQZHgggFRSvUPa9WgxgVJjAv+AUFpTQNq0ZpIC1hTStEqglXoOu0Ard9Jfq++Tqadrv+9k3xM35v77j3nu9859943+Lu7u32eeTbSNsb+ycubc50+Jghdru/ihR3Cn1zPEq4Xpgqmxn3C10KFR6NnjpWVlf4vLFmRcFFIm4PCl8J5QqGwMEw/q4X3hOXCXx6tnvWqWJgJ41mqkd3fJpwjbBXShM+FYqFaiBJmCA8I9wi5wm3CHo9Sz9zCss9GocT1XQpL4VnCjcIW4QLhBpbMMmGBcKfwgfAK353yaPXMEVY3VchtLwjnI5wtLJePhbTZICxjH/a7JyrPHHOLyX08HCfcKnwrfCSsQVTbhXzhFmG3UCBcSvWqHeCYZwoXC5cIGf20ixGSBpkkp4e5b/7NpL/RtARhyiCfyRLihjHmWA5VF46A/8Z1eoQ2iRHmLGzFMuLPoOpcxSmxhM8lQrkwXwjyzHb2YL8OMoC1QqfQIPwh1EHOv0INRM9iD2fL8/sIo1XYizCNgHr8N1KrSJLV7PscYa6nje0fHyY5/PRvifEPk5sq/MZe8nshmsNMN3zYdSXxHkHATcLZQiYctJAsB9gypJGYbcQSy5j59P26MJ1qn4hPPwpHmbw04j1KvxP4vp34LO51+JvBKb2QtsZRKcJz4ujgpO/EYXEfJganKEzn0HY5PP0gnCZcJvwiBOi/zuVTOf7b24JkrnuE1UHDWvZPCdyvZjmM4fQXdAmkBQwly6IJ0ohbJFxJxrwoXE0wGSzBd7PHS0Aoto87V3ie+9lM/tP06dg0MJfrVPpYw2TaBL+GGOtpWw8PJuhrhImQP0l4iYPKEnzejL/G0UPCKgRkE/MEY6TySqaAeN7F93kkZi5JUYBgbhbeEJ4T9rMyvEnce4mjnM+7EO5arifj832IPwvx5zPPxykcKxmvmYSthPsSqrsl8JMIyZ5Zgch2EUsO834v/U+l3Xy3f85SGI24zNHvUL+PLHPENH6EloxosmwrFWsuRBzkoJBJMJ8hhNlUlloyxHxayjMmhp0QkxSy3B3nOp3vFjKR8fSf5EqmQqrOeibeMu9tsv5j3tVN5plEJigBglfAUQoJkU1lWcYpORduq/Glktc4uxlrCn09QyXPwaflCNvG+Ikqk+2K7zBiTeD+tVS9MgSfS2X9VPiKU/1OfGhnD32IqhdFTCkkRA0VM4tnHL8mEuMV9LmOcezeOxSfXkthLBM7z1USq5jUIsrxYiqIUzZzKPlfQNxArYJsreP6ZU6XRuA3lNtXhZOQUUF2BhD9eAKNgqCxTFIzE+pYPSfVlUz8AUifRFXYBWnjqNJ7aFdFvK0Q34yvNbRfxb0jiCSO8RtJyG1UrGL8byLjG6kCNVSV2fhQybvCYrjdQfLFEnuAbUIyCebYRqrnBhJok2vsGcSYDI/G7THiaCBGZ3n38Wnx/AynTfjbTHwt/H2MyllK1TYhv+Vq07Nn99tPOnl5c2pwYJpLaPshJJONvGXu37xasEDuJ3tnQuxwLJbxu1wb4UDIRr6rj1NnfARhR/N8R8hy3DaMTXpgAO0SXfuhOJLBHY8/ZGvRn09jeCYQYZyBchLJ4uD7hOsw19rHvAXDvXmP6qPjIEpMZw3fzFptin1ceJQKsABR2XJwE2QNxYK+3j8nhRJ4op9XGZEIPBWmTdswSA8MsJ17sjvDxBMchE8n+xm3fQicRLJOl6h8fYjKFyaGsG/eQ62ItXQp2fIUpT0dERwiy2zT96DwCXsH712WZz3CiglTbUz1d7ApW8zp7EPXcdw2p7ezodvEycgTlWe9hNVAuQ01K4H2G+AjYBFwbB8VbaNHpWdu83v/H8uz0bAojwLPRsP+E2AAhqiSHx1wtuQAAAAASUVORK5CYII=">';

                var hash = L.hash(map);

                //L.control.fullscreen().addTo(map);
                //L.control.attribution({position: 'bottomleft'}).setPrefix(image).addTo(map);
                map.scrollWheelZoom.disable();
                //map.minZoom = 10;
               

                // get url hash and set layers
                var urlHash = window.location.hash;
                var urlLayer = "congrDist";
                var urlLat = defLat,
                    urlLon = defLon;
                
                if (urlHash.indexOf('#') === 0) {
                    urlHash = urlHash.substr(1);
                }
                var args = urlHash.split("/");

                if (args.length == 4) {
                    urlLat = parseFloat(args[1]),
			        urlLon = parseFloat(args[2]);
                    urlLayer = args[3];
                }

                var urlTile = mapLayers[urlLayer + '_TL'],
                    urlGrid = mapLayers[urlLayer + '_GL'];

                this.activeLayerGroup = new L.LayerGroup();
                this.addLayers(map, urlTile, urlGrid);             
                
                hash.setLayer(urlLayer);

                $('.list-layerSwitch').find('.active').removeClass('active');
                $('#' + urlLayer).addClass('active');

                $('#content-main').find('.map-desc').addClass('hide');
                $('#desc-' + urlLayer).removeClass('hide');                

                // onclick for layerSwitch
                $('.list-layerSwitch').on('click', 'li', {
                    map: map, 
                    hash: hash,
                }, eRateMap.switchLayer);
            },
            addLayers: function (map, layer_TL, layer_GL) {
                eRateMap.activeLayerGroup.addLayer(layer_TL);
                eRateMap.activeLayerGroup.addLayer(layer_GL);      

                //eRateMap.activeLayerGroup.addLayer(congrDist_GC);
                eRateMap.activeLayerGroup.addTo(map);                
                L.mapbox.gridControl(layer_GL.on('mouseover', eRateMap.getMapData));
                                
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

                event.data.hash.setLayer(targetID);

                $('.list-layerSwitch').find('.active').removeClass('active');
                $('#' + targetID).addClass('active');

                // Show map description
                $('#content-main').find('.map-desc').addClass('hide');
                $(mapDesc).removeClass('hide');
            },
            getMapData: function (o) {                
                
                var data;

                function toTitleCase(str) {
                    str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });

                    return str;
                }

                if (o.data !== undefined) {
                    data = o.data;

                    // Populate stats
                    $('#stat-geography').text(data.GEOGRAPHY_);
                    $('#stat-geoID').text(data.GEOGRAP_01);
                    $('#stat-state').text(toTitleCase(data.STATE));
                    $('#stat-geoDesc').text(toTitleCase(data.GEOGRAP_02));
                    $('#stat-pctSchool').text(data.PCT_SCHOOL);
                    $('#stat-totSchools').text(data.TOTAL_SCHO);
                    $('#stat-fiber').text(data.WITH_FIBER);

                } else {
                    eRateMap.clearMapData();
                }
            },
            clearMapData: function () {
                $('#stat-state').text('--');
                $('.dl-stats').find('span').text('----');
            }
        };

    eRateMap.init();

} (jQuery));