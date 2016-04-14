angular.module('MyApp', [])
  .controller('driversController', function($scope, $document, $element) {
    $scope.svg_width = "";
    $scope.svg_height = "";
    var heightList = [];
    $scope.isTrue = false;
    //$scope.lineList = [{x1:'266.5',x2:'911.5',y1:'130',y2:'167.5'},{x1:'266.5',x2:'911.5',y1:'130',y2:'167.5'}];
    var lineList = [{}];
    $scope.names = ['round1','round2'];
    $scope.rounds = [                    {
                        matches:[{id:'match1_round1'},{id:'match2_round1'},{id:'match3_round1'},{id:'match4_round1'},{id:'match5_round1'},{id:'match6_round1'},{id:'match7_round1'},{id:'match8_round1'},{id:'match9_round1'},{id:'match10_round1'},{id:'match11_round1'},{id:'match12_round1'},{id:'match13_round1'},{id:'match14_round1'},{id:'match15_round1'},{id:'match16_round1'},{id:'match17_round1'},{id:'match18_round1'},{id:'match19_round1'},{id:'match20_round1'},{id:'match21_round1'},{id:'match22_round1'},{id:'match23_round1'},{id:'match24_round1'},{id:'match25_round1'},{id:'match26_round1'},{id:'match27_round1'},{id:'match28_round1'},{id:'match29_round1'},{id:'match30_round1'},{id:'match31_round1'},{id:'match32_round1'}], round_id:"1"
                    },{
                        matches:[{id:'match1_round2'},{id:'match2_round2'},{id:'match3_round2'},{id:'match4_round2'},{id:'match5_round2'},{id:'match6_round2'},{id:'match7_round2'},{id:'match8_round2'},{id:'match9_round2'},{id:'match10_round2'},{id:'match11_round2'},{id:'match12_round2'},{id:'match13_round2'},{id:'match14_round2'},{id:'match15_round2'},{id:'match16_round2'}], round_id:"2"
                    },{
                        matches:[{id:'match1_round3'},{id:'match2_round3'},{id:'match3_round3'},{id:'match4_round3'},{id:'match5_round3'},{id:'match6_round3'},{id:'match7_round3'},{id:'match8_round3'}], round_id:"3"
                    },{
                        matches:[{id:'match1_round4'},{id:'match2_round4'},{id:'match3_round4'},{id:'match4_round4'}], round_id:"4"
                    },{
                        matches:[{id:'match1_round5'},{id:'match2_round5'}], round_id:"5"
                    },{
                        matches:[{id:'match1_round6'}], round_id:"6"
                    }];
    console.log($scope.rounds[0]['matches']);
    console.log($scope.rounds.length);

    var svgContainer = d3.select("#svg_container");
    var nextList = [];
    var levelAddX = 50;
    var spaceBtn1X = 40;
    var spaceBtn2X = 50;
    var elementWidth = 140;
    var elementHeight = 40;

    //This is the accessor function we talked about above
    var lineFunction = d3.svg.line()
                          .x(function(d) { return d.x; })
                          .y(function(d) { return d.y; })
                          .interpolate("linear");
                          
    for(var x=0; x<$scope.rounds.length;x++)
    {
      if(x==0)
      {
        var levelAddY = 50;
        levelAddY = levelAddY+x*(40);
        for(var i=0;i<$scope.rounds[x]['matches'].length;i++)
        {
          //Make an SVG Container
          
          //Draw the Rectangle
          var rectangle = svgContainer.append("rect")
                          .attr("id", $scope.rounds[x]['matches'][i]['id'])
                          .attr("x", levelAddX)
                          .attr("y", levelAddY)
                          .attr("rx", 10)
                          .attr("ry", 10)
                          .attr("width", elementWidth)
                          .attr("height", elementHeight)
                          .attr("style","fill:white;stroke:black;stroke-width:2");
          var text = svgContainer.append('text').text($scope.rounds[x]['matches'][i]['id'])
                    .attr('x', levelAddX+5)
                    .attr('y', levelAddY+20)
                    .attr('fill', 'black');
    
          //The data for our line
          var lineData1 = [ { "x": levelAddX+140,   "y": levelAddY+19},  { "x": levelAddX+169,  "y": levelAddY+19},
                           { "x": levelAddX+169,  "y": levelAddY+19+spaceBtn1X},{ "x": levelAddX+200,  "y": levelAddY+19+spaceBtn1X}];
          var lineData2 = [ { "x": levelAddX+140,   "y": levelAddY+19},  { "x": levelAddX+169,  "y": levelAddY+19},
                           { "x": levelAddX+169,  "y": levelAddY+19-spaceBtn1X}];



          if(i%2!=0&&$scope.rounds[x]['matches'].length>=2)
          {
            levelAddY = levelAddY+(x+1)*(elementHeight+spaceBtn1X+spaceBtn2X)+x*spaceBtn2X;
            var lineGraph = svgContainer.append("path")
                          .attr("d", lineFunction(lineData2))
                          .attr("stroke", "black")
                          .attr("stroke-width", 2)
                          .attr("fill", "none");
          }
          else if(i%2==0&&$scope.rounds[x]['matches'].length>=2)
          {
            levelAddY = levelAddY+(x+1)*(elementHeight+spaceBtn1X)+x*spaceBtn2X;
            nextList.push(levelAddY-spaceBtn1X);
            var lineGraph = svgContainer.append("path")
                          .attr("d", lineFunction(lineData1))
                          .attr("stroke", "black")
                          .attr("stroke-width", 2)
                          .attr("fill", "none");
          }
          
        }
        levelAddX = levelAddX + 200;
      }
      else{
       var tempList = [];

        for (var j = 0; j < nextList.length; j++) {
          if(nextList.length>=2){
            spaceBtn1X = (nextList[1]-nextList[0])/2;
            var rectangle = svgContainer.append("rect")
                            .attr("id", $scope.rounds[x]['matches'][j]['id'])
                            .attr("x", levelAddX)
                            .attr("y", nextList[j])
                            .attr("rx", 10)
                            .attr("ry", 10)
                            .attr("width", elementWidth)
                            .attr("height", elementHeight)
                            .attr("style","fill:white;stroke:black;stroke-width:2");
            var text = svgContainer.append('text').text($scope.rounds[x]['matches'][j]['id'])
                      .attr('x', levelAddX+5)
                      .attr('y', nextList[j]+20)
                      .attr('fill', 'black');

           if((j+1)%2==0)
            {   
              var lineData2 = [ { "x": levelAddX+140,   "y": nextList[j]+19},  { "x": levelAddX+169,  "y": nextList[j]+19},
                           { "x": levelAddX+169,  "y": nextList[j]+19-spaceBtn1X}]; 
              var lineGraph = svgContainer.append("path")
                            .attr("d", lineFunction(lineData2))
                            .attr("stroke", "black")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");        

              tempList.push((nextList[j]+nextList[j-1])/2);
            }
            else{
              var lineData1 = [ { "x": levelAddX+140,   "y": nextList[j]+19},  { "x": levelAddX+169,  "y": nextList[j]+19},
                           { "x": levelAddX+169,  "y": nextList[j]+19+spaceBtn1X},{ "x": levelAddX+200,  "y": nextList[j]+19+spaceBtn1X}];
              var lineGraph = svgContainer.append("path")
                            .attr("d", lineFunction(lineData1))
                            .attr("stroke", "black")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");
            }
            console.log(nextList[j]);
          }
          else{

            var rectangle = svgContainer.append("rect")
                            .attr("id", $scope.rounds[x]['matches'][j]['id'])
                            .attr("x", levelAddX)
                            .attr("y", nextList[j])
                            .attr("rx", 10)
                            .attr("ry", 10)
                            .attr("width", elementWidth)
                            .attr("height", elementHeight)
                            .attr("style","fill:white;stroke:black;stroke-width:2");
            var text = svgContainer.append('text').text($scope.rounds[x]['matches'][j]['id'])
                      .attr('x', levelAddX+5)
                      .attr('y', nextList[j]+20)
                      .attr('fill', 'black');

          }
        }

        nextList = tempList;
        
        levelAddX = levelAddX + 200;
      }
    }
});