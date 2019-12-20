'use strict';



angular.module('gameBase', ['gamesList', 'core'])
    .constant('_', window._)
    .factory('lsService', function () {
        if (localStorage.favorite) {
            return JSON.parse(localStorage.favorite)
        } else {
            localStorage.favorite = '[]'
            return JSON.parse(localStorage.favorite)
        }
    })

