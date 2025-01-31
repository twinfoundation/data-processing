// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Guards, Is, NotFoundError, ObjectHelper } from "@twin.org/core";
import {
	DataConverterConnectorFactory,
	DataExtractorConnectorFactory,
	type IDataExtractionComponent,
	type IDataExtractorConnector,
	type IRule,
	type IRuleGroup
} from "@twin.org/data-processing-models";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import { MimeTypeHelper } from "@twin.org/web";
import type { ExtractionRuleGroup } from "./entities/extractionRuleGroup";
import type { IDataExtractionServiceConstructorOptions } from "./models/IDataExtractionServiceConstructorOptions";

/**
 * Class for extracting data from a source.
 */
export class DataExtractionService implements IDataExtractionComponent {
	/**
	 * The namespace supported by the data extraction service.
	 */
	public static readonly NAMESPACE: string = "data-extraction";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<DataExtractionService>();

	/**
	 * The entity storage for the extraction rule groups.
	 * @internal
	 */
	private readonly _extractionRuleGroupStorage: IEntityStorageConnector<ExtractionRuleGroup>;

	/**
	 * The extractor connection to use.
	 * @internal
	 */
	private readonly _extractorConnector: IDataExtractorConnector;

	/**
	 * Create a new instance of DataExtractionService.
	 * @param options The options for the connector.
	 */
	constructor(options?: IDataExtractionServiceConstructorOptions) {
		this._extractionRuleGroupStorage = EntityStorageConnectorFactory.get(
			options?.extractionRuleGroupStorageConnectorType ?? "extraction-rule-group"
		);

		if (Is.stringValue(options?.defaultExtractorType)) {
			this._extractorConnector = DataExtractorConnectorFactory.get(options.defaultExtractorType);
		} else {
			const names = DataExtractorConnectorFactory.names();
			if (names.length > 0) {
				this._extractorConnector = DataExtractorConnectorFactory.get(names[0]);
			} else {
				throw new GeneralError(this.CLASS_NAME, "noExtractorFound");
			}
		}
	}

	/**
	 * Store an extraction rule group.
	 * @param ruleGroup The rule group to store.
	 * @returns Nothing.
	 */
	public async ruleGroupStore(ruleGroup: IRuleGroup): Promise<void> {
		Guards.object<IRuleGroup>(this.CLASS_NAME, nameof(ruleGroup), ruleGroup);
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroup.id), ruleGroup.id);
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroup.label), ruleGroup.label);
		Guards.array<IRule>(this.CLASS_NAME, nameof(ruleGroup.rules), ruleGroup.rules);

		for (const rule of ruleGroup.rules) {
			Guards.stringValue(this.CLASS_NAME, nameof(rule.source), rule.source);
			Guards.stringValue(this.CLASS_NAME, nameof(rule.target), rule.source);
		}

		const extractionRuleGroup: ExtractionRuleGroup = {
			id: ruleGroup.id,
			label: ruleGroup.label,
			rules: ruleGroup.rules.map(rule => ({
				source: rule.source,
				target: rule.target,
				retainPathDepth: rule.retainPathDepth,
				coerce: rule.coerce
			}))
		};

		await this._extractionRuleGroupStorage.set(extractionRuleGroup);
	}

	/**
	 * Retrieve a rule group for extraction.
	 * @param ruleGroupId The id of the rule group to retrieve.
	 * @returns The rule group.
	 */
	public async ruleGroupRetrieve(ruleGroupId: string): Promise<IRuleGroup> {
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);

		const extractRuleGroup = await this._extractionRuleGroupStorage.get(ruleGroupId);

		if (Is.empty(extractRuleGroup)) {
			throw new NotFoundError(this.CLASS_NAME, "ruleGroupNotFound", ruleGroupId);
		}

		return {
			id: extractRuleGroup.id,
			label: extractRuleGroup.label,
			rules: extractRuleGroup.rules.map(rule => ({
				source: rule.source,
				target: rule.target,
				retainPathDepth: rule.retainPathDepth,
				coerce: rule.coerce
			}))
		};
	}

	/**
	 * Remove a rule group.
	 * @param ruleGroupId The id of the rule group to remove.
	 * @returns Nothing.
	 */
	public async ruleGroupRemove(ruleGroupId: string): Promise<void> {
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);

		const extractRuleGroup = await this._extractionRuleGroupStorage.get(ruleGroupId);

		if (Is.empty(extractRuleGroup)) {
			throw new NotFoundError(this.CLASS_NAME, "ruleGroupNotFound", ruleGroupId);
		}

		await this._extractionRuleGroupStorage.remove(ruleGroupId);
	}

	/**
	 * Extracts data from the from the provided input.
	 * @param ruleGroupId The id of the rule group to use to extract data.
	 * @param data The data to extract from.
	 * @param overrideExtractorType An optional override for the extractor type.
	 * @returns The extracted data.
	 */
	public async extract(
		ruleGroupId: string,
		data: Uint8Array,
		overrideExtractorType?: string
	): Promise<Uint8Array> {
		Guards.stringValue(this.CLASS_NAME, nameof(ruleGroupId), ruleGroupId);
		Guards.uint8Array(this.CLASS_NAME, nameof(data), data);

		const extractRuleGroup = await this._extractionRuleGroupStorage.get(ruleGroupId);

		if (Is.empty(extractRuleGroup)) {
			throw new NotFoundError(this.CLASS_NAME, "ruleGroupNotFound", ruleGroupId);
		}

		const mimeType = await MimeTypeHelper.detect(data);
		if (Is.empty(mimeType)) {
			throw new NotFoundError(this.CLASS_NAME, "mimeTypeNotFound");
		}

		const converters = DataConverterConnectorFactory.instancesList();

		const converter = converters.find(c => c.mimeTypes().includes(mimeType));
		if (Is.empty(converter)) {
			throw new NotFoundError(this.CLASS_NAME, "converterNotFound", mimeType);
		}

		const converted = await converter.convert(data);

		const extractor = Is.empty(overrideExtractorType)
			? this._extractorConnector
			: DataExtractorConnectorFactory.get(overrideExtractorType);

		const extracted = await extractor.extract(converted, extractRuleGroup.rules);

		// How do we return objects that might have dates or bigints in them
		return ObjectHelper.toBytes(extracted);
	}
}
