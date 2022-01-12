import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET" && (req.query.tipo == "acima" || req.query.tipo == "abaixo")) {
        try {
            const fileContent = fs.readFileSync("./data/" + req.query.tipo + "-10-reais.json", "utf8");
            const fileJson = JSON.parse(fileContent);
            res.status(200).json(fileJson);
            return;
        } catch (e) {}
    }
    res.status(403).json({ message: "Forbidden" });
}
