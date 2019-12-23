angular.module('core')
    .filter('category', function () {
        return function (items, id) {
            var filtered = []
            if (id === 0) { return items }
            if (id === -1) {
                return items
            }
            _.forEach(items, function (value) {
                _.includes(value.CategoryID, id.toString()) ? filtered.push(value) : ''
            })
            return filtered
        }
    })