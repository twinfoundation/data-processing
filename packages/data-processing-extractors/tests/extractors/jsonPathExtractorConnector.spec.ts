// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { MimeTypes } from "@twin.org/web";
import { JsonPathExtractorConnector } from "../../src/extractors/jsonPathExtractorConnector";

describe("JsonPathExtractorConnector", () => {
	test("Can output empty object with no extraction rules", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{ sourceMimeType: MimeTypes.Json, object: { a: 1, b: true } },
			[]
		);
		expect(output.object).toEqual({});
	});

	test("Can fail with an invalid extraction rule", async () => {
		const extractor = new JsonPathExtractorConnector();
		await expect(
			extractor.extract({ sourceMimeType: MimeTypes.Json, object: { a: 1, b: true } }, [
				{ source: "", target: "" }
			])
		).rejects.toMatchObject({
			name: "GeneralError",
			message: "jsonPathExtractorConnector.invalidRule",
			properties: { rule: "", reason: "can't backup beyond start ('':0)" }
		});
	});

	test("Can output simple object with single extraction rule", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{ sourceMimeType: MimeTypes.Json, object: { a: 1, b: true } },
			[{ source: "$.b", target: "b" }]
		);
		expect(output.object).toEqual({ b: true });
	});

	test("Can output nested object with single extraction rule", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{ sourceMimeType: MimeTypes.Json, object: { a: { b: true } } },
			[{ source: "$.a.b", target: "c.b" }]
		);
		expect(output.object).toEqual({ c: { b: true } });
	});

	test("Can output single value from nested array with single extraction rule", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{ sourceMimeType: MimeTypes.Json, object: { a: { b: [0, 1, 2] } } },
			[{ source: "$.a.b[1]", target: "c.b" }]
		);
		expect(output.object).toEqual({ c: { b: 1 } });
	});

	test("Can output array from nested array with single extraction rule", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{ sourceMimeType: MimeTypes.Json, object: { a: { b: [0, 1, 2] } } },
			[{ source: "$.a.b[1]", target: "c.b.1" }]
		);
		expect(output.object).toEqual({ c: { b: [undefined, 1] } });
	});

	test("Can use single wildcard operator on an object", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{ sourceMimeType: MimeTypes.Json, object: { a: { b: 0, c: 1, d: 2 } } },
			[{ source: "$.a", target: "x" }]
		);
		expect(output.object).toEqual({ x: { b: 0, c: 1, d: 2 } });
	});

	test("Can use single wildcard operator on an object with a specific property", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{
				sourceMimeType: MimeTypes.Json,
				object: { a: { b: { x: 0, y: 1 }, c: { x: 2, y: 3 }, d: { x: 4, y: 5 } } }
			},
			[{ source: "$.a.*.x", target: "z", maintainNestingDepth: 2 }]
		);
		expect(output.object).toEqual({ z: { b: { x: 0 }, c: { x: 2 }, d: { x: 4 } } });
	});

	test("Can use single wildcard operator on an array", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{ sourceMimeType: MimeTypes.Json, object: { a: [0, 1, 2] } },
			[{ source: "$.a", target: "x" }]
		);
		expect(output.object).toEqual({ x: [0, 1, 2] });
	});

	test("Can use single wildcard operator on an array with a specific property", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{
				sourceMimeType: MimeTypes.Json,
				object: {
					a: [
						{ x: 0, y: 1 },
						{ x: 2, y: 3 },
						{ x: 4, y: 5 }
					]
				}
			},
			[{ source: "$.a.*.x", target: "z", maintainNestingDepth: 2 }]
		);
		expect(output.object).toEqual({ z: [{ x: 0 }, { x: 2 }, { x: 4 }] });
	});

	test("Can use multiple wildcard operator on an array object", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{
				sourceMimeType: MimeTypes.Json,
				object: {
					a: [{ sub: { val: 0 } }, { sub: { val: 1 } }, { sub: { val: 2 } }]
				}
			},
			[{ source: "$.a.*.sub.*", target: "x", maintainNestingDepth: 3 }]
		);
		expect(output.object).toEqual({
			x: [{ sub: { val: 0 } }, { sub: { val: 1 } }, { sub: { val: 2 } }]
		});
	});

	test("Can use multiple rules to pick specific information from objects", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{
				sourceMimeType: MimeTypes.Json,
				object: {
					users: {
						user1: { firstName: "John", lastName: "Doe", age: 30 },
						user2: { firstName: "Jane", lastName: "Doe", age: 25 }
					}
				}
			},
			[
				{ source: "$.users.*.firstName", target: "x", maintainNestingDepth: 2 },
				{ source: "$.users.*.lastName", target: "x", maintainNestingDepth: 2 }
			]
		);
		expect(output.object).toEqual({
			x: {
				user1: {
					firstName: "John",
					lastName: "Doe"
				},
				user2: {
					firstName: "Jane",
					lastName: "Doe"
				}
			}
		});
	});

	test("Can use multiple rules to pick specific information from array objects", async () => {
		const extractor = new JsonPathExtractorConnector();
		const output = await extractor.extract(
			{
				sourceMimeType: MimeTypes.Json,
				object: {
					users: [
						{ firstName: "John", lastName: "Doe", age: 30 },
						{ firstName: "Jane", lastName: "Doe", age: 25 },
						{ firstName: "Alice", lastName: "Smith", age: 35 }
					]
				}
			},
			[
				{ source: "$.users[0].firstName", target: "x.firstName" },
				{ source: "$.users[2].lastName", target: "x.lastName" }
			]
		);
		expect(output.object).toEqual({
			x: {
				firstName: "John",
				lastName: "Smith"
			}
		});
	});
});
