var r = new Rune({
  container: "#canvas",
  width: 800,
  height: 2000,
  debug: true
});

var voronoi = new Voronoi();
var bbox = {xl: 0, xr: 800, yt: 0, yb: 2000}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
var sites = [ {x: 200, y: 200}, {x: 50, y: 250}, {x: 300, y: 100} /* , ... */ ];
var margin = 13;
var diagram = voronoi.compute(sites, bbox);

monsteraDeliciosaFruitSites(60, 10);

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


   function monsteraDeliciosaFruitSites(base, fuzz) {

     var xlocation, ylocation;
     var xspace = base;
     var yspace = base * 9/10;
     var xoffset = base/2;
     var voffset = 0.9;
     var localfuzz = fuzz;

     var cellswide = 6;
     var cellshigh = ((r.height/yspace)+2);

     var vmidline = 0.5 * cellswide;
     var hmidline = 0.5 * cellshigh;

     sites = [];
     for(var i = 0; i < cellswide; i++) {
      for(var j = 0; j < cellshigh; j++) {
         xlocation = i*(xspace-j*voffset) + Rune.random(localfuzz);
         ylocation = j*(yspace-j*voffset) + Rune.random(localfuzz);
         //console.log(xlocation);
         //console.log(ylocation);
         if (j%2==0) {
           xlocation +=xoffset;
         }
         sites.push({x:xlocation, y:ylocation});
        }
      }
     diagram = voronoi.compute(sites, bbox);
   }

r.draw();
