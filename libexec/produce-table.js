const path = require('path')
const readXlsxFile = require('read-excel-file/node');

// File path.

let upperPaneHTML = ""
let lowerPaneHTML = ""

readXlsxFile(path.resolve(__dirname, 'paradigms.xlsx')).then((rows) => {
    let upperPaneDone = false
    rows.forEach(row=>{
        if (! (["Present", "Person", "Past"].includes(row[0]))){
            const tdHTML = row.map((cell, colInd)=>{
                if (colInd !== 0 && cell && ! isNaN(cell[0])) return `\t<td/>\n\t<td>${cell}</td>`
                if (cell){
                    if (isNaN(cell[0])) return `\t<PlayableTD>${cell}</PlayableTD>`

                    return `\t<td>${cell}</td>`
                }else{
                    return "\t<td/>"
                }
            }).join('\n')
            const trHTML = `<tr>\n${tdHTML}\n</tr>\n`
            if (upperPaneDone){
                lowerPaneHTML += trHTML
            }else{
                upperPaneHTML += trHTML
            }

        }else if (row[0] === "Past"){
            upperPaneDone = true
        }
    })
    console.log(upperPaneHTML)
    console.log("-----------------------\n")
    console.log(lowerPaneHTML)
})



