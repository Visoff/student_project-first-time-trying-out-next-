var https = require('https');
var fs = require('fs');

const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

const pg = require("pg")
const postgres = new pg.Client({
    user:process.env.DB_USER||"some_user",
    host:process.env.DB_HOST||"db",
    database:"dev",
    password:process.env.DB_PASSWORD||"some_password",
    port:5432
  })
  
  postgres.connect().then(e => {console.log("postgres connected")}).catch(e => {console.error(e)})
  globalThis.postgres = postgres

/*var options = {
    key: fs.readFileSync('ssl.key'),
    cert: fs.readFileSync('ssl.crt'),
    ca: [fs.readFileSync('root.crt')]
};
*/
app.prepare().then(() => {
    https.createServer(options, (req, res) => {
        // handle ....
    }).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${port}`)
    })
})