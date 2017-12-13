nyc.zoning = {
  URL: 'http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nysidewalkcafe/FeatureServer/0/query/?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100&geometry=',
  format: new ol.format.EsriJSON(),
  source: function(){
    nyc.zoning.source = new ol.source.Vector({
      loader: nyc.zoning.loader,
      strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({tileSize: 512})),
      style: zoningStyle
    });
    return nyc.zoning.source;
  },
  layer: function(){
    return new ol.layer.Vector({
      source: nyc.zoning.source(),
      maxResolution: nyc.ol.TILE_GRID.getResolution(13)
    });
  },
  loader: function(extent, resolution, projection){
    var bbox = {
      xmin: extent[0],
      ymin: extent[1],
      xmax: extent[2],
      ymax: extent[3],
      spatialReference:{wkid: 102100}
    };
    $.ajax({
      url: nyc.zoning.URL + encodeURIComponent(JSON.stringify(bbox)),
      dataType: 'jsonp',
      success: function(response){
        if (response.error){
          console.console(response.error.message, response.error.details);
        }else{
          var features = nyc.zoning.format.readFeatures(response, {featureProjection: projection});
          if (features.length > 0){
            nyc.zoning.source.addFeatures(features);
          }
        }
      }
    });
  }
};
