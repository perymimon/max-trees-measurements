export function csvParser(string, params){
   const{
    rowDelimiter = /\r?\n/,    columnDelimiter = /[;,\t]/,
    header = true,    removeFirstColumn = true,
    excludeHeader = false,
    } = params;
    var rows = string.split(rowDelimiter);
    var result = [];

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var columns = row.split(columnDelimiter);
        result.push(columns);
    }

    // remove first column
    if(removeFirstColumn) {
        for (let i = 0; i < result.length; i++) {
            result[i].shift();
        }
    }

    if (header || excludeHeader) {
        let _header = result[0];
        result.shift();
        if (excludeHeader) {
            return result
        }
        return {
            header:_header,
            data: result
        };

    }
    debugger
    return result;

}