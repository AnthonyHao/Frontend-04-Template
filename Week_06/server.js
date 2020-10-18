const http = require("http")

http.createServer((request, response) => {
  let body = []
  request.on("error", (err) => {
    console.error(1, err)
  }).on("data", (chunk) => {
    console.log(chunk.toString(), typeof(chunk), chunk)
    // chunk.toString is wrong
    body.push(chunk)
  }).on("end", () => {
    body = Buffer.concat(body).toString()
    console.log("body:", body)
    response.writeHead(200, {"Content-Type": "text/html"})
    response.end("Hello world")
  })
}).listen(8088)

console.log("server started")
