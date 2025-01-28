// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface describing a component for extracting data.
 */
export interface IDataExtractor {
	/**
	 * Extracts data from the given data.
	 * @param data The data to extract from.
	 * @returns The extracted data.
	 */
	extract(data: unknown): Promise<unknown>;
}
