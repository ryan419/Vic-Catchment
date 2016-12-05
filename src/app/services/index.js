import angular from 'angular';
import ReportService from './report/report.service.js';
import EditService from './edit/edit.service.js';
import AuthenticationService from './authentication.service.js'

export default angular.module('services', [
	ReportService.name,
	EditService.name,
	AuthenticationService.name
]);
