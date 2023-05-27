// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Database, Integration, IntegrationField } from "../../../database";

export type IntegrationData = Integration & {
    fields: IntegrationField[];
};

type Data =
    | IntegrationData
    | {
          error: string;
      };

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const integration = getIntegration(req.query.id as string);
        if (integration) {
            res.status(200).json(integration);
        } else {
            res.status(404).send({ error: "Integration not found" });
        }
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch data" });
    }
}

export const getIntegration = (id: string) => {
    const integration = Database.getIntegration(id);
    if (integration) {
        const fields = Database.getIntegrationFields(integration.id);
        return { ...integration, fields };
    } else {
        return null;
    }
};
