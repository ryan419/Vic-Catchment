require('./q1.css');
export default angular.module('Question1', [])
	.controller('q1Ctrl', ['$scope', function($scope) {
		$scope.arr = [1, 2, 3, [4, 5, 'a'], ['b', ['c', {}]], 7];
		$scope.getResult = function (arr) {
			$scope.result = getResult(arr);
		}

		let getResult = function(arr) {
			return arr.reduce(function(sum, item) {
				if (item instanceof Array) {
					sum = sum + getResult(item);
				} else if (typeof item === 'number') {
					sum = sum + item;
				}
				return sum;
			}, 0);
		}
	}]);