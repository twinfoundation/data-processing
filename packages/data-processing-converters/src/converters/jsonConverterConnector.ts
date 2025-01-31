// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, Guards, Is } from "@twin.org/core";
import type { IDataConverterConnector, IStructuredData } from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";
import { MimeTypes } from "@twin.org/web";

/**
 * Class for converting data to JSON from bytes.
 */
export class JsonConverterConnector implements IDataConverterConnector {
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
	public async convert(data: Uint8Array): Promise<IStructuredData> {
		Guards.uint8Array(this.CLASS_NAME, nameof(data), data);

		const structuredData: IStructuredData = {
			sourceMimeType: MimeTypes.Json,
			object: {}
		};

		const jsonString = Converter.bytesToUtf8(data);
		if (Is.json(jsonString)) {
			structuredData.object = JSON.parse(jsonString);
		}

		return structuredData;
	}
}
