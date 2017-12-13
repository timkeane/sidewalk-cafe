var finderStyle = function(feature, resolution){
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  if (!finderStyle.cache[zoom]){
    var radius = zoom * .75, stroke = 1;
    finderStyle.cache[zoom] = new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        fill: new ol.style.Fill({
          color: '#1259a7'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: stroke
        })
      })
    });
  }
  return finderStyle.cache[zoom];
};

finderStyle.cache = {};

var zoningStyle; //TODO
