var r = new Rune({
  container: "#canvas",
  width: 1100,
  height: 1400,
  debug: true
});

var voronoi = new Voronoi();
var bbox = {xl: 0, xr: 1100, yt: 0, yb: 1400}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
var sites = [ {x: 20, y: 200}, {x: 50, y: 250}, {x: 300, y: 100} /* , ... */ ];
var margin = 13;
var diagram = voronoi.compute(sites, bbox);

//2 at the top
//23 rows ish unitll bottom collar
//8 ish rows in bottom collar
// around 6 accross until very end
// everything gets bigger as it goes up
sites = [];
//circles
//  for(var c = 1; c < 10; c++) {
//    sitesOnCircle(0, r.width/2, r.height/2, 25*c, (Math.PI/12));
// }
//spiral

//http://mathworld.wolfram.com/LogarithmicSpiral.html
//https://en.wikipedia.org/wiki/Archimedean_spiral
  sitesOnSpiral(0, r.width/4, 3*r.height/4, 60, (Math.PI/5.2), (Math.PI/72));


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

   function sitesOnCircle(clear, originX, originY, radius, radians) {
     if (clear) {sites = [];}
     //sites.push({x:originX, y:originY});

     var theta = radians;
     var R = radius;

    //  r.circle(originX, originY, radius)
    //    .fill(false)
    //    .stroke(100,100,100)

    var n = (2*Math.PI)/radians;

    for(var i = 0; i < n; i++) {
        tempy = Math.sin(theta*i)*R;
        tempx = Math.cos(theta*i)*R;
        tempx += originX;
        tempy += originY;
        sites.push({x:tempx, y:tempy});
    }
    diagram = voronoi.compute(sites, bbox);
  }

    function sitesOnSpiral(clear, originX, originY, radius, radians, twist) {
      if (clear) {sites = [];}
      //sites.push({x:originX, y:originY});

      var theta = radians;
      var R = radius;
      var localfuzz = 10;
      var maxRadius = r.width*75;

     //  r.circle(originX, originY, radius)
     //    .fill(false)
     //    .stroke(100,100,100)

     var n = (2*Math.PI)/radians;
     var sR = R;
     var i = 0;
     while (sR < maxRadius) {
       var myTheta = theta*i;
       var sR = R * Math.sin(twist)*i;
       tempy = Math.sin(myTheta)*sR;
       tempx = Math.cos(myTheta)*sR;
       tempx += originX+ Rune.random(localfuzz);
       tempy += originY + Rune.random(localfuzz);

       sites.push({x:tempx, y:tempy});
       i++;
     }

    //Since the whole circle is 2 * PI radians, circle center
    //is at (0, 0) and suppose you have n dots, you have to
    //place the i'th dot on coordinate x = R * cos(i * 2 * PI / n)
    //and y = R * sin(i * 2 * PI / n) for i = 0..n-1 where R is the
    //radius of current circle.



     diagram = voronoi.compute(sites, bbox);
   }

r.draw();
