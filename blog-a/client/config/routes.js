angular.module('mean.routes',[])

.config(['$routeProvider',function($routeProvider){ //$routeProvider定义路由行为
        $routeProvider.
            when('/',{
                templateUrl:'list.ejs'
            }).
            when('/list/test2',{
                templateUrl:'list-test2.ejs'
            }).
            when('/list',{
                templateUrl:'list.ejs'
            }).
            when('/list/create',{
                templateUrl:'add.ejs'
            }).
            when('/list/:listId',{
                templateUrl:'one.ejs'
            }).
            when('/list/:listId/edit',{
                templateUrl:'edit.ejs'
            }).
            otherwise({
                redirectTo:'/'
            });
}])
