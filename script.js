document.querySelector("#calcular").addEventListener('click', function () {
    let entrada = document.querySelector("#entrada").value;
    if (entrada != "") {
        app(entrada);
    }
})

document.querySelector("#b1").addEventListener('click', function (e) {
    document.querySelector("#entrada").value = e.srcElement.parentElement.parentElement.querySelectorAll("div")[1].querySelector("div").textContent;
})

document.querySelector("#b2").addEventListener('click', function (e) {
    document.querySelector("#entrada").value = e.srcElement.parentElement.parentElement.querySelectorAll("div")[1].querySelector("div").textContent;
})

document.querySelector("#b3").addEventListener('click', function (e) {
    document.querySelector("#entrada").value = e.srcElement.parentElement.parentElement.querySelectorAll("div")[1].querySelector("div").textContent;
})

document.querySelector("#b4").addEventListener('click', function (e) {
    document.querySelector("#entrada").value = e.srcElement.parentElement.parentElement.querySelectorAll("div")[1].querySelector("div").textContent;
})

document.querySelector("#borrar").addEventListener('click', function (e) {
    document.querySelector("#entrada").value = "";
})

// FUNCIONALIDAD
function app(entrada) {
    let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    // let input = "0,4,8,5,12,7,11,15";
    // let input = "0,2,3,5,7,8,10,11,13,15,22,29,30";
    // let input = "0,1,5,6";
    // let input = "5,7,10,13,15";
    // let input = "0,4,5,7,8,11,12,15";
    // let input = "0,1,2,8,10,11,14,15";
    // let input = "0,1,2,3,6,8,9,10,11,17,20,21,23,25,28,30,31";
    // let input = "0,1,2,4,5,7,8,9,10,12,13,15";
    // let input = "0,1,2,3,7,8,11,12,13,14";
    // let input = "0,1,3,4,6,7,8,9,11,12,13,14,15";
    // let input = "1,3,5,6,7,9,11,13,14,15,17,19,21,22,23,24,25,26,27,28,29,30,31";

    let splitInput = entrada.trim().split(',');

    let variable = 2;

    let grupo = [];
    let index = 0;

    for (const i of splitInput) {
        if (i >= Math.pow(2, variable)) {
            variable++;
        }
    }

    function count(text, search) {
        let len = text.length
        let count = 0;
        for (let i = 0; i < len; i++) {
            if (text[i] == search) {
                count++;
            }
        }
        return count;
    }

    // function isRepeted(arr, text) {
    //     let repeted = false;
    //     for (let i = 0; i < arr.length; i++) {
    //         for (let i2 = 0; i2 < arr[i].length; i2++) {
    //             if (arr[i][i2].includes(text)) {
    //                 repeted = true;
    //             }
    //         }
    //     }
    //     return repeted;
    // }

    function isRepeted(arr, text) {
        let repeted = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes(text)) {
                repeted = true;
            }
        }
        return repeted;
    }

    function found(arr, text) {
        let foundArr = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][1] == text) {
                foundArr = i;
                break;
            }
        }
        return foundArr;
    }

    let insert = "";
    let tabla1 = ""
    tabla1 += "<table border=1><thead><tr><th>M</th>"

    let len = Math.pow(2, variable);
    let s = [];

    for (let i = 0; i < variable; i++) {
        s[i] = 0;
        tabla1 += "<th>" + abc[i].toUpperCase() + "</th>";
    }

    tabla1 += "<th>indice</th></tr></thead><tbody>";



    for (let i = 0; i < len; i++) {
        let bin = "";
        let temp = len;
        if (splitInput.includes(String(i))) {
            tabla1 += "<tr><td>" + i + "</td>";
        }
        for (let i2 = 0; i2 < variable; i2++) {
            temp /= 2;
            if (i % temp == 0 && i != 0) {
                if (s[i2] == 0) {
                    s[i2] = 1;
                } else {
                    s[i2] = 0;
                }
            }
            if (splitInput.includes(String(i))) {
                tabla1 += "<td>";
                if (s[i2] == 1) {
                    tabla1 += "1"
                    bin += "1"
                } else {
                    tabla1 += "0"
                    bin += "0";
                }
                tabla1 += "</td>";
            }
        }
        if (splitInput.includes(String(i))) {
            let countOnes = count(bin, "1");
            tabla1 += "<td>" + countOnes + "</td>";
            tabla1 += "</tr>";
            grupo[index++] = i + "," + bin + "," + countOnes;
        }
        bin = "";
    }

    tabla1 += "</tbody></table>";

    document.querySelector("#tabla1").innerHTML = tabla1;
    let groupOrdered = [];
    index = 0;
    let index2 = 0;
    let index_element = 0;
    for (let i = 0; i < grupo.length; i++) {
        let temp = [];

        for (let i2 = 0; i2 < grupo.length; i2++) {
            if (grupo[i2].split(',')[2] == String(index)) {
                temp[index_element++] = grupo[i2];
            }
        }
        if (temp != 0) {
            groupOrdered[index2++] = temp;
        }
        index++;
        index_element = 0;
    }

    let tabla2 = "";
    tabla2 += "<table border=1><thead><tr><th>Grupo</th><th>M</th>"
    for (let i = 0; i < variable; i++) {
        tabla2 += "<th>" + abc[i].toUpperCase() + "</th>";
    }
    tabla2 += "</tr></thead><tbody>"

    let rowspan = false;
    for (let i = 0; i < groupOrdered.length; i++) {
        for (let i2 = 0; i2 < groupOrdered[i].length; i2++) {
            tabla2 += "<tr>";
            let row = groupOrdered[i][i2].split(',');
            if (groupOrdered[i].length > 1 && rowspan == false) {
                tabla2 += "<td rowspan=" + groupOrdered[i].length + ">" + i + "</td>";
                rowspan = true;
            }
            if (groupOrdered[i].length == 1) {
                tabla2 += "<td>" + i + "</td>";
            }
            tabla2 += "<td>" + row[0] + "</td>";
            for (let i3 = 0; i3 < variable; i3++) {
                tabla2 += "<td>" + row[1][i3] + "</td>";
            }
            tabla2 += "</tr>";
        }
        rowspan = false;
    }

    tabla2 += "</tbody></table>";
    document.querySelector("#tabla2").innerHTML = tabla2;

    let proc = "";
    let rr = 0;

    function compare(from, map = [], index4 = 0, excep = 0, tables = 1, tabla = "") {
        let index = 0;
        let notEqual = [];
        let to = [];
        let index3 = 0;
        let errorCmp = 0;
        let index_element = 0;
        if (from.length == 1) {
            map[index4++] = from[0][0];
        }
        // consoles.log(from.length - 1);
        for (let i = 0; i < from.length - 1; i++) {
            let tempArr = [];

            if (from[i] != undefined) {
                for (let i2 = 0; i2 < from[i].length; i2++) {
                    let temp = "";
                    let row1 = from[i][i2].split(',');
                    // console.log(from[i + 1] == undefined);
                    // console.log(from[i + 1] == "");
                    if (from[i + 1] != undefined) {
                        for (let i3 = 0; i3 < from[i + 1].length; i3++) {

                            let row2 = from[i + 1][i3].split(',');
                            for (let i4 = 0; i4 < row2[1].length; i4++) {
                                if (row1[1][i4] == row2[1][i4]) {
                                    if (row1[1][i4] == "0") {
                                        temp += "0";
                                    } else if (row1[1][i4] == "-") {
                                        temp += "-";
                                    } else {
                                        temp += "1";
                                    }
                                } else {
                                    temp += "-";
                                    errorCmp++;
                                }
                            }
                            // console.log('-----------------');
                            // console.log(row1[0] + " " + row1[1]);
                            // console.log(row2[0] + " " + row2[1]);
                            // console.log(errorCmp + " " + errorCmp);
                            // console.log('-----------------');
                            if (errorCmp < 2) {

                                if (isRepeted(tempArr, temp) == false) {
                                    tempArr[index_element++] = row1[0] + " " + row2[0] + "," + temp;
                                    to[index] = tempArr;
                                    // console.log(to );
                                }

                                let indexFound = found(notEqual, row1[0] + " " + row1[1]);
                                if (indexFound != -1) {
                                    notEqual[indexFound] = [1, row1[0] + " " + row1[1], 1];
                                } else {
                                    notEqual[index3++] = [1, row1[0] + " " + row1[1], 1];
                                }

                                let indexFound2 = found(notEqual, row2[0] + " " + row2[1]);
                                if (indexFound2 != -1) {
                                    notEqual[indexFound2] = [1, row2[0] + " " + row2[1], 1];
                                } else {
                                    notEqual[index3++] = [1, row2[0] + " " + row2[1], 1];
                                }
                            } else {

                                let indexFound = found(notEqual, row1[0] + " " + row1[1]);
                                let indexFound2 = found(notEqual, row2[0] + " " + row2[1]);

                                if (indexFound == -1) {
                                    notEqual[index3++] = [1, row1[0] + " " + row1[1], 0];
                                }

                                if (indexFound2 == -1) {
                                    notEqual[index3++] = [1, row2[0] + " " + row2[1], 0];
                                }
                            }
                            temp = "";
                            errorCmp = 0;
                        }
                    } else {
                        let indexFound = found(notEqual, row1[0] + " " + row1[1]);

                        if (indexFound == -1) {
                            notEqual[index3++] = [1, row1[0] + " " + row1[1], 0];
                        }
                        console.log(notEqual);
                    }
                }
            } else {
                // console.log(from[i + 1]);
                for (let i3 = 0; i3 < from[i + 1].length; i3++) {
                    let row2 = from[i + 1][i3].split(',');

                    let indexFound = found(notEqual, row2[0] + " " + row2[1]);

                    if (indexFound == -1) {
                        notEqual[index3++] = [1, row2[0] + " " + row2[1], 0];
                    }
                    console.log(notEqual);
                }
            }
            index_element = 0;
            // console.log(tempArr);
            if (tempArr == 0 && rr == 0) {
                excep = 1;

            } else {
                excep = 0;

            }
            // rr = 1;
            tempArr = [];
            index++;
        }

        for (let i = 0; i < notEqual.length; i++) {
            if (notEqual[i][2] == 0) {
                map[index4++] = notEqual[i][1];
            }
        }
        notEqual = [];
        index3 = 0;
        if (to.length >= 1) {
            tabla += "<table border=1><thead><tr><th>Tabla " + tables + "</th><tr></thead><tbody>";

            for (let i = 0; i < to.length; i++) {
                for (let i2 = 0; i2 < to[i].length; i2++) {
                    tabla += "<tr><td>" + to[i][i2] + "</tr></td>";
                }
                tabla += "<tr><td>------------</tr></td>";
            }
            tabla += "</tbody></table>";
            tables++;
            return compare(to, map, index4, excep, tables, tabla);
        } else {
            proc = tabla;
            return map;
        }

    }

    const sortAlphaNum = (a, b) => a.toString().localeCompare(b, 'es', {
        numeric: true
    });

    let group1 = compare(groupOrdered);

    group1 = group1.sort(sortAlphaNum);

    for (let i = 0; i < group1.length; i++) {
        let s = group1[i];
        s = s.substr(0, s.length - 6) + "," + s.substr(-5);
        console.log(s);
        proc = proc.replace(new RegExp(s), s + " | X");
    }

    document.querySelector("#procedimientos").innerHTML = proc;

    console.log(group1);

    let finales = "<table border=1><thead><tr><th colspan=3></th>";
    for (let i = 0; i < grupo.length; i++) {
        finales += "<th>" + grupo[i].split(',')[0] + "</th>";
    }

    let implicants = [group1.length];

    let allImplicants = [];
    let indexAllImplicants = 0;
    finales += "</tr></thead><tbody>";
    for (let i = 0; i < group1.length; i++) {
        let tempArr = [];
        let row = group1[i].replace(/,/g, ' ');
        let col1 = row.substr(0, row.lastIndexOf(" "));
        let col3 = row.substr(row.lastIndexOf(" ") + 1);
        let conversion = "";
        for (let i2 = 0; i2 < col3.length; i2++) {
            if (col3[i2] != "-") {
                if (col3[i2] == "0") {
                    conversion += "~";
                }
                conversion += abc[i2];
            }
        }
        finales += "<tr>";
        finales += "<td>" + col1 + "</td>";
        finales += "<td>" + conversion + "</td>";
        finales += "<td>" + col3 + "</td>";
        // allImplicants[indexAllImplicants++] = col1;
        for (let i2 = 0; i2 < grupo.length; i2++) {
            let splitCol1 = col1.split(' ');
            let found = false;
            for (let i3 = 0; i3 < splitCol1.length; i3++) {
                if (grupo[i2].split(',')[0] == splitCol1[i3]) {
                    tempArr[i2] = col1 + ",x" + i + "-" + i2 + "," + grupo[i2].split(',')[0] + "," + col3;
                    finales += "<td>x</td>";
                    found = true;
                }
            }
            if (found == false) {
                finales += "<td></td>";
                tempArr[i2] = "";
            }
        }
        implicants[i] = tempArr;
        tempArr = [];
        finales += "</tr>";
    }

    document.querySelector("#finales").innerHTML = finales;

    // implicants[1][1] = "x1-1";
    // console.table(implicants);

    let countX = 0;
    let lastX = 0;
    let xUsed = [];
    let indexXused = 0;

    let implicants1 = [];
    let indexImplicants1 = 0;

    let implicants2 = [];
    let indexImplicants2 = 0;

    let implicants3 = [];
    let indexImplicants3 = 0;
    // console.log(grupo);

    // grupo -> COLUMNAS
    // gruoup1 -> FILAS

    // BUSCAMOS LAS COLUMNAS CON UNA X
    // ENTRAMOS A LAS COLUMNAS
    for (let i = 0; i < grupo.length; i++) {
        // ENTRAMOS A LAS FILAS
        for (let i2 = 0; i2 < group1.length; i2++) {
            if (implicants[i2][i].includes('x')) {
                countX++;
                lastX = i2;
            }
            if (i2 == group1.length - 1) {
                if (countX == 1) {
                    if (xUsed.indexOf(implicants[lastX][i]) == -1) {
                        implicants1[indexImplicants1++] = implicants[lastX][i];
                        for (let i3 = 0; i3 < grupo.length; i3++) {
                            if (implicants[lastX][i3].includes('x')) {
                                if (xUsed.indexOf(implicants[lastX][i3]) == -1) {
                                    xUsed[indexXused++] = implicants[lastX][i3];
                                }
                            }
                        }
                    }
                }
            }
        }
        countX = 0;
    }

    // EXPANDIMOS VERTICALMENTE EN TODAS LAS X
    for (let i = 0; i < grupo.length; i++) {
        for (let i2 = 0; i2 < group1.length; i2++) {

            if (implicants[i2][i].includes('x') && xUsed.indexOf(implicants[i2][i]) != -1) {

                for (let i3 = 0; i3 < group1.length; i3++) {
                    if (implicants[i3][i].includes('x')) {
                        if (xUsed.indexOf(implicants[i3][i]) == -1) {
                            xUsed[indexXused++] = implicants[i3][i]; //+ "Y";
                        }
                    }
                }
            }
        }
        countX = 0;
    }

    let union = [];
    let indexUnion = 0;

    for (let i = 0; i < implicants1.length; i++) {
        for (let i2 = 0; i2 < implicants1[i].split(',')[0].split(' ').length; i2++) {
            union[indexUnion++] = implicants1[i].split(',')[0].split(' ')[i2];
        }
    }

    let falta = [];
    let indexFalta = 0;

    for (let i2 = 0; i2 < splitInput.length; i2++) {
        if (union.indexOf(splitInput[i2]) == -1) {
            falta[indexFalta++] = splitInput[i2];
        }
    }

    console.log(falta);

    let lastXarr = [];
    let indexLastXarr = 0;

    // let tempArr = [];

    // BUSCAMOS LAS COLUMNAS CON 2 O MÁS X
    for (let i = 0; i < grupo.length; i++) {
        // RECORREMOS LAS FILAS
        for (let i2 = 0; i2 < group1.length; i2++) {
            // SI TIENE X ENTRAMOS / SI NO HA SIDO USADA
            if (implicants[i2][i].includes('x') && xUsed.indexOf(implicants[i2][i]) == -1) {
                let contiene = true;
                let tempFalta = falta;
                let tempxUsed = xUsed;
                let tempindexXused = indexXused;

                let col = [];
                let indexCol = 0;

                let ocupado = false;

                let posibleImplicant = [];
                let indexPosibleImplicant = 0;
                let inicioPosible = 0;

                let alternativeImplicant = [];
                let indexAlternativeImplicant = 0;

                let tempImplicant = [];
                let indexTempImplicant = 0;

                let filaPrimeraCoincidencia = 0;
                let columnaPC = 0;

                console.log("FILA: " + i2 + " | " + implicants[i2][i])
                // RECORREMOS LAS COLUMNAS
                for (let i3 = 0; i3 < grupo.length; i3++) {
                    // SI HAY X
                    if (implicants[i2][i3].includes('x')) {
                        // SI NO HA SIDO USADA
                        if (tempxUsed.indexOf(implicants[i2][i3]) == -1) {
                            // BUSCAMOS SI TIENE UN VALOR QUE NOS FALTA
                            console.log("NOS FALTA:");
                            console.log(tempFalta);
                            let index = tempFalta.indexOf(implicants[i2][i3].split(',')[2]);
                            console.log("VALOR ACTUAL: " + implicants[i2][i3].split(',')[2]);
                            if (index == -1) {
                                // REDUNDANTE
                                console.log("YA LO TENEMOS: " + implicants[i2][i3])
                                // NO EXPANDIMOS
                                contiene = false;
                            } else {
                                // INCOMPLETO
                                console.log("NO LO TENEMOS: " + implicants[i2][i3])
                                if (ocupado == true) {
                                    // GUARDAMOS PRIMERA COINCIDENCIA
                                    if (filaPrimeraCoincidencia == 0) {
                                        filaPrimeraCoincidencia = i2;
                                        columnaPC = i3;
                                        filaPrimeraCoincidencia = 1;
                                    }
                                    if (inicioPosible == 0) {

                                        posibleImplicant[indexPosibleImplicant] = [1, i2];
                                        inicioPosible = 1;
                                    } else {
                                        posibleImplicant[indexPosibleImplicant][0] += 1;
                                    }
                                }
                                // col[indexCol++] = i3;
                                // tempxUsed[tempindexXused++] = implicants[i2][i3];
                                // tempFalta[index] = '-';
                            }
                        } else {
                            console.log("ESTÁ OCUPADO: " + implicants[i2][i3]);
                            // NO EXPANDIMOS
                            ocupado = true;
                        }
                    }
                }
                // indexPosibleImplicant++;

                let alternativas = false;
                console.log("TIENE VALORES: " + posibleImplicant)
                // SI ESTÁ OCUPADO, BUSCAMOS ALTERNATIVAS
                if (ocupado == true) {
                    for (let i3 = 0; i3 < group1.length; i3++) {
                        // BUSCAMOS UNA X EN LA COLUMNA DE LA PRIMERA COINCIDENCIA
                        if (implicants[i3][columnaPC].includes('x')) {
                            // SALTAMOS LA PRIMERA COINCIDENCIA
                            if (i3 != filaPrimeraCoincidencia) {
                                alternativas = true;
                                let unico = 0;
                                for (let i4 = 0; i4 < grupo.length; i4++) {
                                    // SI HAY X EN LAS ALTETNATIVAS
                                    if (implicants[i3][i4].includes('x')) {
                                        // SI NO HA SIDO USADA
                                        if (tempxUsed.indexOf(implicants[i3][i4]) == -1) {
                                            let index = tempFalta.indexOf(implicants[i3][i4].split(',')[2]);
                                            if (index != -1) {
                                                if (unico == 0) {
                                                    alternativeImplicant[indexAlternativeImplicant] = [1, i3];
                                                    unico = 1;
                                                } else {
                                                    alternativeImplicant[indexAlternativeImplicant][0] += 1;
                                                }
                                            }
                                        }
                                    }
                                }
                                indexAlternativeImplicant++;
                            }
                        }
                    }
                }

                if (ocupado == true) {

                    let expand = 0;

                    for (let i3 = 0; i3 < alternativeImplicant.length; i3++) {
                        if (alternativeImplicant[i3][0] > posibleImplicant[0][0]) {
                            expand = alternativeImplicant[i3][1];
                        }
                        if (alternativeImplicant[i3][0] == posibleImplicant[0][0]) {
                            console.log("igual");
                            expand = posibleImplicant[0][1];
                        }
                    }

                    console.log(posibleImplicant);
                    console.log(alternativeImplicant);

                    for (let i3 = 0; i3 < grupo.length; i3++) {
                        if (
                            implicants[expand][i3].includes('x') &&
                            xUsed.indexOf(implicants[expand][i3]) == -1
                        ) {
                            console.log("implicants[expand][i3] " + expand);
                            implicants1[indexImplicants1++] = implicants[expand][i3];
                            xUsed[indexXused++] = implicants[expand][i3];
                            for (let i = 0; i < grupo.length; i++) {

                                if (implicants[expand][i].includes('x') &&
                                    xUsed.indexOf(implicants[expand][i]) == -1) {

                                    for (let i3 = 0; i3 < group1.length; i3++) {
                                        if (implicants[i3][i].includes('x')) {
                                            if (xUsed.indexOf(implicants[i3][i]) == -1) {
                                                xUsed[indexXused++] = implicants[i3][i]; //+ "Y";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                console.log("-------");
            }
        }
    }

    let resultado = "F = ";
    for (i3 = 0; i3 < implicants1.length; i3++) {
        let conversion = "";
        let col3 = implicants1[i3].split(',')[3];
        for (let i2 = 0; i2 < col3.length; i2++) {
            if (col3[i2] != "-") {
                if (col3[i2] == "0") {
                    conversion += "~";
                }
                conversion += abc[i2];
            }
        }
        resultado += conversion + ((i3 < implicants1.length - 1) ? " + " : "");
    }

    document.querySelector("#resultados").innerHTML = resultado;
}