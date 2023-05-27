// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Database, Integration } from "../../../database";

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Integration[]>
) {
    res.status(200).json(Database.getIntegrations());
}
