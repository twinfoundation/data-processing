// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, Converter, GeneralError, Guards } from "@twin.org/core";
import type { IDataConverterConnector } from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";
import { MimeTypes } from "@twin.org/web";

/**
 * Class for converting data to JSON from bytes.
 */
export class JsonConverterConnector implements IDataConverterConnector {
	/**
	 * The namespace supported by the data converter connector.
	 */
	public static readonly NAMESPACE: string = "json";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<JsonConverterConnector>();

	/**
	 * The MIME types that the converter can convert.
	 * @returns The MIME types.
	 */
	public mimeTypes(): string[] {
		return [MimeTypes.Json, MimeTypes.JsonLd];
	}

	/**
	 * Converts the data to a structured object.
	 * @param data The data to extract from.
	 * @returns The extracted data.
	 */
	public async convert(data: Uint8Array): Promise<unknown> {
		Guards.uint8Array(this.CLASS_NAME, nameof(data), data);

		let converted = {};

		if (data.length > 0) {
			try {
				const jsonString = Converter.bytesToUtf8(data);
				converted = JSON.parse(jsonString);
			} catch (error) {
				throw new GeneralError(this.CLASS_NAME, "invalidFormat", {
					failure: BaseError.fromError(error).message
				});
			}
		}

		return converted;
	}
}
