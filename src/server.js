const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o red.body
server.use(express.urlencoded({ extended:true }))

//Utilizando template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express:server,
    noCache:true
})

//inicial page
//req: Requisition
//res: Resposta
server.get("/", (req, res) =>{
    return res.render("index.html", {title:"Um titulo"})
})

server.get("/create-point", (req, res) =>{

    



    return res.render("create-point.html")
    
})

server.post("/savepoint", (req, res) =>{

    //inseir dados
    const query = `
         INSERT INTO places (
             image,
             name,
             address,
             address2,
             state,
             city,
             items
         ) VALUES (?, ?, ?, ?, ?, ?, ?);
     `
     const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
     ]

     function afterInsertData(err) {
         if(err) {
             console.log(err)
             return res.send("Erro no cadastro")
         }

         console.log('Cadastrado com sucesso')
         console.log(this)

         return res.render("create-point.html", {saved:true})
     }

     db.run(query, values, afterInsertData)



})

server.get("/search", (req, res) =>{

    const search = req.query.search
    if (search == ""){
        //pesquisa vazia
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {total: 0})
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
      })
    
})



//start up the server
server.listen(3000)