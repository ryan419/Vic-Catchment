import angular from 'angular';
import 'angular-animate';
import 'angular-cookies';
import 'angular-ui-bootstrap';
import 'angular-ui-router';
import 'angular-local-storage';
require('textangular/dist/textAngular-sanitize.min');
import 'textAngular';
import 'angular-chart.js';


import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';


import services from './services';
import constants from './constants';
import directives from './directives/index.js';
import homeTmpl from './pages/home/home.html';
import overviewTmpl from './pages/home/overview/overview.html'

import createTmpl from './pages/home/create/create.html';
import editTmpl from './pages/home/edit/edit.html';
import savingTmpl from './pages/home/saving/saving.html';
import speciesTmpl from './pages/home/species/species.html';

import controllers from './pages';


export default angular
  .module('app', [
    'ui.bootstrap',
    'ui.router',
    'ngCookies',
    'LocalStorageModule',
    'ngAnimate',
    'textAngular',
    'chart.js',
    services.name,
    constants.name,
    controllers.name,
    directives.name
  ])
  .config(() => {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' ||
        window.location.hostname === 'localhost')) {
      const registration = runtime.register();

      registerEvents(registration, {
        onInstalled: () => {
          console.log('onInstalled');
        },
        onUpdateReady: () => {
          console.log('onUpdateReady');
        },

        onUpdating: () => {
          console.log('onUpdating');
        },
        onUpdateFailed: () => {
          console.log('onUpdateFailed');
        },
        onUpdated: () => {
          console.log('onUpdated');
        },
      });
    } else {
      console.log('serviceWorker not available');
    }
  })
  .config(($stateProvider, $urlRouterProvider, $provide) => {
    'ngInject';
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        template: homeTmpl
      })
      .state('home.create', {
        url: "/create",
        template: createTmpl
      })
      .state('home.edit', {
        url: "/edit",
        template: editTmpl
      })
      .state('home.overview', {
        url: "/",
        template: overviewTmpl
      })
      .state('home.saving', {
        url: '/saving',
        template: savingTmpl
      })
      .state('home.species', {
        url: '/species',
        template: speciesTmpl
      });

    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
      taOptions.toolbar = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'],
        [],
        [],
        ['html', 'insertImage', 'wordcount', 'charcount']
      ];
      // taRegisterTool('test', {
      //   buttontext: 'Test',
      //   action: function() {
      //     alert('Test Pressed')
      //   }
      // });
      // taOptions.toolbar[1].push('test');
      // taRegisterTool('colourRed', {
      //   iconclass: "fa fa-square red",
      //   action: function() {
      //     this.$editor().wrapSelection('forecolor', 'red');
      //   }
      // });
      // // add the button to the default toolbar definition
      // taOptions.toolbar[1].push('colourRed');
      return taOptions;
    }]);
  })
  .config((localStorageServiceProvider) => {
    'ngInject';
    localStorageServiceProvider.setPrefix('VicCatchment');
  })
  .run(($rootScope, $cookieStore) => {
    'ngInject';
    $rootScope.global = $cookieStore.get('globals') || {};
  });