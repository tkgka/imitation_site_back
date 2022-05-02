export const arrayToObject = function (arr) {
    if (arr == undefined || arr == null || arr.length == 0) {
        return {}
    }
    var obj = {};
    for (var i in arr) {
      obj[arr[i].key] = arr[i].value
    }
    return obj;
  }