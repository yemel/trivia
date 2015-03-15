
angular.module('trivia', [
  'ionic',
  'angular-capitalize-filter',

  'trivia.controllers',
  'trivia.services',
  'trivia.data',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('totalQuestions', 10)

.config(function($stateProvider, $urlRouterProvider, totalQuestions) {
  $stateProvider

  .state('start', {
    url: "/start",
    templateUrl: "templates/start.html",
    controller: 'StartCtrl'
  })

  .state('end', {
    url: "/end",
    templateUrl: "templates/end.html",
    controller: 'EndCtrl'
  });

  for (var i = 0 ; i < totalQuestions ; i++) {
    $stateProvider.state('question' + i, {
      url: "/question" + i,
      templateUrl: "templates/question.html",
      controller: 'QuestionCtrl'
    });
  }

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');
});
