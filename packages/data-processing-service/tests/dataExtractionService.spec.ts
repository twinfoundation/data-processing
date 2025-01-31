// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { JsonPathExtractorConnector } from "@twin.org/data-processing-extractors";
import { DataExtractorConnectorFactory } from "@twin.org/data-processing-models";
import { MemoryEntityStorageConnector } from "@twin.org/entity-storage-connector-memory";
import { EntityStorageConnectorFactory } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import { DataExtractionService } from "../src/dataExtractionService";
import type { ExtractionRuleGroup } from "../src/entities/extractionRuleGroup";
import { initSchema } from "../src/schema";

let extractRuleGroupEntityStorage: MemoryEntityStorageConnector<ExtractionRuleGroup>;

describe("DataExtractionService", () => {
	beforeEach(() => {
		initSchema();
		extractRuleGroupEntityStorage = new MemoryEntityStorageConnector<ExtractionRuleGroup>({
			entitySchema: nameof<ExtractionRuleGroup>()
		});
		EntityStorageConnectorFactory.register(
			"extraction-rule-group",
			() => extractRuleGroupEntityStorage
		);
	});

	test("Can create an instance", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		const service = new DataExtractionService();
		expect(service).toBeDefined();
	});
});
