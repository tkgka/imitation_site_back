export const arrayToObject = function (arr) {
    var obj = {};
    for (var i in arr) {
      obj[arr[i].key] = arr[i].value
    }
    return obj;
  }