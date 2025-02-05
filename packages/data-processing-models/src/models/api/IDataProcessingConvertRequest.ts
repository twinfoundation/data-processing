// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Perform a conversion on the data.
 */
export interface IDataProcessingConvertRequest {
	/**
	 * The params for the convert.
	 */
	body: {
		/**
		 * The binary data to convert in base64.
		 */
		data: string;

		/**
		 * Use the specified mime type for conversion, will auto detect if undefined.
		 */
		overrideMimeType?: string;
	};
}
