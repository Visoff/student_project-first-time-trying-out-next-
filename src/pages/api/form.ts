// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import MongoDb, { MongoClient } from "mongodb"
import { Client } from "pg"

const postgres = new Client({
  user:"some_user",
  host:"localhost",
  database:"dev",
  password:"some_password",
  port:5432
})

postgres.connect()

let forms:MongoDb.Collection;
new MongoClient("mongodb://localhost:27017").connect().then((e) => {
  console.log("mongodb connected")
  forms = e.db("Student_labs").collection("forms")
})

interface Form {
  name:"",
  type:"",
  placeholder?:"",
  defalultValue?:""
}

let array: Form[] = [

]



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      res.status(200).json((await postgres.query("select field.* from field inner join page on page.id = field.form_page and page.form = 1")).rows)
      break
    case "POST":
      console.log(req.body)
      res.status(200).json("ok")
      break
    case "PUT":
      break
  }
}
