angular.module('gamesList')
  .component('gamesList', {
    templateUrl: 'games-list/games-list.template.html',
    controller: ['$scope', '$http', 'lsService', function gamesList($scope, $http, lsService) {
      this.gamesOnPage = 50
      this.page = 1
      console.log(this) //gamesList {}
      var self = this
      $scope._ = _
      this.reverse = ""
      this.sortBy = "Name.en"
      this.category = 0
      this.locStor = lsService
      console.log($scope) //Scope {$id: 2, ....,  _: ƒ ()
      $http.get('http://127.0.0.1:8887/data.json')
        .then(response => {
          self.data = response.data
          this.games = this.data.games
          this.categories = this.data.categories
        })
      this.changeGamesPerPage = function (e) {
        this.gamesOnPage = e.target.innerHTML
        this.page = 1
      }
      this.changePage = function (e) {
        this.page = e.target.innerHTML
      }
      this.changeOrder = function (e) {
        (e.target.id === 'sbn') ? this.sortBy = 'Name.en' : this.sortBy = 'ID'
      }
      this.changeReverse = function (e) {
        (!this.reverse) ? this.reverse = '-' : this.reverse = ''
      }
      this.changeCategory = function (id) {
        this.category = +id
      }
      this.addFavorite = function (id, game) {
        _.includes(this.locStor, game) ? _.remove(this.locStor, function (v) { return _.isEqual(v, game) }) : this.locStor.push(game)
        localStorage.setItem('favorite', JSON.stringify(this.locStor))
      }
    }]
  })
