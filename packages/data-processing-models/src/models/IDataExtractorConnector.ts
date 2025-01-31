// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRule } from "./IRule";

/**
 * Interface describing a connector for extracting data.
 */
export interface IDataExtractorConnector {
	/**
	 * Extracts data from the from the provided input.
	 * @param data The object to extract from.
	 * @param rules The rules to use to extract the data.
	 * @returns The extracted data.
	 */
	extract(data: unknown, rules: IRule[]): Promise<unknown>;
}
