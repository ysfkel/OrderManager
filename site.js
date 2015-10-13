(function(){
	
	angular.module('app',['ui.router'])
	.run(function($http,SetStatisticsService){
		

			SetStatisticsService.initializeStatictics();     

	})
	//ROUTER
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
	//CONTROLLERS
	.controller('summaryController',function($scope,$rootScope,OrdersDataService){

			$rootScope.title='Orders Summary';

		$scope.orders={};
		$scope.orders.summary=OrdersDataService.model.orders.list
		
		
	})
	.controller('listController',function($scope,$rootScope,$state,OrdersDataService){
		$rootScope.title='Orders List';
		$scope.orders={};
		$scope.orders.list=OrdersDataService.model.orders.list;
		
		
		
	})
	.controller('editController',function($scope,$rootScope,$stateParams,$state,OrdersDataService,SetStatisticsService){
		$rootScope.title='Edit Order';
	
	   var id=$stateParams.id || null;
	   //if id is null, redirect to summary route
	   if(!id){
		   $state.go('summary')
	   }
	   
	    $scope.order=OrdersDataService.model.orders.list[$stateParams.id];
		$scope.controller={
			save:function(){
				OrdersDataService.model.prepareStats();
				SetStatisticsService.initializeStatictics();  
				$state.go('orders')
				
			}
		}
	})
	//SERVICES
	.factory('OrdersDataService',function(){
		
			 var statuses={
				inPreparation:'In Preparation'
				,readyToShip:'Ready to ship'
				,shipped:'Shipped'
			}
		
			var orders={};
		     orders.list=[
			{orderId:1,itemName:'Milk',quantity:10,totalPrice:444,unitPrice:10,orderDate:'Monday 1, july 2015',status:statuses.inPreparation},
			{orderId:2,itemName:'Play station',quantity:5,totalPrice:55,unitPrice:3,orderDate:'Monday 1, july 2015',status:statuses.inPreparation},
			{orderId:3,itemName:'Sony CD',quantity:6,totalPrice:88,unitPrice:35,orderDate:'Monday 1, july 2015',status:statuses.readyToShip},
			{orderId:4,itemName:'Iphone',quantity:7,totalPrice:99,unitPrice:87,orderDate:'Monday 1, july 2015',status:statuses.inPreparation},
		];
		
		var ordersListModel=new OrdersListModel(orders,statuses);
		return {
			model:ordersListModel
		}
		
	})
	.service('SetStatisticsService',function($rootScope,OrdersDataService){
			this.initializeStatictics=function(){
		    $rootScope.inPreparation=OrdersDataService.model.inPreparation;
			$rootScope.readyToShip=OrdersDataService.model.readyToShip;
			$rootScope.shipped=OrdersDataService.model.shipped;
			}
	})
	
	//MODELS
	function OrdersListModel(orders,statuses){
		this.orders=orders!=null?orders:[];
		this.statuses=statuses;
		
		this.total=orders.length;
		this.inPreparation=0;
		this.readyToShip=0;
		this.shipped=0;
		this.prepareStats();
		
	}
	
	OrdersListModel.prototype.prepareStats=function(){
			
			var inPreparation=0;
			var readyToShip=0;
			var shipped=0;
			
			for(var i=0;i<this.orders.list.length;++i){
				var item=this.orders.list[i];
		
				if(item.status==this.statuses.inPreparation){
					
					++inPreparation;
				}
				else if(item.status==this.statuses.readyToShip){
					++readyToShip;
				}
				else if(item.status==this.statuses.shipped){
					++shipped;
				}
			}          
			this.inPreparation=inPreparation;
			this.readyToShip=readyToShip;
			this.shipped=shipped;
			
		}
	
})()

