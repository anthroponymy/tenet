import * as fs from "node:fs";
import type {
	GraphResponse,
	Logs,
	AuditLogInResponse,
	LogHeader,
} from "./model.js";
import type { Request, Response } from "express";
import { AuditLog } from "./auditlog.js";
/**
 * Reads a JSON file, parses the data, and prints the logs.
 * @param filePath - The path to the JSON file.
 */
function readAndPrintLogs(filePath: string): Promise<AuditLogInResponse> {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			const jsonData: GraphResponse = JSON.parse(data);
			const logs: Logs[] = jsonData.data.auditLogsFiltered.nodes.map((node) =>
				AuditLog.processLogNode(node),
			);

			const logHeader: LogHeader = {
				pageSize: jsonData.data.auditLogsFiltered.pageInfo.pageSize,
				currentPage: jsonData.data.auditLogsFiltered.pageInfo.currentPage,
				totalPages: jsonData.data.auditLogsFiltered.pageInfo.totalPages,
				totalCount: jsonData.data.auditLogsFiltered.pageInfo.totalCount,
			};

			resolve({ headers: logHeader, logs });
		});
	});
}


// start a server with express and a GET request handler with /getlog endpoint

const app = require("express")();
const port = 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.get("/getlog", (_req: Request, res: Response) => {
	readAndPrintLogs("./AuditCommitByFilter.json")
		.then((logs) => {
			res.send(logs);
		})
		.catch((err) => {
			console.error(err);
			res.status(500);
			res.send();
		});
});

app.get("/getlog/page=:page", (req: Request, res: Response) => {
	const page = Number.parseInt(req.params.page, 10);
	const filePath = `./AuditCommitByFilter${page}.json`;

	readAndPrintLogs(filePath)
		.then((logs) => {
			res.send(logs);
		})
		.catch((err) => {
			console.error(err);
			res.status(500);
			res.send();
		});
});
