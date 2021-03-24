console.log('Start')
var rep ;
var ret ;

function add(){
    var input = document.getElementById("input").value ;
    var name = document.getElementById("input-name").value ;
    //document.getElementById("input").value = '';
    ret = {'input': input, 'name':name }
    console.log('input',ret);
    console.log(''+input+';'+name)

    $.get("http://localhost:8080/get?msg="+input+'&autor='+name, console.log('Send'))
    

    //apnd(input);

    apnd(input, name, Date().substr(0,24))
}

function apnd(txt,name="base",h="no"){
    let m = document.getElementById("add") ;
    let newSpan = document.createElement('div');
    let Dname = document.createElement('span');
    let Dh = document.createElement('span');
    let Dtxt = document.createElement('span');

    Dtxt.textContent = txt;
    Dname.textContent = name;
    Dh.textContent = h;

    Dname.classList.add('class-name');
    Dh.classList.add('class-h');
    Dtxt.classList.add('class-txt');

    newSpan.append(Dname)
    newSpan.append(Dh)
    newSpan.append(document.createElement('br'));
    newSpan.append(document.createElement('br'));
    newSpan.append(Dtxt)


    m.append(newSpan);
    for (let i=1; i<=1;i++){
        m.append(document.createElement('br'));
    }

    console.log("apnd End")
}

function save(object){
    myObj = rep;
    console.log('s-',rep)
    myObj["msg"].push(object)
    console.log('s',myObj)
    myJSON = JSON.stringify(myObj);
    console.log('s2',myJSON)
    //localStorage.setItem("testJSON", myJSON);
}

function load(){
    //var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    //var requestURL = 'file:///Users/yann/Documents/Maths/Code/HTML2/Project-Groupe/save.json';
    //var requestURL =  "https://ze_kd.gitlab.io/teste2/save.json";
    var requestURL = "http://localhost:8080/save.json"
    //requestURL = "data.json"

    $.get(requestURL,function(data){get(data)})


    function get(data){
        rep = data;
        console.log('get');

        for (let i=0; i < rep.message.length ; i++){
            
            apnd(rep.message[i]["msg"], rep.message[i]["name"], rep.message[i]["h"].substr(0,24) );
        }
    }
}

load()

/*

cours : https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON

JSON -- JSON.parse() --> JS

JS -- JSON.stringify() --> JSON

*/

