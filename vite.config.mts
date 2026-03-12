import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [
		tailwindcss(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: path.resolve(__dirname, "./src/mainview/routes"),
			generatedRouteTree: path.resolve(
				__dirname,
				"./src/mainview/routeTree.gen.ts",
			),
		}),
		react(),
	],
	root: "src/mainview",
	base: "./",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "../../dist",
		emptyOutDir: true,
	},
	server: {
		port: 5173,
		strictPort: true,
	},
	test: {
		globals: true,
		environment: "jsdom",
		root: ".",
		setupFiles: ["./src/test/setup.ts"],
		include: ["./src/__tests__/Counter.test.tsx"],
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/build/**",
			"**/src/__tests__/CounterDB.test.ts",
		],
		server: {
			deps: {
				inline: [/drizzle-orm/],
			},
		},
	},
});
