// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Perform an extraction on the data with the specified ruleset.
 */
export interface IDataProcessingExtractRequest {
	/**
	 * The params for the extract.
	 */
	body: {
		/**
		 * The rule group id to use for the extraction.
		 */
		ruleGroupId: string;

		/**
		 * The binary data to extract from in base64.
		 */
		data: string;

		/**
		 * The default extractor connector will be used if not specified.
		 */
		overrideExtractorType?: string;
	};
}
