// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { readFile } from "node:fs/promises";
import { Converter } from "@twin.org/core";
import { XmlConverterConnector } from "../../src/converters/xmlConverterConnector";

describe("XmlConverterConnector", () => {
	test("Can fail when input is invalid xml", async () => {
		const converter = new XmlConverterConnector();
		await expect(converter.convert(Converter.utf8ToBytes("!"))).rejects.toMatchObject({
			name: "GeneralError",
			message: "xmlConverterConnector.invalidFormat",
			properties: { failure: "Non-whitespace before first tag. Line: 0 Column: 1 Char: !" }
		});
	});

	test("Can output empty object when the input is empty", async () => {
		const converter = new XmlConverterConnector();

		const output = await converter.convert(new Uint8Array());

		expect(output).toEqual({});
	});

	test("Can output object when the input is XML", async () => {
		const converter = new XmlConverterConnector();

		const xml = await readFile("./tests/converters/samples/test.xml");
		const output = await converter.convert(xml);

		expect(output).toEqual({
			menu: {
				food: [
					{
						name: "Belgian Waffles",
						price: "$5.95",
						description: "Two of our famous Belgian Waffles with plenty of real maple syrup",
						calories: "650"
					},
					{
						name: "Strawberry Belgian Waffles",
						price: "$7.95",
						description: "Light Belgian waffles covered with strawberries and whipped cream",
						calories: "900"
					},
					{
						name: "Berry-Berry Belgian Waffles",
						price: "$8.95",
						description:
							"Light Belgian waffles covered with an assortment of fresh berries and whipped cream",
						calories: "900"
					},
					{
						name: "French Toast",
						price: "$4.50",
						description: "Thick slices made from our homemade sourdough bread",
						calories: "600"
					},
					{
						name: "Homestyle Breakfast",
						price: "$6.95",
						description: "Two eggs, bacon or sausage, toast, and our ever-popular hash browns",
						calories: "950"
					}
				]
			}
		});
	});
});
