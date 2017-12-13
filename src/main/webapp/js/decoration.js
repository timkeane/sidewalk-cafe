var finderDecorations = {
  html: function(){
    return $('<div class="info"></div>')
      .append(this.distanceHtml())
      .append(this.nameHtml())
      .append(this.addressHtml())
      .append(this.mapHtml())
      .append(this.directionsHtml());
  },
  distanceHtml: function(){
    var distance = this.get('distance');
    if (!(distance === undefined)){
      var div = $('<div class="distance"></div>');
      return div.html('&bull;<span> ' + (distance / 5280).toFixed(2) + ' mi </span>&bull;');
    }
  },
  nameHtml: function(){
    var div = $('<div class="name notranslate"></div>');
    return div.html(this.getName());
  },
  addressHtml: function(){
    var div = $('<div class="address notranslate"></div>');
    return div.append('<div>' + this.getAddr1() + '</div>')
      .append('<div>' + this.getAddr2() + '</div>');
  },
  mapHtml: function(){
    var a = $('<a class="map" data-role="button" onclick="nyc.finder.zoomTo(event);">Map</a>');
    return a.data('feature', this);
  },
  directionsHtml: function(){
    var a = $('<a class="directions" data-role="button" onclick="nyc.finder.directionsTo(event);">Directions</a>');
    return a.data('feature', this);
  },
  getAddress: function(){
    return this.getAddr1() + ', ' + this.getAddr2();
  },
  getAddr1: function(){
    return this.get('BUILDING') + ' ' +
      this.get('STREET');
  },
  getAddr2: function(){
    return this.get('CITY') + ', ' +
      this.get('STATE') + ' ' +
      this.get('ZIP');
  },
  getName: function(){
    var name = this.get('BUSINESS_NAME'), name2 = this.get('BUSINESS_NAME2');
    if (name2 && name2 != 'NULL'){
      name = name + '<br>' + name2;
    }
    return name;
  }
};
