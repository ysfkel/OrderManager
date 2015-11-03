(function () {

	angular.module('app', ['ui.router'])


		.run(function ($http, SetStatisticsService,APP_TITLE,$rootScope) {
	
            $rootScope.AppTitle=APP_TITLE;
            
			SetStatisticsService.initializeStatictics();

		})

	//ROUTER
		.config(function ($stateProvider, $urlRouterProvider, headerTextProvider) {

    
			$stateProvider

				.state('summary', {
					url: '/summary',
					templateUrl: 'summary.html'
					, controller: 'summaryController'
					, resolve: {
						header: function () {
							headerTextProvider.setHeaderText('ORDERS SUMMARY')
						}
					}
				})
				.state('orders', {
					url: '/orders',
					templateUrl: 'orders.html'
					, controller: 'listController'
					, resolve: {
						header: function () {
							headerTextProvider.setHeaderText('ORDERS LIST')
						}
					}
				})
				.state('edit', {
					url: '/order/edit/:id',
					templateUrl: 'edit.html'
					, controller: 'editController'
					, resolve: {
						header: function () {
							headerTextProvider.setHeaderText('EDIT ORDER')
						}
					}
				})
			$urlRouterProvider.otherwise('/summary')
		})
	//CONTROLLERS
		.controller('summaryController', function ($scope, $rootScope, OrdersDataServiceFactory, header, headerText) {

        
			$rootScope.title = headerText();

			$scope.orders = {};
			$scope.orders.summary = OrdersDataServiceFactory.model.orders.list



		})
		.controller('listController', function ($scope, $rootScope, $state, OrdersDataServiceFactory,headerText) {
			$rootScope.title = headerText();
			$scope.orders = {};
			$scope.orders.list = OrdersDataServiceFactory.model.orders.list;



		})
		.controller('editController', function ($scope, $rootScope, $stateParams, $state, OrdersDataServiceFactory, SetStatisticsService,headerText) {
			$rootScope.title = headerText();

			var id = $stateParams.id || null;
			//if id is null, redirect to summary route
			if (!id) {
				$state.go('summary')
			}

			$scope.order = OrdersDataServiceFactory.model.orders.list[id];
			$scope.controller = {
				save: function () {
					OrdersDataServiceFactory.model.prepareStats();
					SetStatisticsService.initializeStatictics();
					$state.go('orders')

				}
			}
		})
	//SERVICES
		.factory('OrdersDataServiceFactory', function () {

			var statuses = {
				inPreparation: 'In Preparation'
				, readyToShip: 'Ready to ship'
				, shipped: 'Shipped'
			}

			var orders = {};
			orders.list = [
				{ orderId: 1, itemName: 'Milk', quantity: 10, totalPrice: 444, unitPrice: 10, orderDate: 'Monday 1, july 2015', status: statuses.inPreparation },
				{ orderId: 2, itemName: 'Play station', quantity: 5, totalPrice: 55, unitPrice: 3, orderDate: 'Monday 1, july 2015', status: statuses.inPreparation },
				{ orderId: 3, itemName: 'Sony CD', quantity: 6, totalPrice: 88, unitPrice: 35, orderDate: 'Monday 1, july 2015', status: statuses.readyToShip },
				{ orderId: 4, itemName: 'Iphone', quantity: 7, totalPrice: 99, unitPrice: 87, orderDate: 'Monday 1, july 2015', status: statuses.inPreparation },
			];

			var ordersListModel = new OrdersListModel(orders, statuses);
			return {
				model: ordersListModel
			}

		})
		.service('SetStatisticsService', function ($rootScope, OrdersDataServiceFactory) {
			this.initializeStatictics = function () {
				$rootScope.inPreparation = OrdersDataServiceFactory.model.inPreparation;
				$rootScope.readyToShip = OrdersDataServiceFactory.model.readyToShip;
				$rootScope.shipped = OrdersDataServiceFactory.model.shipped;
			}
		})
		.provider('headerText', function () {
			this.headerText = 'WELCOME';

			this.setHeaderText = function (headerText) {
				self.headerText = headerText;
			}
			var self = this;
			this.$get = function () {

				return function () {
					return self.headerText;
				}
			}
		})
        .constant('APP_TITLE','MY ORDER MANAGER')
		.value('clientId','8768768768686876876')
		
	//MODELS
	function OrdersListModel(orders, statuses) {
		this.orders = orders != null ? orders : [];
		this.statuses = statuses;

		this.total = orders.length;
		this.inPreparation = 0;
		this.readyToShip = 0;
		this.shipped = 0;
		this.prepareStats();

	}

	OrdersListModel.prototype.prepareStats = function () {

		var inPreparation = 0;
		var readyToShip = 0;
		var shipped = 0;

		for (var i = 0; i < this.orders.list.length; ++i) {
			var item = this.orders.list[i];

			if (item.status == this.statuses.inPreparation) {

				++inPreparation;
			}
			else if (item.status == this.statuses.readyToShip) {
				++readyToShip;
			}
			else if (item.status == this.statuses.shipped) {
				++shipped;
			}
		}
		this.inPreparation = inPreparation;
		this.readyToShip = readyToShip;
		this.shipped = shipped;

	}

})()

