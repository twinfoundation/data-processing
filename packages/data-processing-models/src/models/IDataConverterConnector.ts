// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";

/**
 * Interface describing a connector for extracting data.
 */
export interface IDataConverterConnector extends IComponent {
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
