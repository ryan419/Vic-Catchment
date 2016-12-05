import angular from 'angular';
import modal from 'angular-ui-bootstrap/src/modal';
import './login.css';

export default angular.module('Login',[])
.controller('loginCtrl', ['$scope', '$uibModalInstance', 'AuthenticationService', function ($scope, $uibModalInstance, AuthenticationService) {

  $scope.loginError = false;
  $scope.ok = function () {
    $uibModalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.submit = function(){

    AuthenticationService.Login($scope.user.username, $scope.user.password, function(response){

      if (response) {
        console.log("response is success");
        AuthenticationService.SetCredentials($scope.user.username, $scope.user.password);
        $uibModalInstance.close();
      } else {
        $scope.loginError = true;
        console.log('error');
      }
    });
  };


}]);