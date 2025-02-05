// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The options for the data processing service constructor.
 */
export interface IDataProcessingServiceConstructorOptions {
	/**
	 * The type of the entity storage connector to use for extraction rule groups.
	 * @default extraction-rule-group
	 */
	extractionRuleGroupStorageConnectorType?: string;

	/**
	 * The default extractor type to use, if not provided uses the first in the factory.
	 */
	defaultExtractorType?: string;
}
