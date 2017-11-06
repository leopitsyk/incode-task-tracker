//Main controller Time tracking app
'use strict';
var mainCtrl = function($scope,localStorageService) {
    //Tasks: init
    //Queue
    var tasks = localStorageService.get('tasks');
    if(tasks) {
        $scope.tasks = tasks;
    } else {
        $scope.tasks = [];
    };
    //Inwork
    var tasksInwork = localStorageService.get('tasksInwork');
    if(tasksInwork) {
        $scope.tasksInwork = tasksInwork;
    } else {
        $scope.tasksInwork = [];
    };
    //Complete
    var tasksComplete = localStorageService.get('tasksComplete');
    if(tasksComplete) {
        $scope.tasksComplete = tasksComplete;
    } else {
        $scope.tasksComplete = [];
    };
    //Tasks: watching
    $scope.$watch('tasks', function() {
        localStorageService.set('tasks', $scope.tasks);
    }, true);
    $scope.$watch('tasksInwork', function() {
        localStorageService.set('tasksInwork', $scope.tasksInwork);
    }, true);
    $scope.$watch('tasksComplete', function() {
        localStorageService.set('tasksComplete', $scope.tasksComplete);
    }, true);
    //Tasks: create
    $scope.taskCreate = function(desc,cost){
        var id = Math.random().toString(36);
        $scope.tasks[$scope.tasks.length] = {
            id : id,
            num : $scope.tasksCounter,
            desc : desc, 
            cost : cost,
            turn : false,
            time : {
                counter : 0,
                h : 0 ,
                m : 0 ,
                s : 0
            },
            total : 0,
            status : "inqueue"
        };
        $scope.tasksCounter ++;
        $scope.desc = "";
        $scope.cost = "";
    };
    //Tasks: delete
    $scope.taskDelete = function(item){
        for(var i=0;i<$scope.tasks.length;i++){
            if($scope.tasks[i].id==item){
                $scope.tasks.splice(i,1);
            }
        }
    };
    //Tasks: inwork
    $scope.taskInwork = function(item){
        for(var i=0;i<$scope.tasks.length;i++){
            if($scope.tasks[i].id==item){
                $scope.tasksInwork[$scope.tasksInwork.length] = $scope.tasks[i];
                $scope.tasks.splice(i,1);
            }
        }
    };
    //Tasks: complete
    $scope.taskComplete = function(item){
        for(var i=0;i<$scope.tasksInwork.length;i++){
            if($scope.tasksInwork[i].id==item){
                $scope.tasksComplete[$scope.tasksComplete.length] = $scope.tasksInwork[i];
                $scope.tasksInwork.splice(i,1);
                location.reload();
            }
        }
    };
    
}
module.exports = mainCtrl;