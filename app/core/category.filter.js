angular.module('core')
    .filter('category', function () {
        return function (items, id) {
            var filtered = []
            if (id === 0) { return items }
            _.forEach(items, function (value) {
                console.log(_.includes(value.CategoryID, id))
                _.includes(value.CategoryID, id.toString()) ? filtered.push(value) : ''
            })
            console.log(filtered)
            return filtered
        }
    })