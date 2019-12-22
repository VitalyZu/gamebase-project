angular.module('core')
    .filter('category', function () {
        return function (items, id) {
            var filtered = []
            if (id === 0 || id === 999) { return items }
            if (id === 9999) { return items }
            _.forEach(items, function (value) {
                _.includes(value.CategoryID, id.toString()) ? filtered.push(value) : ''
            })
            return filtered
        }
    })