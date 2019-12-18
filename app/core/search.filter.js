angular.module('core')
    .filter('search', function () {
        return function (items, letter, page) {
            var filtered = []
            var letterMatch = new RegExp(letter, 'i')
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.Name.en.substring(0))) {
                    filtered.push(item);
                }
            }
                if(isNaN(page)){
                    page = 0}
                return _.chunk(filtered,40)[+page]

        }
    })