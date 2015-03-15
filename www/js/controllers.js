angular.module('trivia.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('StartCtrl', function($scope, GameService) {

})

.controller('EndCtrl', function($scope, GameService) {

})

.controller('QuestionCtrl', function($scope, $stateParams, $state, $timeout, GameService, totalQuestions) {
  var currentQuestion = parseInt($state.current.name.slice('question'.length));

  console.log(GameService);

  $scope.question = GameService.getQuestion(currentQuestion);

  $scope.currentQuestion = currentQuestion;
  $scope.totalQuestions = totalQuestions;

  $scope.answer = function(option) {
    if ($scope.clicked) return;
    $scope.clicked = option;

    GameService.selectedOption(currentQuestion, option);

    $timeout(function(){
      var next = currentQuestion + 1;
      if (next < totalQuestions) return $state.go('question' + next);

      $state.go('end');
    }, 500);
    
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
