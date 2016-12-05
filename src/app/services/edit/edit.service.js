import angular from 'angular';

export default angular.module('service.EditService',[]).factory('EditService', ['$http', function($http) {
  let currentReport;

  let setReport = function(newReport) {
      currentReport = newReport;
  };

  let getReport = function(){
      return currentReport;
  };

  return {
  	setReport: setReport,
    getReport: getReport
  };
}]);