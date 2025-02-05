// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Remove a rule group.
 */
export interface IDataProcessingRuleGroupRemoveRequest {
	/**
	 * The parameters to be used in the remove.
	 */
	pathParams: {
		/**
		 * The rule id to remove.
		 */
		id: string;
	};
}
