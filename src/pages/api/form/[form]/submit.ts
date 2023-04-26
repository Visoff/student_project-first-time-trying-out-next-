// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    const { form } = req.query
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query(`select submition_value.*, field.header as field_header from submition_value inner join submition on submition_value.submition = submition.id and submition.form = ${form} inner join field on submition_value.field = field.id`)).rows satisfies {id:number, field:number, value:string, submition:number, field_header:string}[])
      break
      case "POST":
        const body = JSON.parse(req.body)
        const id = (await globalThis.postgres.query(`insert into submition(form) values(${form}) returning id`)).rows[0].id
        await Promise.all([
            Object.keys(body).map(key => {
                return globalThis.postgres.query(`insert into submition_value(field, value, submition) values(${key}, '${body[key]}', ${id})`)
            })
        ])
        res.status(200).json("ok")
        break
  }
}
