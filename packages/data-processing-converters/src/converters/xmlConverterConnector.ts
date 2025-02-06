// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseError, GeneralError, Guards } from "@twin.org/core";
import type { IDataConverterConnector } from "@twin.org/data-processing-models";
import { nameof } from "@twin.org/nameof";
import { MimeTypes } from "@twin.org/web";
import xml2js from "xml2js";

/**
 * Class for converting data to XML from bytes.
 */
export class XmlConverterConnector implements IDataConverterConnector {
	/**
	 * The namespace supported by the data converter connector.
	 */
	public static readonly NAMESPACE: string = "xml";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<XmlConverterConnector>();

	/**
	 * The MIME types that the converter can convert.
	 * @returns The MIME types.
	 */
	public mimeTypes(): string[] {
		return [MimeTypes.Xml];
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
				const xmlParser = new xml2js.Parser({
					explicitArray: false,
					explicitRoot: true
				});

				const result = await xmlParser.parseStringPromise(Buffer.from(data));

				converted = result ?? {};
			} catch (error) {
				throw new GeneralError(this.CLASS_NAME, "invalidFormat", {
					failure: BaseError.fromError(error).message.split("\n").join(" ")
				});
			}
		}

		return converted;
	}
}
