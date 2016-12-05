import angular from 'angular';

require('./saving.css');

export default angular.module('Saving', [])
	.controller('SavingCtrl', ['$scope', 'localStorageService', '$location', 'EditService', function($scope, localStorageService, $location, EditService) {
		// report object
		$scope.reports = localStorageService.get('reports') || [];
		console.log($scope.reports);
		$scope.reports.reverse()

		/**
		 * edit report
		 */
		$scope.edit = function(report){
			EditService.setReport(report);
			$location.path('/edit');
		}

		/**
		 * clear all the reports in local storage
		 */
		$scope.clear = function () {
			if (localStorageService.clearAll()) {
				$scope.reports = [];
			}
			
		}

		/**
		 * delete report
		 */
		$scope.delete = function (report) {
			$scope.reports.reverse();
			$scope.reports = $scope.reports.filter(function(obj){
				return report.id != obj.id;
			});
			if (localStorageService.set('reports',$scope.reports)) {
				console.log($scope.reports);
			}else{
				alert('error');
			}
			$scope.reports.reverse();

		}
	}]);