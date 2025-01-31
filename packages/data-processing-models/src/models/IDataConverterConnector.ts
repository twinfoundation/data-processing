// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface describing a connector for extracting data.
 */
export interface IDataConverterConnector {
	/**
	 * The MIME types that the converter can convert.
	 * @returns The MIME types.
	 */
	mimeTypes(): string[];

	/**
	 * Converts the data to a structured object.
	 * @param data The data to extract from.
	 * @returns The extracted data.
	 */
	convert(data: Uint8Array): Promise<unknown>;
}
