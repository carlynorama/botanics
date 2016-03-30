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

//randomSites(30,1);
var base = 40;
//gridSites(base, base * 7 /8, base/2);
//gridSites(base, base/2, 0);
//taperGridSites(base, 1.3, 1/2, 3/5);
taperGridSitesWithFuzz(base, 1.3, 1/2, 0, 5);
//taperGridSitesWithFuzz(base, base * 7 /8, base/2, 3/5, 5);

  for (slocs of sites) {
   //console.log(slocs);
   r.ellipse(slocs.x, slocs.y, 5, 5)
     .fill(0, 0, 255)
     .stroke(false)
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


   function gridSites(base, ratio, hoffset) {
     taperGridSites(base,ratio, hoffset, 0);
   }

   function taperGridSites(base, ratio, hoffset, vtaper) {

     taperGridSitesWithFuzz(base, ratio, hoffset, vtaper, 0);
   }

   function taperGridSitesWithFuzz(base, ratio, hoffset, vtaper, fuzz) {

     var xlocation, ylocation;
     var xspace = base;
     var yspace = base*ratio;
     var rowoffset = hoffset;
     var voffset = vtaper;

     sites = [];

      for(var j = 0; j < (r.height/yspace)+2; j++) {
        var rowspacing = xspace-j*voffset;
        var colspacing = yspace-j*voffset;
        for(var i = 0; i < 50; i++) {
         xlocation = i*(rowspacing) + Rune.random(fuzz);
         ylocation = j*(colspacing) + Rune.random(fuzz);
         //console.log(xlocation);
         //console.log(ylocation);
         if (j%2==0) {
           xlocation +=(rowspacing*rowoffset);
         }
         sites.push({x:xlocation, y:ylocation});
        }
      }
     diagram = voronoi.compute(sites, bbox);
   }

r.draw();
