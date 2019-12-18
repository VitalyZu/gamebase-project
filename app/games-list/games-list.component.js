angular.module('gamesList')
    .component('gamesList', {
        templateUrl: 'games-list/games-list.template.html',
        controller: ['$http', function gamesList($http) {
            var self = this
            $http.get('http://127.0.0.1:8887/data.json')
                .then(response => {
                    self.games = response.data
                })
        }]
    })
    .filter('startsWithLetter', function () {
        return function (items, letter) {
          var filtered = [];
          var letterMatch = new RegExp(letter, 'i');
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (letterMatch.test(item.Name.en.substring(0))) {
              filtered.push(item);
            }
          }
          return filtered;
        };
      });