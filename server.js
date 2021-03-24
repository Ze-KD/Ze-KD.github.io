// $ node ./Documents/Maths/Code/HTML2/Project-Node/server.js
 
var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {

    console.log('Get server on 8080'+req.url)
    log(req)

    
    
    var q = url.parse(req.url, true);
    if (q.pathname == ''){
        console.log('bug : not /') 
        // 418 Im a teapot
        res.writeHead(200,{"Content-Type": "text/html; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"})
        res.write('q.pathname:'+q.pathname)
        res.end()
    }

    else if (q.pathname == '/'){
        //res.redirect = 'http://localhost:8080/index.html'
        res.writeHead(308, {'Location': 'http://localhost:8080/index.html'});
        res.end();
    }
    
    else if (q.pathname == '/get' && q.search != '' ){get(res,q)}

    else if (q.pathname == '/log'  ){ 
        var path = './Documents/Maths/Code/HTML2/Project-Node/save2.json'

        fs.readFile(path,function(err,data){
            if (! err){

                data = data.toString('utf8')
                data = JSON.parse(data)

                //console.log('x3 log :', typeof(data.log), data.log.length)

                res.writeHead(200,{"Content-Type": "text/html; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"})

                res.write(' <h1> &emsp;Log : </h1><ul>')

                for (let i = 0 ; i < data.log.length ; i++){
                    res.write('<li>'+data.log[i].h + 
                    '&emsp;&emsp;&emsp;'+
                    data.log[i].file+'<br>');
                }
                
                res.write('</ul><br> END')
                return res.end(); 
            }
            else {console.log('error',err);process.exit()}
        });
    }

    else if (q.pathname == '/save.json'  ){ get_file(req,res,'save2.json','json')}
    else if (q.pathname == '/page.html'  ){ get_file(req,res,'index.html','html')}
    else if (q.pathname == '/index.html' ){ get_file(req,res,'index.html','html')}
    else if (q.pathname == '/style.css'  ){ get_file(req,res,'style.css','css')}
    else if (q.pathname == '/script.js'  ){ get_file(req,res,'script.js','javascript')}
    else if (q.pathname.substr(0,6) == '/file/'){ get_file(req,res,q.pathname.substr(6),q.pathname.split('.')[1])}

    else {
        res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8","Access-Control-Allow-Origin": "*"});
        res.write(' <h1 style="display: flex; justify-content: center; margin: 30 0;">'+
        ' 404 : page not found </h1><br>')
        res.write('No data to see on : <b> http://localhost:8080'+req.url);
        res.write('</b><br> q.host:'+q.host+'<br> q.pathname:'+q.pathname+'<br> q.search:'+q.search)
        res.write('<br> q.query='+JSON.stringify(q.query))
        return res.end();
    }
    
}).listen(8080); 

function get(res,q){
    //console.log('1 get:',q.query)

    var path = './Documents/Maths/Code/HTML2/Project-Node/save2.json'

    fs.readFile(path,function(err,data){
        if (err){console.log('0 error :',err)}
        
        data = data.toString('utf8')
        data = JSON.parse(data)
    
        if (q.query.msg != undefined && q.query.msg != null && 
            q.query.autor != undefined && q.query.autor!=null){
            data.message.push({"msg":q.query.msg, "name":q.query.autor, "h":Date().substr(0,24)})
        }

        if (data != undefined && data != null  ){
            fs.writeFile(path,JSON.stringify(data),function(){})
        }

        res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8","Access-Control-Allow-Origin": "*"});
        res.write('A title data <br> q.query='+JSON.stringify(q.query))
        res.write(' <br> My json:'+JSON.stringify(data))
        return res.end();
    } )
}

function log(req){
    var path = './Documents/Maths/Code/HTML2/Project-Node/save2.json'

    fs.readFile(path,function(err,data){
        if (err){console.log('error :',err)}
        
        data = data.toString('utf8')
        data = JSON.parse(data)
    
        if (data != undefined && data != null && data != '' && data != ' ' ){
            if (req.url != undefined){
                data.log.push({"file":req.url, "h":Date().substr(0,24)})
                fs.writeFile(path,JSON.stringify(data),function(){})
            }
        }
    } )
}

function get_file(req,res,name,type='html'){
    if (type == 'js'){type='javascript'}
    fs.readFile('./Documents/Maths/Code/HTML2/Project-Node/'+name, function (err,data) {
        if (! err){
            res.writeHead(200, {"Content-Type": "text/"+type+"; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"})
            //data.toString('utf8')
            res.write(data);
            return res.end(); 
        }
        else {console.log('error',err);process.exit()}
    });
}