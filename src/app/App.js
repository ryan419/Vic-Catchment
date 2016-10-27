import angular from 'angular';
import 'angular-animate';
import 'angular-ui-bootstrap';
import 'angular-ui-router';

import services from './services';
import constants from './constants';
import directives from './directives/index.js';
import homeTmpl from './pages/home/home.html';
import q1Tmpl from './pages/home/question1/q1.html';
import q2Tmpl from './pages/home/question2/q2.html';
import q3Tmpl from './pages/home/question3/q3.html';
import q4Tmpl from './pages/home/question4/q4.html';

import controllers from './pages';


export default angular
  .module('app', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    services.name,
    constants.name,
    controllers.name,
    directives.name
  ])
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: "/",
        template: homeTmpl
      })
      .state('home.q1', {
        url: "/question1",
        template: q1Tmpl
      })
      .state('home.q2', {
        url: "/question2",
        template: q2Tmpl
      })
      .state('home.q3', {
        url: "/question3",
        template: q3Tmpl
      })
      .state('home.q4', {
        url: "/question4",
        template: q4Tmpl
      });
  })
  .run();
