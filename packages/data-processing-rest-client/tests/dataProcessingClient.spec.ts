// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataProcessingClient } from "../src/dataProcessingClient";

describe("DataProcessing", () => {
	test("Can create an instance", async () => {
		const client = new DataProcessingClient({ endpoint: "http://localhost:8080" });
		expect(client).toBeDefined();
	});
});
