/**
 * services是数据支持部分，也就是model部分，用于提供数据的增删改查操作
 * 当你初试 Angular 时，很自然地就会往 controller 和 scope 里堆满不必要的逻辑。
 * 一定要早点意识到，controller 这一层应该很薄；也就是说，应用里大部分的业务逻辑和持久化数据都应该放在 service 里。
 * 很多人问道，关于如何在 controller 里保存持久化数据。这就不是 controller 该干的事。
 * 出于内存性能的考虑，controller 只在需要的时候才会初始化，一旦不需要就会被抛弃。
 * 因此，每次当你切换或刷新页面的时候，Angular 会清空当前的 controller。
 * 与此同时，service 可以用来永久保存应用的数据，并且这些数据可以在不同的 controller 之间使用。
 Angular 提供了3种方法来创建并注册我们自己的服务。
 1.	Provider
 2.	Factory
 3.	Service
 */
angular.module('mean.services', [])

/*
 * angular的factory  方法直接把一个函数当成一个对象的$get 方法可以直接返回字符串
 * 用 factory 就是创建一个对象，为它添加属性，然后把这个对象返回出来。
 * 你把 service 传进 controller 之后，在 controller 里这个对象里的属性就可以通过 factory 使用了
 */
.factory('Storage',function(){
    var storage = {};
    storage.set = function(key,value){
        return window.localStorage.setItem(key,window.JSON.stringify(value));
    };
    storage.get = function(){
        return window.JSON.parse(window.localStorage.getItem(key));
    };
    storage.remove = function(){
        return window.localStorage.removeItem();
    }
    return storage;
})

.factory('inputTestService',function(){
    var obj = {};
        obj.str = "测试";
        obj.test = function(){
            alert("测试方法");
        }
    return obj;
})

.factory('listService',['$resource',function($resource){
    return $resource('/list/:listId',{
        listId:'@_id'
    },{
        update:{method:'put'}
    });
}])
