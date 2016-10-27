require('../question1/q1.css');
import 'font-awesome/css/font-awesome.css';

export default angular.module('Question4',[])
.controller('q4Ctrl',['$scope', function($scope){
	$scope.currentPage = 1;
	$scope.setPage = function(pageNum){
		$scope.currentPage = pageNum;
	}
}]);

