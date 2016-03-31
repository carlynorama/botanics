var r = new Rune({
  container: "#canvas",
  width: 400,
  height: 400,
  debug: true
});

var voronoi = new Voronoi();
var bbox = {xl: 0, xr: 400, yt: 0, yb: 400}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
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
for(var c = 1; c < 10; c++) {
  sitesOnSpiral(0, r.width/2, r.height/2, 30*c, (Math.PI/12), (Math.PI/36)*c);
}

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

     //  r.circle(originX, originY, radius)
     //    .fill(false)
     //    .stroke(100,100,100)

     var n = (2*Math.PI)/radians;

     for(var i = 0; i < n; i++) {
         var myTheta = theta*i + twist;
         tempy = Math.sin(myTheta)*R;
         tempx = Math.cos(myTheta)*R;
         tempx += originX;
         tempy += originY;
         sites.push({x:tempx, y:tempy});
     }

    //Since the whole circle is 2 * PI radians, circle center
    //is at (0, 0) and suppose you have n dots, you have to
    //place the i'th dot on coordinate x = R * cos(i * 2 * PI / n)
    //and y = R * sin(i * 2 * PI / n) for i = 0..n-1 where R is the
    //radius of current circle.



     diagram = voronoi.compute(sites, bbox);
   }

r.draw();
