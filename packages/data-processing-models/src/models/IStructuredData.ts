// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Definition for the structured data.
 */
export interface IStructuredData {
	/**
	 * The MIME type of the data.
	 */
	sourceMimeType: string;

	/**
	 * The structured object.
	 */
	object: unknown;
}
