import type { RPCSchema } from "electrobun/bun";

export interface MyRPCSchema {
	bun: RPCSchema<{
		requests: {
			getCounter: {
				params: Record<string, never>;
				response: number;
			};
			incrementCounter: {
				params: Record<string, never>;
				response: number;
			};
			resetCounter: {
				params: Record<string, never>;
				response: number;
			};
		};
	}>;
	webview: RPCSchema;
}
