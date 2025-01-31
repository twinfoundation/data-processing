// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { CoerceType } from "@twin.org/core";
import { entity, property } from "@twin.org/entity";

/**
 * Class defining an extraction rule.
 */
@entity()
export class ExtractionRule {
	/**
	 * The source.
	 */
	@property({ type: "string" })
	public source!: string;

	/**
	 * The target.
	 */
	@property({ type: "string" })
	public target!: string;

	/**
	 * The retainPathDepth.
	 */
	@property({ type: "number" })
	public retainPathDepth?: number;

	/**
	 * The coercion to use.
	 */
	@property({ type: "string" })
	public coerce?: CoerceType;
}
