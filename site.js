(function(){
	
	angular.module('app',['ui.router'])
	.run(function($rootScope,$http){
		
		    var statuses={
				inPreparation:'In Preparation'
				,readyToShip:'Ready to ship'
				,shipped:'Shipped'
			}
		
			$rootScope.orders={};
				$rootScope.orders.list=[
			{orderId:1,itemName:'Milk',quantity:10,totalPrice:444,unitPrice:10,orderDate:'Monday 1, july 2015',status:statuses.inPreparation},
			{orderId:2,itemName:'Play station',quantity:5,totalPrice:55,unitPrice:3,orderDate:'Monday 1, july 2015',status:statuses.inPreparation},
			{orderId:3,itemName:'Sony CD',quantity:6,totalPrice:88,unitPrice:35,orderDate:'Monday 1, july 2015',status:statuses.readyToShip},
			{orderId:4,itemName:'Iphone',quantity:7,totalPrice:99,unitPrice:87,orderDate:'Monday 1, july 2015',status:statuses.inPreparation},
		];
		
		$rootScope.prepareStats=function(){
			
			var inPreparation=0;
			var readyToShip=0;
			var shipped=0;
			
			for(var i=0;i<$rootScope.orders.list.length;++i){
				var item=$rootScope.orders.list[i];
		
				if(item.status==statuses.inPreparation){
					
					++inPreparation;
				}
				else if(item.status==statuses.readyToShip){
					++readyToShip;
				}
				else if(item.status==statuses.shipped){
					++shipped;
				}
			}          
			$rootScope.inPreparation=inPreparation;
			$rootScope.readyToShip=readyToShip;
			$rootScope.shipped=shipped;
			
		}
	})
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
		$rootScope.prepareStats();
			$rootScope.title='Orders Summary';
		
		$scope.orders={};
		$scope.orders.summary=$scope.orders.list=$rootScope.orders.list;
		
		
	})
	.controller('listController',function($scope,$rootScope,$state){
		$rootScope.title='Orders List';
		$rootScope.prepareStats();
		
		$scope.orders.list=$rootScope.orders.list;
		
		
		
	})
	.controller('editController',function($scope,$rootScope,$stateParams,$state){
		$rootScope.title='Edit Order';
	
		$scope.order=$rootScope.orders.list[$stateParams.id];
		
		$scope.controller={
			save:function(){
				$rootScope.prepareStats()
				$state.go('orders')
				
			}
		}
	})
	
		
	
})()
