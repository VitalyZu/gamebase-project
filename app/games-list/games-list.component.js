angular.module('gamesList')
  .component('gamesList', {
    templateUrl: 'games-list/games-list.template.html',
    controller: ['$scope','$http', function gamesList($scope,$http) {
      console.log(this) //gamesList {}
      var self = this
      $scope._ = _
      console.log($scope) //Scope {$id: 2, ....,  _: ƒ ()
      $http.get('http://127.0.0.1:8887/data.json')
        .then(response => {
          self.data = response.data
          this.games = this.data.games
        })
    }]
  })
