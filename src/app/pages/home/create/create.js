import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css'
import Preview from './preview/preview';
import previewTmpl from './preview/preview.html';

import 'font-awesome/css/font-awesome.css'
import './preview/preview.css'
import './create.css';


import loginTmpl from '../login/login.html';

export default angular.module('Create', [Preview.name])
	.controller('CreateCtrl', ['$scope', 'ReportService', 'localStorageService', '$location', '$rootScope', '$uibModal', function($scope, ReportService, localStorageService, $location, $rootScope, $uibModal) {
		// report object
		$scope.report = new ReportService();
		console.log($scope.report);
		// upload msg
		$scope.showUploadMsg = true;

		/**
		 * change species value
		 */
		$scope.changeSpecies = function(species) {
			$scope.report.species = species;
		}

		/**
		 * save report to local storage
		 */
		$scope.save = function() {
			//use an id in local strorage
			let id = localStorageService.get('id') || 0;
			id++;

			//set report id
			if (localStorageService.set('id', id)) {
				$scope.report.id = id;
			} else {
				alert('error');

			}

			//set saving time
			let curTime = new Date();
			$scope.report.savingTime = curTime.toTimeString().substring(0,5) + ', ' + curTime.toDateString().substring(4);

			//save report
			let reports = localStorageService.get('reports') || [];
			reports.push($scope.report);
			if (localStorageService.set('reports', reports)) {
				console.log(reports);
				$location.path('/saving');
			} else {
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