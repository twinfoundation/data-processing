// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { CoerceType, ObjectHelper } from "@twin.org/core";
import { JsonConverterConnector } from "@twin.org/data-processing-converters";
import { JsonPathExtractorConnector } from "@twin.org/data-processing-extractors";
import {
	DataConverterConnectorFactory,
	DataExtractorConnectorFactory
} from "@twin.org/data-processing-models";
import { MemoryEntityStorageConnector } from "@twin.org/entity-storage-connector-memory";
import { EntityStorageConnectorFactory } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import { DataProcessingService } from "../src/dataProcessingService";
import type { ExtractionRuleGroup } from "../src/entities/extractionRuleGroup";
import { initSchema } from "../src/schema";

let extractRuleGroupEntityStorage: MemoryEntityStorageConnector<ExtractionRuleGroup>;

describe("DataProcessingService", () => {
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
		const service = new DataProcessingService();
		expect(service).toBeDefined();
	});

	test("Can fail when ruleset does not exist", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		const service = new DataProcessingService();
		await expect(service.extract("aaa", new Uint8Array(0))).rejects.toMatchObject({
			name: "NotFoundError",
			message: "dataProcessingService.ruleGroupNotFound",
			properties: {
				notFoundId: "aaa"
			}
		});
	});

	test("Can fail with no mime type", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		const service = new DataProcessingService();
		await service.ruleGroupSet({ id: "aaa", label: "aaa", rules: [] });
		await expect(service.extract("aaa", new Uint8Array())).rejects.toMatchObject({
			name: "GeneralError",
			message: "dataProcessingService.mimeTypeNotFound"
		});
	});

	test("Can fail with no matching mime converter", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		const service = new DataProcessingService();
		await service.ruleGroupSet({ id: "aaa", label: "aaa", rules: [] });
		await expect(service.extract("aaa", new Uint8Array(1))).rejects.toMatchObject({
			name: "NotFoundError",
			message: "dataProcessingService.converterNotFound",
			properties: {
				notFoundId: "text/plain"
			}
		});
	});

	test("Can extract no data with empty ruleset", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		DataConverterConnectorFactory.register("json", () => new JsonConverterConnector());
		const service = new DataProcessingService();
		await service.ruleGroupSet({ id: "aaa", label: "aaa", rules: [] });
		const extracted = await service.extract("aaa", ObjectHelper.toBytes({ foo: "bar" }));
		expect(extracted).toEqual({});
	});

	test("Can extract data with simple ruleset", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		DataConverterConnectorFactory.register("json", () => new JsonConverterConnector());
		const service = new DataProcessingService();
		await service.ruleGroupSet({
			id: "aaa",
			label: "aaa",
			rules: [
				{
					source: "$.foo",
					target: "goo"
				}
			]
		});
		const extracted = await service.extract("aaa", ObjectHelper.toBytes({ foo: "bar" }));
		expect(extracted).toEqual({ goo: "bar" });
	});

	test("Can extract data with extended data type ruleset", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		DataConverterConnectorFactory.register("json", () => new JsonConverterConnector());
		const service = new DataProcessingService();
		await service.ruleGroupSet({
			id: "aaa",
			label: "aaa",
			rules: [
				{
					source: "$.foo",
					target: "goo",
					coerce: CoerceType.BigInt
				}
			]
		});
		const extracted = await service.extract("aaa", ObjectHelper.toBytes({ foo: 0 }));
		expect(extracted).toEqual({
			goo: {
				"@ext": "bigint",
				value: "0"
			}
		});

		const obj = ObjectHelper.fromExtended(extracted);
		expect(obj.goo).toEqual(0n);
	});

	test("Can convert data", async () => {
		DataExtractorConnectorFactory.register("JSONPath", () => new JsonPathExtractorConnector());
		DataConverterConnectorFactory.register("json", () => new JsonConverterConnector());
		const service = new DataProcessingService();
		const converted = await service.convert(ObjectHelper.toBytes({ foo: 0 }));
		expect(converted).toEqual({
			foo: 0
		});
	});
});
