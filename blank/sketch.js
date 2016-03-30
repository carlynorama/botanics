var r = new Rune({
  container: "#canvas",
  width: 800,
  height: 800,
  debug: true
});

var voronoi = new Voronoi();
var bbox = {xl: 0, xr: 800, yt: 0, yb: 800}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
var sites = [ {x: 200, y: 200}, {x: 50, y: 250}, {x: 300, y: 100} /* , ... */ ];
var margin = 13;
var diagram = voronoi.compute(sites, bbox);
randomSites(30,1);

  for (slocs of sites) {
   //console.log(slocs);
   r.ellipse(slocs.x, slocs.y, 5, 5)
     .fill(0, 0, 255)
     .stroke(false)// logs "3", "5", "7"
  }

  // for (clocs in diagram.vertex) {
  //   console.log(clocs);
  // }
    var edges = diagram.edges;
    var nEdges = edges.length;
    var s,e;
    if (nEdges) {
      console.log("Edges found.");
     	var edge;
     			while (nEdges--) {
     				edge = edges[nEdges];
     				s = edge.va;
     				e = edge.vb;
            r.line(s.x,s.y,e.x,e.y);

     			}
  }

  function randomSites(n,clear) {
  		if (clear) {sites = [];}
  		var xo = margin;
  		var dx = r.width-margin*2;
  		var yo = margin;
  		var dy = r.height-margin*2;
  		for (var i=0; i<n; i++) {
  			sites.push({x:self.Math.round(xo+self.Math.random()*dx),y:self.Math.round(yo+self.Math.random()*dy)});
  			}
  		diagram = voronoi.compute(sites, bbox);
  }

r.draw();



// var voronoi = new Voronoi();
// var bbox = {xl: 0, xr: 600, yt: 0, yb: 400}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
// var sites = [ {x: 200, y: 200}, {x: 50, y: 250}, {x: 300, y: 100} /* , ... */ ];
// var margin = 13;
// var diagram = voronoi.compute(sites, bbox);
//
// function setup() {
//   var myCanvas = createCanvas(600, 400);
//   myCanvas.parent('myContainer');
//   randomSites(40,1);
//   background(100);
//
//   for (slocs of sites) {
//    //console.log(slocs);
//    ellipse(slocs.x, slocs.y, 5, 5)// logs "3", "5", "7"
//   }
//
//   for (clocs in diagram.vertex) {
//     console.log(clocs);
//   }
//
//   var edges = diagram.edges;
//   var nEdges = edges.length;
//   var s,e;
//   if (nEdges) {
//     console.log("Edges found.");
//   	var edge;
//   			while (nEdges--) {
//   				edge = edges[nEdges];
//   				s = edge.va;
//   				e = edge.vb;
//   				line(s.x,s.y,e.x,e.y);
//   				}
//   			}
// }
//
// function draw() {
//   //ellipse(x, height/2, 20, 20);
//   //x = x + 1;
// }
//
// function randomSites(n,clear) {
// 		if (clear) {sites = [];}
// 		var xo = margin;
// 		var dx = width-margin*2;
// 		var yo = margin;
// 		var dy = height-margin*2;
// 		for (var i=0; i<n; i++) {
// 			sites.push({x:self.Math.round(xo+self.Math.random()*dx),y:self.Math.round(yo+self.Math.random()*dy)});
// 			}
// 		diagram = voronoi.compute(sites, bbox);
// }


// var VoronoiDemo = {
// 	voronoi: new Voronoi(),
// 	sites: [],
// 	diagram: null,
// 	margin: 100,
// 	canvas: null,
// 	bbox: {xl:0,xr:800,yt:0,yb:600},
//
// 	normalizeEventCoords: function(target,e) {
// 		// http://www.quirksmode.org/js/events_properties.html#position
// 		// =====
// 		if (!e) {e=self.event;}
// 		var x = 0;
// 		var y = 0;
// 		if (e.pageX || e.pageY) {
// 			x = e.pageX;
// 			y = e.pageY;
// 			}
// 		else if (e.clientX || e.clientY) {
// 			x = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
// 			y = e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
// 			}
// 		// =====
// 		return {x:x-target.offsetLeft,y:y-target.offsetTop};
// 		},
//
// 	init: function() {
// 		var me = this;
// 		this.canvas = myCanvas;
// 		this.canvas.onmousemove = function(e) {
// 			if (!me.sites.length) {return;}
// 			var site = me.sites[0];
// 			var mouse = me.normalizeEventCoords(me.canvas,e);
// 			site.x = mouse.x;
// 			site.y = mouse.y;
// 			me.diagram = me.voronoi.compute(me.sites,me.bbox);
// 			me.render();
// 			};
// 		this.canvas.onclick = function(e) {
// 			var mouse = me.normalizeEventCoords(me.canvas,e);
// 			me.addSite(mouse.x,mouse.y);
// 			me.render();
// 			};
// 		this.randomSites(10,true);
// 		this.render();
// 		},
//
// 	clearSites: function() {
// 		// we want at least one site, the one tracking the mouse
// 		this.sites = [{x:0,y:0}];
// 		this.diagram = this.voronoi.compute(this.sites, this.bbox);
// 		},
//
// 	randomSites: function(n,clear) {
// 		if (clear) {this.sites = [];}
// 		var xo = this.margin;
// 		var dx = this.canvas.width-this.margin*2;
// 		var yo = this.margin;
// 		var dy = this.canvas.height-this.margin*2;
// 		for (var i=0; i<n; i++) {
// 			this.sites.push({x:self.Math.round(xo+self.Math.random()*dx),y:self.Math.round(yo+self.Math.random()*dy)});
// 			}
// 		this.diagram = this.voronoi.compute(this.sites, this.bbox);
// 		},
//
// 	addSite: function(x,y) {
// 		this.sites.push({x:x,y:y});
// 		this.diagram = this.voronoi.compute(this.sites, this.bbox);
// 		},
//
// 	render: function() {
// 		var ctx = this.canvas.getContext('2d');
// 		// background
// 		ctx.globalAlpha = 1;
// 		ctx.beginPath();
// 		ctx.rect(0,0,this.canvas.width,this.canvas.height);
// 		ctx.fillStyle = '#fff';
// 		ctx.fill();
// 		ctx.strokeStyle = '#888';
// 		ctx.stroke();
// 		// voronoi
// 		if (!this.diagram) {return;}
// 		ctx.strokeStyle='#000';
// 		// edges
// 		var edges = this.diagram.edges,
// 			nEdges = edges.length,
// 			v;
// 		if (nEdges) {
// 			var edge;
// 			ctx.beginPath();
// 			while (nEdges--) {
// 				edge = edges[nEdges];
// 				v = edge.va;
// 				ctx.moveTo(v.x,v.y);
// 				v = edge.vb;
// 				ctx.lineTo(v.x,v.y);
// 				}
// 			ctx.stroke();
// 			}
// 		// how many sites do we have?
// 		var sites = this.sites,
// 			nSites = sites.length;
// 		if (!nSites) {return;}
// 		// highlight cell under mouse
// 		var cell = this.diagram.cells[this.sites[0].voronoiId];
// 		// there is no guarantee a Voronoi cell will exist for any
// 		// particular site
// 		if (cell) {
// 			var halfedges = cell.halfedges,
// 				nHalfedges = halfedges.length;
// 			if (nHalfedges > 2) {
// 				v = halfedges[0].getStartpoint();
// 				ctx.beginPath();
// 				ctx.moveTo(v.x,v.y);
// 				for (var iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
// 					v = halfedges[iHalfedge].getEndpoint();
// 					ctx.lineTo(v.x,v.y);
// 					}
// 				ctx.fillStyle = '#faa';
// 				ctx.fill();
// 				}
// 			}
// 		// draw sites
// 		var site;
// 		ctx.beginPath();
// 		ctx.fillStyle = '#44f';
// 		while (nSites--) {
// 			site = sites[nSites];
// 			ctx.rect(site.x-2/3,site.y-2/3,2,2);
// 			}
// 		ctx.fill();
// 		},
// 	};
