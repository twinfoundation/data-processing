// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IExtractRule } from "./IExtractRule";
import type { IStructuredData } from "./IStructuredData";

/**
 * Interface describing a connector for extracting data.
 */
export interface IDataExtractorConnector {
	/**
	 * Extracts data from the from the provided input.
	 * @param structuredData The object to extract from.
	 * @param extractRules The rules to use to extract the data.
	 * @returns The extracted data.
	 */
	extract(structuredData: IStructuredData, extractRules: IExtractRule[]): Promise<IStructuredData>;
}
