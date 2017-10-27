//Main controller Time tracking app
'use strict';
var mainCtrl = function($scope,localStorageService,$interval) {
    //Tasks: init
    //Queue
    var tasks = localStorageService.get('tasks');
    if(tasks) {
        $scope.tasks = tasks;
    } else {
        $scope.tasks = [];
    };
    //Inwork
    var LeotasksInwork = localStorageService.get('LeotasksInwork');
    if(LeotasksInwork) {
        $scope.LeotasksInwork = LeotasksInwork;
    } else {
        $scope.LeotasksInwork = [];
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
    $scope.$watch('LeotasksInwork', function() {
        localStorageService.set('LeotasksInwork', $scope.c);
    }, true);
    $scope.$watch('tasksComplete', function() {
        localStorageService.set('tasksComplete', $scope.tasksComplete);
    }, true);
    //Tasks: create
    $scope.taskCreate = function(desc){
        var id = Math.random().toString(36);
        $scope.tasks[$scope.tasks.length] = {
            id : id,
            num : $scope.tasksCounter,
            desc : desc, 
            turn : false,
            time : {
                counter : 0,
                h : 0 ,
                m : 0 ,
                s : 0
            },
            total : 0,
            status : "list"
        };
        $scope.tasksCounter ++;
        $scope.desc = "";
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
    $scope.LeotaskInwork = function(item){
        for(var i=0;i<$scope.tasks.length;i++){
            if($scope.tasks[i].id==item){
                $scope.LeotasksInwork[$scope.LeotasksInwork.length] = $scope.tasks[i];
                $scope.tasks.splice(i,1);
            }
        }
    };
    //Tasks: complete
    $scope.taskComplete = function(item){
        for(var i=0;i<$scope.LeotasksInwork.length;i++){
            if($scope.LeotasksInwork[i].id==item){
                $scope.tasksComplete[$scope.tasksComplete.length] = $scope.LeotasksInwork[i];
                $scope.LeotasksInwork.splice(i,1);
                location.reload();
            }
        }
    };
}
module.exports = mainCtrl;