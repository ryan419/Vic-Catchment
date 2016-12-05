import angular from 'angular';
import previewTmpl from '../create/preview/preview.html';

require('../create/create.css');

export default angular.module('Edit', [])
	.controller('EditCtrl', ['$scope', 'EditService', 'localStorageService', '$location', '$uibModal', function($scope, EditService, localStorageService, $location, $uibModal) {
		// report object
		$scope.report = EditService.getReport();
		console.log($scope.report);

		/**
		 * change species value
		 */
		$scope.changeSpecies = function(species){
			$scope.report.species = species;
		}

		/**
		 * save report to local storage
		 */
		$scope.save = function () {
			// delete report form local storage
			let reports = localStorageService.get('reports')
			reports = reports.filter(function(obj){
				return $scope.report.id != obj.id;
			});
			if (localStorageService.set('reports', reports)) {
				console.log(reports);
			}else{
				alert('error');
			}


			//use an id in local strorage
			let id = localStorageService.get('id') || 0;
			id++;

			//set report id
			if (localStorageService.set('id',id)) {
				$scope.report.id = id;
			}else{
				alert('error');

			}
			
			//set saving time
			let curTime = new Date();
			$scope.report.savingTime = curTime.toTimeString().substring(0,5) + ', ' + curTime.toDateString().substring(4);

			//save report
			reports = localStorageService.get('reports') || [];
			reports.push($scope.report);
			if (localStorageService.set('reports',reports)) {
				console.log(reports);
				$location.path('/saving');
			}else{
				alert('error');

			}
		}

		/**
		 * upload the report, if the user has not logged in, will ask user loggin first
		 */
		$scope.upload = function(device) {
			console.log(device);
			if ($rootScope.global.username != undefined) {
				// show upload failed
				$scope.showUploadMsg = true;
			} else if (device === 'desktop') {
				let loginModalInstance = $uibModal.open({
					animation: true,
					template: loginTmpl,
					size: 'sm',
					scope: $scope,
					controller: 'loginCtrl',
					backdrop: true
				});
			} else if (device === 'mobile') {
				let loginModalInstance = $uibModal.open({
					animation: true,
					template: loginTmpl,
					controller: 'loginCtrl',
					windowClass: 'app-modal-window',
					backdrop: true
				});
			}
		}

		/**
		 * preview the report on mobile device
		 */
		$scope.preview = function() {
			let previewModalInstance = $uibModal.open({
				animation: true,
				template: previewTmpl,
				controller: 'previewCtrl',
				windowClass: 'app-modal-window',
				backdrop: true,
				resolve: {
					report: function() {
						return $scope.report;
					}
				}
			});
		}
	}]);