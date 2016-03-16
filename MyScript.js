angular.module('MyApp', []).
controller('driversController', function($scope, $document, $element) {

    $scope.names = ['round1','round2'];
//<!--     $scope.rounds = [{
  //      matches:['match1_round4','match2_round4']
    //},{
    //    matches:['match1_round5']
    //}];   --> 

     $scope.rounds = [{
        matches:[{id:'match1_round4',next_id:'match1_round5'},{id:'match2_round4', next_id:'match1_round5'}]
    },{
        matches:[{id:'match1_round5',next_id:''}]
    }];

    $scope.matchIds = ['match1_round4','match1_round5','match2_round4'];
    console.log($scope.rounds[0].matches[0]);

var el = document.querySelector("#myelementid");
var top = el.getBoundingClientRect().top;
var left = el.getBoundingClientRect().left;

console.log("JS Top: "+top);
console.log("JS Left: "+left);

$scope.myfunction = function($event){

 var element = $document.find("#arrow-box");
 console.log(element);
 var ele = $element.find("#arrow-box");
 console.log(ele);
 //console.log(element.prop('offsetTop'));
 //console.log(element.offsetTop);
 console.log($event.target);
 console.log(angular.element($event.srcElement).prop('offsetLeft'));
 console.log(angular.element($event.target).prop('offsetTop'));


}
});