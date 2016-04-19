angular.module('MyApp', [])
  .controller('driversController', function($scope, $document, $element) {
    $scope.rounds = [{
                        players:[{id:'player1_round1'},{id:'player2_round1'},{id:'player3_round1'},{id:'player4_round1'},{id:'player5_round1'},{id:'player6_round1'},{id:'player7_round1'},{id:'player8_round1'},{id:'player9_round1'},{id:'player10_round1'},{id:'player11_round1'},{id:'player12_round1'},{id:'player13_round1'},{id:'player14_round1'},{id:'player15_round1'},{id:'player16_round1'},{id:'player17_round1'},{id:'player18_round1'},{id:'player19_round1'},{id:'player20_round1'},{id:'player21_round1'},{id:'player22_round1'},{id:'player23_round1'},{id:'player24_round1'},{id:'player25_round1'},{id:'player26_round1'},{id:'player27_round1'},{id:'player28_round1'},{id:'player29_round1'},{id:'player30_round1'},{id:'player31_round1'},{id:'player32_round1'}], round_id:"1"
                    },{
                        players:[{id:'player1_round2'},{id:'player2_round2'},{id:'player3_round2'},{id:'player4_round2'},{id:'player5_round2'},{id:'player6_round2'},{id:'player7_round2'},{id:'player8_round2'},{id:'player9_round2'},{id:'player10_round2'},{id:'player11_round2'},{id:'player12_round2'},{id:'player13_round2'},{id:'player14_round2'},{id:'player15_round2'},{id:'player16_round2'}], round_id:"2"
                    },{
                        players:[{id:'player1_round3'},{id:'player2_round3'},{id:'player3_round3'},{id:'player4_round3'},{id:'player5_round3'},{id:'player6_round3'},{id:'player7_round3'},{id:'player8_round3'}], round_id:"3"
                    },{
                        players:[{id:'player1_round4'},{id:'player2_round4'},{id:'player3_round4'},{id:'player4_round4'}], round_id:"4"
                    },{
                        players:[{id:'player1_round5'},{id:'player2_round5'}], round_id:"5"
                    },{
                        players:[{id:'player1_round6'}], round_id:"6"
                    }];
    $scope.svg_width = $scope.rounds.length;
    $scope.svg_height = "";
    //console.log($scope.rounds[0]['players']);
    //console.log($scope.rounds.length);

    var svgContainer = d3.select("#svg_container");
    var nextList = [];
    var levelAddX = 50;//Initial value of the plotter along X-axis
    var levelAddYinit = 50;//Initial value of the plotter along Y-axis
    var spaceBtn1Y = 40;//Space between to elements in a match of the first round
    var spaceBtn2Y = 50;//Space between to adjacent elements of different matches of the first round
    var elementWidth = 140;
    var elementHeight = 40;
    var nextroundMarginX = 200;
    var halfelementheight = 19;//This should be half of elementHeight - 2; 2 pixels is the width of line to next element
    var line1X = 140;
    var line2X = 169;

    //This is the function which gives a series of path descriptions to the SVG container 
    //- refer "https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d" to understand how this works
    var lineFunction = d3.svg.line()
                          .x(function(d) { return d.x; })
                          .y(function(d) { return d.y; })
                          .interpolate("linear");
                          
    //Outer loop to iterate over the rounds
    for(var x=0; x<$scope.rounds.length;x++)
    {
      //Plotting the first round
      //We have different blocks of code for the first round and rest of the rounds because 
      //rest of the rounds need not only the player's list but also the co-ordinates with the respect
      //to the previous rounds.
      //The first round is simpler and needs only the player list.
      if(x==0)
      {
        //Initializing to 50 on every loop
        var levelAddY = levelAddYinit;

        //Inner loop to iterate over the players
        for(var i=0;i<$scope.rounds[x]['players'].length;i++)
        {
          //Makeing an SVG Container
          //Drawing the Rectangles one for every player in a round
          var rectangle = svgContainer.append("rect")
                          .attr("id", $scope.rounds[x]['players'][i]['id'])
                          .attr("x", levelAddX)
                          .attr("y", levelAddY)
                          .attr("rx", 10)
                          .attr("ry", 10)
                          .attr("width", elementWidth)
                          .attr("height", elementHeight)
                          .attr("style","fill:white;stroke:black;stroke-width:2");

          //Filling text in the box, the text is usually the player's name/id           
          var text = svgContainer.append('text').text($scope.rounds[x]['players'][i]['id'])
                    .attr('x', levelAddX+5)
                    .attr('y', levelAddY+20)
                    .attr('fill', 'black');
    
          //The co-ordinates to plot the lines
          var lineData1 = [ { "x": levelAddX+line1X,   "y": levelAddY+halfelementheight},  { "x": levelAddX+line2X,  "y": levelAddY+halfelementheight},
                           { "x": levelAddX+line2X,  "y": levelAddY+halfelementheight+spaceBtn1Y},{ "x": levelAddX+nextroundMarginX,  "y": levelAddY+halfelementheight+spaceBtn1Y}];
          var lineData2 = [ { "x": levelAddX+line1X,   "y": levelAddY+halfelementheight},  { "x": levelAddX+line2X,  "y": levelAddY+halfelementheight},
                           { "x": levelAddX+line2X,  "y": levelAddY+halfelementheight-spaceBtn1Y}];


          //Plotting lines from an odd numbered box to the next box of next round
          //Like this 
          //   _____________    
          //  | Odd numbered|____
          //  |____box______|    |    ______________
          //                     |____|             |
          //                          |_____________|
          //
          //
          if(i%2!=0&&$scope.rounds[x]['players'].length>=2)
          {
            levelAddY = levelAddY+(x+1)*(elementHeight+spaceBtn1Y+spaceBtn2Y)+x*spaceBtn2Y;
            var lineGraph = svgContainer.append("path")
                          .attr("d", lineFunction(lineData2))
                          .attr("stroke", "black")
                          .attr("stroke-width", 2)
                          .attr("fill", "none");
            console.log(lineFunction(lineData2));
          }
          //Plotting lines from an even numbered box to the next box of next round
          //Like this                  ____________
          //                      ____|            |
          //   _____________     |    |____________|
          //  |Even numbered|____|
          //  |____box______|    
          //
          else if(i%2==0&&$scope.rounds[x]['players'].length>=2)
          {
            levelAddY = levelAddY+(x+1)*(elementHeight+spaceBtn1Y)+x*spaceBtn2Y;
            nextList.push(levelAddY-spaceBtn1Y);
            var lineGraph = svgContainer.append("path")
                          .attr("d", lineFunction(lineData1))
                          .attr("stroke", "black")
                          .attr("stroke-width", 2)
                          .attr("fill", "none");
          }
          
        }
        //Adding 200 pixels to the to plot the elements in the next round
        levelAddX = levelAddX + nextroundMarginX;
      }

      //All except the first round
      else{
        var tempList = [];
        //Iterating over the player's list
        for (var j = 0; j < nextList.length; j++) {

          //Next list contains the co-ordincates to plot lines
          if(nextList.length>=2){
            spaceBtn1Y = (nextList[1]-nextList[0])/2;
            var rectangle = svgContainer.append("rect")
                            .attr("id", $scope.rounds[x]['players'][j]['id'])
                            .attr("x", levelAddX)
                            .attr("y", nextList[j])
                            .attr("rx", 10)
                            .attr("ry", 10)
                            .attr("width", elementWidth)
                            .attr("height", elementHeight)
                            .attr("style","fill:white;stroke:black;stroke-width:2");
            var text = svgContainer.append('text').text($scope.rounds[x]['players'][j]['id'])
                      .attr('x', levelAddX+5)
                      .attr('y', nextList[j]+20)
                      .attr('fill', 'black');

          //Plotting lines from an even numbered box to the next box of next round
          //Like this                  ____________
          //                      ____|            |
          //   _____________     |    |____________|
          //  |Even numbered|____|
          //  |____box______|    
          //
           if((j+1)%2==0)
            {   
              var lineData2 = [ { "x": levelAddX+line1X,   "y": nextList[j]+halfelementheight},  { "x": levelAddX+line2X,  "y": nextList[j]+halfelementheight},
                           { "x": levelAddX+line2X,  "y": nextList[j]+halfelementheight-spaceBtn1Y}]; 
              var lineGraph = svgContainer.append("path")
                            .attr("d", lineFunction(lineData2))
                            .attr("stroke", "black")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");        

              tempList.push((nextList[j]+nextList[j-1])/2);
            }
          //Plotting lines from an odd numbered box to the next box of next round
          //Like this 
          //   _____________    
          //  | Odd numbered|____
          //  |____box______|    |    ______________
          //                     |____|             |
          //                          |_____________|
          //
          //
            else{
              var lineData1 = [ { "x": levelAddX+line1X,   "y": nextList[j]+halfelementheight},  { "x": levelAddX+line2X,  "y": nextList[j]+halfelementheight},
                           { "x": levelAddX+line2X,  "y": nextList[j]+halfelementheight+spaceBtn1Y},{ "x": levelAddX+nextroundMarginX,  "y": nextList[j]+halfelementheight+spaceBtn1Y}];
              var lineGraph = svgContainer.append("path")
                            .attr("d", lineFunction(lineData1))
                            .attr("stroke", "black")
                            .attr("stroke-width", 2)
                            .attr("fill", "none");
            }
          }

          //If nextlist has only one player(winner) then there is no need to plot the lines
          else{

            var rectangle = svgContainer.append("rect")
                            .attr("id", $scope.rounds[x]['players'][j]['id'])
                            .attr("x", levelAddX)
                            .attr("y", nextList[j])
                            .attr("rx", 10)
                            .attr("ry", 10)
                            .attr("width", elementWidth)
                            .attr("height", elementHeight)
                            .attr("style","fill:white;stroke:black;stroke-width:2");
            var text = svgContainer.append('text').text($scope.rounds[x]['players'][j]['id'])
                      .attr('x', levelAddX+5)
                      .attr('y', nextList[j]+20)
                      .attr('fill', 'black');

          }
        }

        nextList = tempList;
        //Adding 200 pixels to the to plot the elements in the next round
        levelAddX = levelAddX + nextroundMarginX;
      }
    }
});