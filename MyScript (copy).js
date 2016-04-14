angular.module('MyApp', [])
  .controller('driversController', function($scope, $document, $element) {
    $scope.isTrue = false;
    //$scope.lineList = [{x1:'266.5',x2:'911.5',y1:'130',y2:'167.5'},{x1:'266.5',x2:'911.5',y1:'130',y2:'167.5'}];
    var lineList = [{}];
    $scope.names = ['round1','round2'];
    $scope.rounds = [{
                        matches:[{id:'match1_round3',next_id:'match1_round4'},{id:'match2_round3', next_id:'match1_round4'},{id:'match3_round3',  next_id:'match2_round4'},{id:'match4_round3', next_id:'match2_round4'}], round_id:"1"
                    },{
                        matches:[{id:'match1_round4',next_id:'match1_round5'},{id:'match2_round4', next_id:'match1_round5'}], round_id:"2"
                    },{
                        matches:[{id:'match1_round5',next_id:''}], round_id:"3"
                    }];

    //This runs after the page loading completes
    angular.element(document).ready(function () {
      console.log('page loading completed');
      var offsetWidth = document.getElementById('ElementPane').offsetWidth;
      var offsetHeight = document.getElementById('ElementPane').offsetHeight;
      console.log(offsetHeight);
      console.log(offsetWidth);
      $scope.svgWidth = offsetWidth;
      $scope.svgHeight = offsetHeight;
      for(var matches in $scope.rounds)
      {
          if ($scope.rounds.hasOwnProperty(matches)) {
              for(var i=0; i<$scope.rounds[matches].matches.length; i++)
              {
                var fromElement = $scope.rounds[matches].matches[i].id;
                var toElement = $scope.rounds[matches].matches[i].next_id;

                if(fromElement != "" && toElement != "")
                {

                  var element1 = document.querySelector('#'+fromElement);
                  var element2 = document.querySelector('#'+toElement);
                  console.log(element1);
                  console.log(element2);
                  var x1 = element1.getBoundingClientRect().left;
                  var y1 = element1.getBoundingClientRect().top;
                  var x2 = element2.getBoundingClientRect().left;
                  var y2 = element2.getBoundingClientRect().top;
                  console.log("element1 --> "+x1+" "+y1);

                  console.log("element2 --> "+x2+" "+y2);
                  lineList = lineList.concat([
                    {id:fromElement, x1:x1, y1:y1, x2:x2, y2:y2}
      
                  ]);
                  console.log(lineList);

                }
              }
          }
      }
      lineList.splice(0,1);
      console.log("Here i am");
      var lineGraph = d3.select("#svgcontainer"); 

      var myLine = lineGraph.append("svg:line")
                  .attr("x1", 0)
                  .attr("y1", 0)
                  .attr("x2", 300)
                  .attr("y2", 200)
                  .style("stroke", "rgb(6,120,155)");
      $scope.lineList = lineList;
      $scope.isTrue = true;
      $scope.$apply();
      
      console.log($scope.isTrue);
      console.log(lineList);


/*      for(var i=0; i<lineList.length; i++)
        createLine(lineList[i].x1,lineList[i].y1,lineList[i].x2,lineList[i].x2);
      
      function createLine(x1,y1, x2,y2){
        var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        var transform = 'rotate('+angle+'deg)';

        var line = $('<div>')
          .appendTo('#page')
          .addClass('line')
          .css({
            'position': 'absolute',
            'transform': transform
          })
          .width(length)
          .offset({left: x1, top: y1});

        return line;
      }*/
    });

});