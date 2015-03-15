angular.module('trivia.services', [])

.service('GameService', function(AsanaData, totalQuestions) {
  function GameService() {
    this.init();
  };

  function randomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function shuffle(collection) {
    var index = -1;
    var length = collection.length;
    var result = new Array(length);

    while (++index < length) {
      var rand = Math.floor(Math.random() * index);
      if (index != rand) {
        result[index] = result[rand];
      }
      result[rand] = collection[index];
    }

    return result;
  }

  function randomSet(amount, max, init) {
    var indexes = init || [];
    while (indexes.length < amount) {
      var index = randomIndex(max);
      if (indexes.indexOf(index) === -1) indexes.push(index);
    }
    return indexes;
  }

  function getOptionsFor(index) {
    var indexes = randomSet(4, AsanaData.length, [index]);
    var options = indexes.map(function(i) { return angular.copy(AsanaData[i]); });
    options[0].answer = true;
    return shuffle(options);
  }

  GameService.prototype.init = function() {
    this.generateQuestions();
    this.score = 0;
  };

  GameService.prototype.selectedOption = function() {

  };

  GameService.prototype.generateQuestions = function() {
    var indexes = randomSet(totalQuestions, AsanaData.length);
    this.questions = indexes.map(function(index) {
      return {
        image: 'asanas/' + AsanaData[index].image,
        options: getOptionsFor(index)
      }
    });
  };

  GameService.prototype.getQuestion = function(index) {
    return this.questions[index];
  };

  return new GameService();

});