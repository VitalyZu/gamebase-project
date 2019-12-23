angular.module('core')
    .filter('search', function () {
        return function (items, letter, page, gpp, attr) {
            var filtered = []
            var letterMatch = new RegExp(letter, 'i')
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (letterMatch.test(item.Name.en.substring(0))) {
                    filtered.push(item);
                }
            }
            if (attr) {
                let lslen = JSON.parse(localStorage.favorite).length
                let arr = _.chunk(filtered, gpp)
                arr.forEach(function (v, i, a) {
                    if (a[i + 1] !== undefined && lslen != 0) {
                        let x = v.splice(v.length - lslen, lslen)
                        a[i + 1] = x.concat(a[i + 1])
                    }
                })
                return arr[+page - 1]
            }
            else { return _.chunk(filtered, gpp)[+page - 1] }
        }
    })