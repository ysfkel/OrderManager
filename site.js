(function(){
	
	var app=angular.module('app',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider){
		
		$stateProvider
		.state('summary',{
			url:'/summary',
			templateUrl:'summary.html'
			,controller:'summaryController'
		})
		.state('orders',{
			url:'/orders',
			templateUrl:'orders.html'
			,controller:'listController'
		})
       	   .state('edit',{
			url:'/order/edit/:id',
			templateUrl:'edit.html'
			,controller:'editController'
		})
		
		$urlRouterProvider.otherwise('/summary')
	})
	.controller('summaryController',function($scope,$rootScope){
		
			$rootScope.title='Orders Summary';
		
		$scope.orders={};
		$scope.orders.summary=[
			{orderId:1,numberOfItems:10,totalOrderPrice:444,orderDate:'Monday 1, july 2015',status:'Delivered'},
			{orderId:2,numberOfItems:33,totalOrderPrice:77,orderDate:'Tuesday 2, july 2015',status:'Pending'},
			{orderId:3,numberOfItems:55,totalOrderPrice:92,orderDate:'Wednesday 4, july 2015',status:'Pending'},
			{orderId:4,numberOfItems:100,totalOrderPrice:60,orderDate:'Thursday  5, july 2015',status:'Delivered'},
		]
		
	
		
	})
	.controller('listController',function($scope,$rootScope,$state){
		$rootScope.title='Orders List';
		
		
		$scope.orders={};
				$scope.orders.list=[
			{orderId:1,itemName:10,quantity:10,totalPrice:444,unitPrice:10,orderDate:'Monday 1, july 2015',status:'Delivered'},
			{orderId:2,itemName:12,quantity:5,totalPrice:55,unitPrice:3,orderDate:'Monday 1, july 2015',status:'Delivered'},
			{orderId:3,itemName:14,quantity:6,totalPrice:88,unitPrice:35,orderDate:'Monday 1, july 2015',status:'Pending'},
			{orderId:4,itemName:16,quantity:7,totalPrice:99,unitPrice:87,orderDate:'Monday 1, july 2015',status:'Delivered'},
		]
		
		$scope.controller={
			edit:function(item){
				$state.go('edit',{id:1})
			}
		}
		
	})
	.controller('editController',function($scope,$rootScope){
		$rootScope.title='Edit Order';
		
	})
		
		console.log('hello')
	
})()


/*
	 <th>Order Id</th><th>Number of Items </th> <th>Total Price</th><th>Order Date</th><th>Status</th>
*/