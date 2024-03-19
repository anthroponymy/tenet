import * as fs from "fs";
import { AuditLog } from "./auditlog.js";
import type { GraphResponse, Logs } from "./model.js";

/**
 * Reads a JSON file, parses the data, and prints the logs.
 * @param filePath - The path to the JSON file.
 */
function readAndPrintLogs(filePath: string): void {
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading file:", err);
			return;
		}

		try {
			const jsonData: GraphResponse = JSON.parse(data);
			const logs: Logs[] = jsonData.data.auditCommitByFilter.nodes.map((node) =>
				AuditLog.processLogNode(node)
			);
			printLogs(logs);
		} catch (err) {
			console.error("Error parsing JSON:", err);
		}
	});
}

/**
 * Prints the logs to the console.
 * @param logs - An array of logs to be printed.
 */
function printLogs(logs: Logs[]): void {
	console.log(JSON.stringify(logs, null, 2));
}

// Usage example:
const filePath = "./AuditCommitByFilter.json";
readAndPrintLogs(filePath);
