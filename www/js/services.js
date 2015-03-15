angular.module('trivia.services', [])

.service('GameService', function(AsanaData) {
  function GameService() {};

  function randomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function randomList(amount, max) {
    var indexes = [];
    while (indexes.length < amount) {
      var index = randomIndex(max);
      if (indexes.indexOf(index) === -1) indexes.push(index);
    }
    return indexes;
  }

  GameService.prototype.getQuestion = function() {
    var indexes = randomList(4, AsanaData.length);
    var asanas = indexes.map(function(i) { return AsanaData[i] });

    console.log('Indexes', indexes);
    return {
      image: 'asanas/' + asanas[0].image,
      options: asanas
    };
  };

  return new GameService();

});