import angular from 'angular';

import Create from './create/create';
import Edit from './edit/edit';
import Saving from './saving/saving';
import Overview from './overview/overview';
import Login from './login/login';


import loginTmpl from './login/login.html';

import 'bootstrap/dist/css/bootstrap.css';
require("./Home.css");
import './species/species.css';



export default angular
	.module('Home', [
		Create.name,
		Edit.name,
		Saving.name,
		Overview.name,
		Login.name
	])
	.controller('HomeCtrl', ['$scope', '$uibModal', 'AuthenticationService', function($scope, $uibModal, AuthenticationService) {
		// use for collapse in mobile screen
		$scope.navCollapsed = true;

		/**
		 * Login in with Username and Password on Desktop
		 * @param  {string} size The Size of Modal Window
		 * @return
		 */
		$scope.login = function(size) {
			let loginModalInstance = $uibModal.open({
				animation: true,
				template: loginTmpl,
				size: size,
				scope: $scope,
				controller: 'loginCtrl',
				backdrop: true
			});
		}

		/**
		 * Login in with Username and Password on Mobile
		 * @param  {string} size The Size of Modal Window
		 * @return
		 */
		$scope.loginMobile = function() {
			let loginModalInstance = $uibModal.open({
				animation: true,
				template: loginTmpl,
				controller: 'loginCtrl',
				windowClass: 'app-modal-window',
				backdrop: true
			});
		}


		$scope.logout = function() {
			console.log('logout');
			AuthenticationService.ClearCredentials();
		} 


	}]);