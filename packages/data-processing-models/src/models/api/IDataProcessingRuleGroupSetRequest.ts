// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRule } from "../IRule";

/**
 * Set a rule group.
 */
export interface IDataProcessingRuleGroupSetRequest {
	/**
	 * The parameters to be used in the set.
	 */
	pathParams: {
		/**
		 * The rule id to set.
		 */
		id: string;
	};

	/**
	 * The data to be used in the store.
	 */
	body: {
		/**
		 * The label for the rule group.
		 */
		label: string;

		/**
		 * The rules.
		 */
		rules: IRule[];
	};
}
