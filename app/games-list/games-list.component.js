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
      this.hideMainList = false
      this.hideFavLimitAlert = true
      this.hideEmptyMess = true
      this.hideMerch = true
      this.isLoaded = false
      this.switch = false
      console.log($scope) //Scope {$id: 2, ....,  _: ƒ ()
      $http.get('http://127.0.0.1:8887/data.json')
        .then(response => {
          self.data = response.data
          this.isLoaded = true
          this.games = this.data.games
          this.categories = this.data.categories
          this.merchants = _.values(this.data.merchants)
          this.categoryName = {}
          _.forEach(this.categories, function (v) {
            self.categoryName[v.ID] = v.Trans.en
          })
        })
      this.changeGamesPerPage = function (e) {
        this.gamesOnPage = e.target.innerHTML
        this.page = 1
      }
      this.changePage = function (e) {
        this.page = e + 1
      }
      this.changeOrder = function (e) {
        (e.target.id === 'sbn') ? this.sortBy = 'Name.en' : this.sortBy = 'ID'
      }
      this.changeReverse = function (e) {
        (!this.reverse) ? this.reverse = '-' : this.reverse = ''
      }
      this.changeCategory = function (id) {
        this.hideMerch = true
        this.page = 1
        this.category === -2 ? $scope.query = '' : ''
        this.category = +id
        if (this.category === -1) { // === Favorite Games
          this.locStor.length > 0 ? this.hideEmptyMess = true : this.hideEmptyMess = false
          this.hideMainList = true
        }
        else {
          this.hideEmptyMess = true
          this.hideMainList = false
        }
      }
      this.addFavorite = function (id, game) {

        if (_.includes(this.locStor, game)) { _.remove(this.locStor, function (v) { return _.isEqual(v, game) }) }
        else if (this.locStor.length < 5) { this.locStor.push(game) } else { this.hideFavLimitAlert = false }
        localStorage.setItem('favorite', JSON.stringify(this.locStor))
      }
      this.hideFavAlert = function () {
        this.hideFavLimitAlert = true
      }
      this.viewMerchList = function () {
        $scope.query = ''
        this.category = -2
        this.hideMerch = false
        this.hideEmptyMess = true
      }
      this.viewCategoryName = function (a) {
        that = this
        let str = []
        _.forEach(a, function (v) {
          if (that.categoryName[v] === undefined) { str.push(`id${v}`) } else { str.push(that.categoryName[v]) }

        })
        return str.join(', ')
      }
      this.handleInput = function (el) {
        el.length > 0 ? this.switch = true : this.switch = false
      }
    }]
  })
