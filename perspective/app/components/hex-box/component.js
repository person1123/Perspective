import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'figure',
  classNames: ['hexagon'],
  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, 'drawHexagon');
  },
  drawHexagon() {
    let el = this.$();
    let width = el.width();
    let height = width / Math.sqrt(3) * 2;
    let hexPath = hexagonPath(width/2, height/2, height/2 - 2);
    let hexStroke = hexagonLinesPath(width/2, height/2, height/2 - 2);

	let snap = new Snap('100%', '100%').attr({
	  'viewBox': '0 0 ' + width + ' ' + height 
	}).appendTo(el[0]);
    
	snap.path(hexPath).attr({
	  stroke: '#706666',
	  fill: '#f2f2f2',
	  'stroke-width': '1'
	});
    snap.path(hexStroke).attr({
        stroke: '#777',
        fill: "transparent",
        'stroke-width': '5px'
    });
    
    function hexagonPath(x ,y ,r) {
      var x1 = x;
      var y1 = y - r;
      var x2 = x + (Math.cos(Math.PI/6)*r);
      var y2 = y - (Math.sin(Math.PI/6)*r);
      var x3 = x + (Math.cos(Math.PI/6)*r);
      var y3 = y + (Math.sin(Math.PI/6)*r);
      var x4 = x;
      var y4 = y + r;
      var x5 = x - (Math.cos(Math.PI/6)*r);
      var y5 = y + (Math.sin(Math.PI/6)*r);
      var x6 = x - (Math.cos(Math.PI/6)*r);
      var y6 = y - (Math.sin(Math.PI/6)*r);
      
      var path =
			'M' + x1 + ' ' + y1 + ' L' +
			x2 + ' ' + y2 + ' L' + x3 +
			' ' + y3 + ' L' + x4 + ' ' +
			y4 + ' L' + x5 + ' ' + y5 +
			' L' + x6 + ' ' + y6 + 'z';
      return path;
    }
      
    function hexagonLinesPath(x, y, r) {
      var x2 = x + (Math.cos(Math.PI/6)*r);
      var y2 = y - (Math.sin(Math.PI/6)*r);
      var x3 = x + (Math.cos(Math.PI/6)*r);
      var y3 = y + (Math.sin(Math.PI/6)*r);
      var x4 = x;
      var y4 = y + r;
      
      var path ='M' + x2 + ' ' + y2 + ' L' +
          x3 + ' ' + y3 + ' L' + x4 + ' ' +
          y4;
      return path;
      }
  }
});



