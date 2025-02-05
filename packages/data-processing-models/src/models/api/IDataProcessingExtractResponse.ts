// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Response to extracting data.
 */
export interface IDataProcessingExtractResponse {
	/**
	 * The extracted data in extended JSON format which keeps types like bigint, dates and uint8array intact.
	 * Use ObjectHelper.fromExtended to get the object with original types.
	 */
	body: unknown;
}
