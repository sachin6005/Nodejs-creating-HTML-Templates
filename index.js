const fs = require("fs")
const url = require("url")
const http = require("http")


const replaceTemplate = (template, carDetails) =>  {
    let output = template.replace(/{%MAKE%}/g ,carDetails.make).replace(/{%MODEL%}/g ,carDetails.model).replace(/{%YEAR%}/g ,carDetails.year).replace(/{%URL%}/g ,carDetails.url)
    return output
}

const mainHtml  = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/Nodejs-creating-HTML-Templates/index.html", "utf-8")
const singleCar = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/Nodejs-creating-HTML-Templates/cars.html","utf-8")
const data = fs.readFileSync("/home/sachin/Documents/CGCS phase2/NodeJS/Nodejs-creating-HTML-Templates/data.json","utf-8")
const carData = JSON.parse(data)

const server = http.createServer((req,res)=>{
    const path = req.url

    if(path === '/login'){
        res.end("test")
    }

    else if (path === '/cars'){
        res.writeHead(200, {"content-type" : "text/html"})
        const carsCard = carData.map(i => replaceTemplate(singleCar, i)).join('')
        const output = mainHtml.replace(/{%CARS_DATA%}/g , carsCard).replace(/{%TOTAL_COUNT%}/g, carData.length)
        res.end(output)
    }

    else if (path === '/api'){
        res.writeHead(200, {"content-type" : "application/json"} )
        res.end(data)
    }

    else{
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-header' : 'my header'
        })
        res.end( "<h1>Page not found</h1>")
    }
    
})

server.listen(8000, '127.0.0.1', () => {
    console.log("listening on port 8000")
})
