// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import MongoDb, { MongoClient } from "mongodb"

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
      res.status(200).json([
        {name:"first"},
        {name:"second"}
      ])
      //res.status(200).json(await forms.find().toArray)
      break
    case "POST":
      console.log(req.body)
      res.status(200).json("ok")
  }
}
