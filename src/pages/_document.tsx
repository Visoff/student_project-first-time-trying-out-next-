import { Html, Head, Main, NextScript } from 'next/document'
import { Client } from "pg"

declare global {
  var postgres:Client
}

const postgres = new Client({
  user:process.env.DB_USER,
  host:process.env.DB_HOST,
  database:"dev",
  password:process.env.DB_PASSWORD,
  port:5432
})

postgres.connect().then(e => {console.log("postgres connected")}).catch(e => {console.error(e)})
globalThis.postgres = postgres

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
