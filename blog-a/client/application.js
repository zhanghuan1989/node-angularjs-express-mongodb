var mainApplicationModuleName = 'mean'; //创建一个存有应用主模块名的变量

var mainApplicationModule = angular.module(mainApplicationModuleName,['ngResource','ngRoute','mean.controllers','mean.services','mean.routes']); //创建主模块应用，添加模块依赖


mainApplicationModule.config(['$locationProvider',function($locationProvider){ //提供搜索引擎优化SEO的支持
   $locationProvider.hashPrefix('!'); //例如URL为：http://localhost:3000/#!/example
}]);

if(window.location.hash === '#_=_') window.location.hash = '#!';


angular.element(document).ready(function(){
   angular.bootstrap(document,[mainApplicationModuleName]);  //初始化主模块应用
});