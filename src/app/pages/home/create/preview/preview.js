import angular from 'angular';
import modal from 'angular-ui-bootstrap/src/modal';
import './preview.css';

export default angular.module('Preview',[])
.controller('previewCtrl', ['$scope', '$uibModalInstance', 'report', function ($scope, $uibModalInstance, report) {
  //report to be displayed
  $scope.report = report;

  $scope.ok = function () {
    $uibModalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);