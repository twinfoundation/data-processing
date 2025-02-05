// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteEntryPoint } from "@twin.org/api-models";
import { generateRestRoutesDataProcessing, tagsDataProcessing } from "./dataProcessingRoutes";

export const restEntryPoints: IRestRouteEntryPoint[] = [
	{
		name: "data-processing",
		defaultBaseRoute: "data-processing",
		tags: tagsDataProcessing,
		generateRoutes: generateRestRoutesDataProcessing
	}
];
