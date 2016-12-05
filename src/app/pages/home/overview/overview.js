import angular from 'angular';
import shoveler from '../../../../assets/Birds/Australasian Shoveler.jpg';
import hobby from '../../../../assets/Birds/Australian Hobby.jpg';
import pelican from '../../../../assets/Birds/Australian Pelican.jpg';
import './overview.css'

export default angular.module('Overview', [])
	.controller('OverviewCtrl', ['$scope', 'localStorageService', function($scope, localStorageService) {
		// carousel parameters
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		$scope.slides = [{
			image: shoveler,
			text: 'Southwestern and Southeastern Australia, Tasmania, and New Zealand',
			name: 'Australasian Shoveler',
			id: 0
		}, {
			image: hobby,
			text: 'Tasmania',
			name: 'Australasian Hobby',
			id: 1
		}, {
			image: pelican,
			text: 'Mainland Australia and Tasmania',
			name: 'Australasian Pelican',
			id: 2
		}];

		// $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
		$scope.labels = ['Australasian Bittern',
			'Australasian Darter',
			'Australasian Grebe',
			'Australasian Pipit',
			'Australasian Shoveler',
			'Australian Hobby',
			'Australian Pelican',
			'Australian Reed-Warbler',
			'Australian Shelduck',
			'Australian White Ibis'
		]
		$scope.dataObj = {
			'Australasian Bittern': 0,
			'Australasian Darter': 0,
			'Australasian Grebe': 0,
			'Australasian Pipit': 0,
			'Australasian Shoveler': 0,
			'Australian Hobby': 0,
			'Australian Pelican': 0,
			'Australian Reed-Warbler': 0,
			'Australian Shelduck': 0,
			'Australian White Ibis': 0
		}

		let reports = localStorageService.get('reports') || [];

		// to show chart or not
		$scope.showchart = true;
		if (reports.length === 0) {
			$scope.showchart = false;
		}
		// put reports data in to data object
		reports.forEach(function(report) {
			if (report.species != 'Bird Species') {
				$scope.dataObj[report.species] += parseInt(report.numOfBird) || 0;
			}
		});

		$scope.data = [];
		$scope.data.push($scope.dataObj['Australasian Bittern']);
		$scope.data.push($scope.dataObj['Australasian Darter']);
		$scope.data.push($scope.dataObj['Australasian Grebe']);
		$scope.data.push($scope.dataObj['Australasian Pipit']);
		$scope.data.push($scope.dataObj['Australasian Shoveler']);
		$scope.data.push($scope.dataObj['Australian Hobby']);
		$scope.data.push($scope.dataObj['Australian Pelican']);
		$scope.data.push($scope.dataObj['Australian Reed-Warbler']);
		$scope.data.push($scope.dataObj['Australian Shelduck']);
		$scope.data.push($scope.dataObj['Australian White Ibis']);

		/**
		 * bar chart options
		 */
		$scope.options = {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						userCallback: function(label, index, labels) {
							// when the floored value is the same as the value we have a whole number
							if (Math.floor(label) === label) {
								return label;
							}

						},
					}
				}],
			},
		}


		console.log('test overview');
	}]);