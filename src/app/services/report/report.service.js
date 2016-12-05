import angular from 'angular';

export default angular.module('service.ReportService',[]).factory('ReportService', ['$http', function($http) {
  let ReportService = function() {
    this.species = 'Bird Species';
  };

  ReportService.prototype.nextPage = function() {

  };

  return ReportService;
}]);