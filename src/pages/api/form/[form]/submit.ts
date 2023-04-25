// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    const { form } = req.query
    switch (req.method) {
      case "GET":
        res.status(200).json((await globalThis.postgres.query(`select submition.* from submition  where submition.form = ${form}`)).rows)
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
