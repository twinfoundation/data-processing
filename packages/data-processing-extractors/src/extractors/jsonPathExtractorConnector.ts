// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, Coerce, GeneralError, Guards, ObjectHelper } from "@twin.org/core";
import type {
	IDataExtractorConnector,
	IExtractRule,
	IStructuredData
} from "@twin.org/data-processing-models";
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
	 * Extracts data from the from the provided input.
	 * @param structuredData The object to extract from.
	 * @param extractRules The rules to use to extract the data.
	 * @returns The extracted data.
	 */
	public async extract(
		structuredData: IStructuredData,
		extractRules: IExtractRule[]
	): Promise<IStructuredData> {
		Guards.object<IStructuredData>(this.CLASS_NAME, nameof(structuredData), structuredData);
		Guards.array(this.CLASS_NAME, nameof(extractRules), extractRules);

		const outputObject: unknown = {};

		for (const extractRule of extractRules) {
			this.extractValue(structuredData.object, extractRule, outputObject);
		}

		return {
			sourceMimeType: structuredData.sourceMimeType,
			object: outputObject
		};
	}

	/**
	 * Extracts the value from the JSON object.
	 * @param jsonObject The JSON object to extract from.
	 * @param extractRule The rule to use to extract the data.
	 * @param outputObject The object to output the extracted data to.
	 * @internal
	 */
	private extractValue(
		jsonObject: unknown,
		extractRule: IExtractRule,
		outputObject: unknown
	): void {
		try {
			const jsonNodes = query(extractRule.source, jsonObject as JSONValue);

			for (const jsonNode of jsonNodes) {
				const maintainPath = extractRule.maintainNestingDepth ?? 0;

				const fullTargetPath = `${extractRule.target}${maintainPath > 0 ? `.${jsonNode.location.slice(-maintainPath).join(".")}` : ""}`;

				ObjectHelper.propertySet(
					outputObject,
					fullTargetPath,
					Coerce.byType(jsonNode.value, extractRule.coerce)
				);
			}
		} catch (err) {
			throw new GeneralError(this.CLASS_NAME, "invalidRule", {
				rule: extractRule.source,
				reason: BaseError.fromError(err).message
			});
		}
	}
}
