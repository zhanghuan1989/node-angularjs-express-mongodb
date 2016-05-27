/**
 * controllers用于控制，包含业务逻辑控制代码
 *
 */
angular.module('mean.controllers',[])

//依赖注入的写法，防止压缩代码时出问题
.controller('inputTestController',['$scope','$rootScope','inputTestService',function($scope,$rootScope,inputTestService) {
    $scope.name = inputTestService.str;
    $scope.test = function(){
       inputTestService.test();
    }
}])

.controller('listController',['$scope','$routeParams','$location','listService','$http',function($scope,$routeParams,$location,listService,$http) {
    $scope.goBack = function(){
        $location.path('/blog');
    }

    $scope.create = function() {
        var list = new listService({
            name:this.name,
            title:this.title,
            info:this.info
        });
        list.$save(function(response){
            $location.path('/blog');
            //$location.path('list/'+response._id);
        },function(errorResponse){
            $scope.error = errorResponse.data.message;
        });
    }

    $scope.findAll = function(){
        $scope.lists = listService.query();
    }

    $scope.findOne = function(){
        $scope.list = listService.get({
            listId:$routeParams.listId
        });
    }

    $scope.update = function(){
        $scope.list.$update(function(){
            $location.path('/blog');
            //$location.path('list/'+$scope.list._id);
        },function(errorResponse){
            $scope.error = errorResponse.data.message;
        })
    }

    //详情删除
    $scope.deleteByDetail = function(){
        $scope.list.$remove(function(){
            $location.path('/blog');
        });
    }

    //列表删除
    $scope.delete = function(list){
        list.$remove(function(){
            for(var i in $scope.lists){
                if($scope.lists[i] === list){
                    $scope.lists.splice(i,1);
                }
            }
        });
    }
}])

.controller('listTestController',['$scope','$http',function($scope,$http) {
    $scope.findAllTest = function(){
        /*$http.get('data.json').success(function(data) {
            $scope.lists = data;
        }).error(function(data,header,config,status){
            //处理响应失败
        });*/
        /*var postData = {uname:"15078381887",village_num:"0003006",page:"1"};
        var reqUrl = "http://10.20.101.115/appInterface.php?m=sns&s=myCollectGoods&version=3.0";

        $http.post(reqUrl,{params:postData},{'Content-Type':'application/x-www-form-urlencoded'}).success(function(data) {
            $scope.lists = data;
        }).error(function(data,header,config,status){
            //处理响应失败
        });*/

        $http.post("/api/getListTest2").success(function(data) {
            $scope.lists = data;
        }).error(function(data,header,config,status){
            //处理响应失败
            alert("处理响应失败");
        });
    }
}])