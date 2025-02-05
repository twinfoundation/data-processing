// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, Coerce, GeneralError, Guards, ObjectHelper } from "@twin.org/core";
import type { IDataExtractorConnector, IRule } from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";
import { type JSONValue, query } from "json-p3";

/**
 * Class for extracting data from a JSON source.
 */
export class JsonPathExtractorConnector implements IDataExtractorConnector {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<JsonPathExtractorConnector>();

	/**
	 * Extracts data from the provided input.
	 * @param data The object to extract from.
	 * @param rules The rules to use to extract the data.
	 * @returns The extracted data.
	 */
	public async extract(data: unknown, rules: IRule[]): Promise<unknown> {
		Guards.object(this.CLASS_NAME, nameof(data), data);
		Guards.array(this.CLASS_NAME, nameof(rules), rules);

		const outputObject: unknown = {};

		for (const extractRule of rules) {
			this.extractValue(data, extractRule, outputObject);
		}

		return outputObject;
	}

	/**
	 * Extracts the value from the JSON object.
	 * @param jsonObject The JSON object to extract from.
	 * @param rule The rule to use to extract the data.
	 * @param outputObject The object to output the extracted data to.
	 * @internal
	 */
	private extractValue(jsonObject: unknown, rule: IRule, outputObject: unknown): void {
		try {
			const jsonNodes = query(rule.source, jsonObject as JSONValue);

			for (const jsonNode of jsonNodes) {
				const retainPathDepth = rule.retainPathDepth ?? 0;

				const fullTargetPath = `${rule.target}${retainPathDepth > 0 ? `.${jsonNode.location.slice(-retainPathDepth).join(".")}` : ""}`;

				ObjectHelper.propertySet(
					outputObject,
					fullTargetPath,
					Coerce.byType(jsonNode.value, rule.coerce)
				);
			}
		} catch (err) {
			throw new GeneralError(this.CLASS_NAME, "invalidRule", {
				rule: rule.source,
				reason: BaseError.fromError(err).message
			});
		}
	}
}
