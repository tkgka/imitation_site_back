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


export const HexToJson = async function (Hex) {
    var arrStr = HexToStr(Hex).split('\r\n')
    
    var ReturnVal = {return_code: 0, return_header: []}
    var header = []
    arrStr.forEach(element => {
    
        if (element.indexOf(':') == -1) {
            ReturnVal.return_code = Number(element.split(' ')[1])
        }
        const splitLoc = element.split(':')[0]
        // element.substr(0, element.indexOf(':'))},
        if (element.substr(0, element.indexOf(':')) != "" && element.substr(element.indexOf(':') + 1) != "") {
            header.push({key: element.substr(0, element.indexOf(':')), value: element.substr(element.indexOf(':') + 1)})
        }
    });
    ReturnVal.return_header = header

    return ReturnVal

}

function HexToStr(Hex) {
    var HexStr  = Hex.toString();
	var str = '';
	for (var n = 0; n < HexStr.length; n += 2) {
		str += String.fromCharCode(parseInt(HexStr.substr(n, 2), 16));
	}
	return str;
}