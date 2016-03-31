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

//2 at the top
//23 rows ish unitll bottom collar
//8 ish rows in bottom collar
// around 6 accross until very end
// everything gets bigger as it goes up

monsteraDeliciosaFruitSites2(2.5, 10);
//monsteraDeliciosaFruitSites2(2, 10);

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

   function monsteraDeliciosaFruitSites2(base, fuzz) {

     var aspectratio = 1.9
     var xlocation, ylocation;
     var xspace = base*12;
     var yspace = xspace * aspectratio;
     var rowoffset = 0.5;
     var voffset = 1/9;
     var localfuzz = fuzz;

     //2 at the top
     //23 rows ish unitll bottom collar
     //8 ish rows in bottom collar
     // around 6 accross until very end
     // everything gets bigger as it goes up

     var cellswide = 30;
     var cellshigh = 32;
     var topexpansionslope = 1;//cellswide/8;
     var vmidline = 0.5 * cellswide;
     var hmidline = 0.5 * cellshigh;
     var midX = r.width/2;
     var inflect = 0.75*cellshigh;
     var  yspacing, xspacing;
     var flip;

     sites = [];

      for(var j = 1; j < cellshigh+1; j++) {
        flip=(cellshigh-j);
        //yspacing = ~~(Math.pow(flip,2)/5);
        yspacing = yspace-(j*voffset);
        //yspacing = yspace-(j/10);//+((cellshigh-j)*0.2)-(1/(10*j));

        //console.log(yspacing);
        //cellsthisrow = cellswide;
        cellsthisrow = Math.min(j*topexpansionslope, cellswide);
        for(var i = 0; i < cellsthisrow; i++) {
          var offcenterdistance = ~~(i-(cellsthisrow/2));
          //console.log(offcenterdistance);
          var scalar = (inflect-j)*aspectratio;
          console.log(scalar);
          xspacing = xspace + scalar;
          //xspacing = yspace-(j*voffset);
          //var  yspacing = yspace-(j*voffset);//yspace-(j/10);//+((cellshigh-j)*0.2)-(1/(10*j));

          xlocation = midX;
          if (j%2==0) {
            xlocation +=(xspacing*rowoffset);
          }

          xlocation += offcenterdistance*(xspacing)+ Rune.random(localfuzz);
          ylocation = j*(yspacing)+Rune.random(localfuzz);
          sites.push({x:xlocation, y:ylocation});
       }
      }
     diagram = voronoi.compute(sites, bbox);
   }

r.draw();
