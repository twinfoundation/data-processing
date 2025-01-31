// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { JsonConverterConnector } from "../../src/converters/jsonConverterConnector";

describe("JsonConverterConnector", () => {
	test("Can output empty object when the input is not JSON", async () => {
		const converter = new JsonConverterConnector();
		const output = await converter.convert(new Uint8Array());
		expect(output).toEqual({ object: {}, sourceMimeType: "application/json" });
	});
});
