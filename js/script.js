//document.getElementById('btn-a').addEventListener('click', openList);

/*function openList() {
    let element = document.getElementById('ch-container-1');
    element.classList.toggle('hidden');

    let a = document.getElementById('btn-a');

    if (a.innerHTML === 'Открыть список')
        a.innerHTML = 'Закрыть список'
    else
        a.innerHTML = 'Открыть список'
}*/
/*const----------------------------------------------------------------*/
const L_BTN_1 = document.getElementsByClassName('l-btn')[0];
const L_BTN_2 = document.getElementsByClassName('l-btn')[2];
const L_BTN_3 = document.getElementsByClassName('l-btn')[1];

const T_BTN_1 = document.getElementsByClassName('t-btn')[0];
const T_BTN_2 = document.getElementsByClassName('t-btn')[1];

const SELECTOR = document.getElementById('selector');

const TEXT_AREA_1 = document.getElementsByClassName('textarea')[0];
const TEXT_AREA_2 = document.getElementsByClassName('textarea')[1];

const TABLE_BTN = document.getElementsByClassName('table-btn')[0];

/*vars-----------------------------------------------------------------*/
let text
let text_2

let rows = 1;
let max_rows;

/*listeners------------------------------------------------------------*/
L_BTN_1.addEventListener('click', showLoginForm);
L_BTN_2.addEventListener('click', function(event){
    event.preventDefault();
    let x = submitForm();
    if (x)
        document.getElementsByClassName('form')[0].classList.add('hidden');
});
L_BTN_3.addEventListener('click', logOut);

T_BTN_1.addEventListener('click', saveText);
T_BTN_2.addEventListener('click', clearText);

//TABLE_BTN.addEventListener('click', addRows);

document.addEventListener("DOMContentLoaded", function addText()   {
    fetch("https://raw.githubusercontent.com/denvolk/kitel/master/json/text.json")    //Для GitHub Pages
    //fetch("http://localhost:63342/koktel/json/text.json")   //Для локального использования
        .then(response => response.json())
        .then(data => text = data)
});

document.addEventListener("DOMContentLoaded", function addGridText()   {
    fetch("https://raw.githubusercontent.com/denvolk/kitel/master/json/text.json")    //Для GitHub Pages
    //fetch("http://localhost:63342/koktel/json/text_2.json")   //Для локального использования
        .then(response => response.json())
        .then(data => text_2 = data)
        .then(result => max_rows = Object.keys(text_2).length)
});

//SELECTOR.addEventListener('onchange', setText);

/*methods----------------------------------------------------------------------------------------------------------------------*/
function showLoginForm()    {
    let formClassList = document.getElementsByClassName('form')[0].classList;

    if (formClassList.length === 2 && formClassList[1] === 'hidden')    {
        formClassList.remove('hidden');
    }
    else    {
        formClassList.add('hidden');
    }
}

function alertLogin(mode)   {
    let x = document.getElementsByClassName('alertWindow')[0];
    if (mode === 0) {
        //alert('Успешный вход');
        x.innerHTML = 'Удачный Вход';
        x.style.backgroundColor = "rgba(0, 255, 0, 0.6)";
        x.classList.remove('hidden');
        setTimeout(function (){
            x.innerHTML = 'Неверный Логин';
            x.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
            x.classList.add('hidden');
        }, 4000);
    }
    else if (mode === 1) {
        //alert('Проверьте логин');
        x.innerHTML = 'Проверьте Логин';
        x.classList.remove('hidden');
        setTimeout(function (){
            x.innerHTML = 'Неверный Логин';
            x.classList.add('hidden');
        }, 4000);
    }
    else if (mode === 2) {
        //alert('Проверьте пароль');
        x.innerHTML = 'Проверьте Пароль';
        x.classList.remove('hidden');
        setTimeout(function (){
            x.innerHTML = 'Неверный Логин';
            x.classList.add('hidden');
        }, 4000);
    }
    else if (mode === 3) {
        //alert('Введите логин');
        x.innerHTML = 'Введите Логин';
        x.classList.remove('hidden');
        setTimeout(function (){
            x.innerHTML = 'Неверный Логин';
            x.classList.add('hidden');
        }, 4000);
    }
    else if (mode === 4) {
        //alert('Введите пароль');
        x.innerHTML = 'Введите Пароль';
        x.classList.remove('hidden');
        setTimeout(function (){
            x.innerHTML = 'Неверный Логин';
            x.classList.add('hidden');
        }, 4000);
    }
    else
        alert('Invalid argument');
}

function submitForm()   {
    let login;
    let psw;
    let accept_1 = false;
    let accept_2 = false;

    login = document.getElementById('login-field').value;

    if (typeof login === 'string' && login.trim().length === 0) {
        alertLogin(3);
    }
    else    {
        console.log(login);
        if (login === 'Китель') {
            accept_1 = true;
        }
        else
            alertLogin(1);
    }

    psw = document.getElementById('psw-field').value;

    if (typeof psw === 'string' && psw.trim().length === 0) {
        alertLogin(4);
    }
    else    {
        console.log(psw);
        if (psw === '448') {
            accept_2 = true;
        }
        else
            alertLogin(2);
    }

    if (accept_1 && accept_2)   {
        alertLogin(0);
        document.getElementsByClassName('l-btn')[2].disabled = true;
        document.getElementsByClassName('l-btn')[1].disabled = false;

        let secondRowClassList = document.getElementsByClassName('second-row')[0].classList;
        let textClassList_1 = document.getElementsByClassName('textarea')[0].classList;
        let textClassList_2 = document.getElementsByClassName('textarea')[1].classList;
        let tableClassList = document.getElementsByClassName('table')[0].classList;

        secondRowClassList.remove('hidden');
        textClassList_1.remove('hidden');
        textClassList_2.remove('hidden');
        tableClassList.remove('hidden');

        return true;
    }
    return false;
}

function logOut()   {
    document.getElementsByClassName('l-btn')[2].disabled = false;
    document.getElementsByClassName('l-btn')[1].disabled = true;
    document.getElementById('login-field').value = '';
    document.getElementById('psw-field').value = '';

    document.getElementById('selector').value = 0;
    document.getElementById('textarea-1').value = '';
    document.getElementById('textarea-2').value = '';
    let table = document.getElementById('table');

    for (let iter = rows; iter > 1; iter--)
        table.deleteRow(-1);

    let secondRowClassList = document.getElementsByClassName('second-row')[0].classList;
    let textClassList_1 = document.getElementsByClassName('textarea')[0].classList;
    let textClassList_2 = document.getElementsByClassName('textarea')[1].classList;
    let tableClassList = document.getElementsByClassName('table')[0].classList;

    secondRowClassList.add('hidden');
    textClassList_1.add('hidden');
    textClassList_2.add('hidden');
    tableClassList.add('hidden');

    rows = 1;
}

function saveText() {
    console.log('save');

    if (rows > max_rows)
        return;

    let table = document.getElementById('table');

    let row;
    let cell_0;
    let cell_1;
    let cell_2;
    let cell_3;
    let cell_4;
    let cell_5;

    let rows_str;

    for (let iter = 0; iter < max_rows; iter++) {
        row = table.insertRow(-1);

        cell_0 = row.insertCell(0);
        cell_1 = row.insertCell(1);
        cell_2 = row.insertCell(2);
        cell_3 = row.insertCell(3);
        cell_4 = row.insertCell(4);
        cell_5 = row.insertCell(5);

        rows_str = rows.toString();

        cell_0.innerHTML = text_2[rows_str]["text-1"];
        cell_1.innerHTML = text_2[rows_str]["text-2"];
        cell_2.innerHTML = text_2[rows_str]["text-3"];
        cell_3.innerHTML = text_2[rows_str]["text-4"];
        cell_4.innerHTML = text_2[rows_str]["text-5"];
        cell_5.innerHTML = text_2[rows_str]["text-6"];

        rows++;
    }
    /*let row = table.insertRow(-1);

    let cell_0 = row.insertCell(0);
    let cell_1 = row.insertCell(1);
    let cell_2 = row.insertCell(2);
    let cell_3 = row.insertCell(3);
    let cell_4 = row.insertCell(4);
    let cell_5 = row.insertCell(5);

    let rows_str = rows.toString();

    cell_0.innerHTML = text_2[rows_str]["text-1"];
    cell_1.innerHTML = text_2[rows_str]["text-2"];
    cell_2.innerHTML = text_2[rows_str]["text-3"];
    cell_3.innerHTML = text_2[rows_str]["text-4"];
    cell_4.innerHTML = text_2[rows_str]["text-5"];
    cell_5.innerHTML = text_2[rows_str]["text-6"];

    rows++;*/
}

function clearText()    {
    document.getElementById('textarea-2').value = '';
    console.log('clear');
}


function setText()  {

    if (SELECTOR.value === 'first') {
        const str = text["first"]["text-1"] + "\n" +
            text["first"]["text-2"] + "\n" +
            text["first"]["text-3"] + "\n" +
            text["first"]["text-4"] + "\n" +
            text["first"]["text-5"] + "\n" +
            text["first"]["text-6"]

        //TEXT_AREA_1.value = str;
        document.getElementById('textarea-1').value = str;
    }
    else if (SELECTOR.value === 'second')   {
        const str = text["second"]["text-1"] + "\n" +
            text["second"]["text-2"] + "\n" +
            text["second"]["text-3"] + "\n" +
            text["second"]["text-4"] + "\n" +
            text["second"]["text-5"] + "\n" +
            text["second"]["text-6"]

        //TEXT_AREA_1.value = str;
        document.getElementById('textarea-1').value = str;
    }
    else if (SELECTOR.value === 'third')   {
        const str = text["third"]["text-1"] + "\n" +
            text["third"]["text-2"] + "\n" +
            text["third"]["text-3"] + "\n" +
            text["third"]["text-4"] + "\n" +
            text["third"]["text-5"] + "\n" +
            text["third"]["text-6"]

        //TEXT_AREA_1.value = str;
        document.getElementById('textarea-1').value = str;
    }
}

/*function addRows()  {
    if (rows > max_rows)
        return;

    let table = document.getElementById('table');
    let row = table.insertRow(-1);

    let cell_0 = row.insertCell(0);
    let cell_1 = row.insertCell(1);
    let cell_2 = row.insertCell(2);
    let cell_3 = row.insertCell(3);
    let cell_4 = row.insertCell(4);
    let cell_5 = row.insertCell(5);

    let rows_str = rows.toString();

    cell_0.innerHTML = text_2[rows_str]["text-1"];
    cell_1.innerHTML = text_2[rows_str]["text-2"];
    cell_2.innerHTML = text_2[rows_str]["text-3"];
    cell_3.innerHTML = text_2[rows_str]["text-4"];
    cell_4.innerHTML = text_2[rows_str]["text-5"];
    cell_5.innerHTML = text_2[rows_str]["text-6"];

    rows++;
}*/

/*window.onload = () =>   {
    // Ваша формула
    let y = x => 2*x*x+3*x-1;
    let scale = 20;
    let step = 1;
    let cnvs = document.querySelector('canvas');
    let ctx = cnvs.getContext('2d');

    ctx.lineWidth = 0.5;

    for (var i = step*scale; i < cnvs.width; i += step*scale) { //вертикальные
        polyline('#7a7979', [[i, 0], [i, cnvs.height]]);
    }

    for (var i = step*scale; i < cnvs.height; i += step*scale) { //Горизонтальные
        polyline('#7a7979', [[0, i], [cnvs.width, i]]);
    }

    ctx.lineWidth = 2;
    let pts = [];
    for(let x = -cnvs.width/2; x<cnvs.width/2; x+=5) {
        pts.push([cnvs.width/2+x, cnvs.height/2 - y(x/scale)*scale]);
    }
    polyline('blue', pts);

//Ось X
    polyline('red', [[0, cnvs.height / 2], [cnvs.width, cnvs.height / 2]]);

// ось Y
    polyline('green', [[cnvs.width / 2, 0], [cnvs.width / 2, cnvs.height]]);

    function polyline(color, pts) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p));
        ctx.stroke();
    }
}*/
