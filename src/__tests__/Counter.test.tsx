import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Counter } from "@/components/Counter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { mockRpc } = vi.hoisted(() => ({
	mockRpc: {
		request: {
			getCounter: vi.fn(),
			incrementCounter: vi.fn(),
			resetCounter: vi.fn(),
		},
	},
}));

// Mock Electroview
vi.mock("electrobun/view", () => {
	class MockElectroview {
		rpc = mockRpc;
		static defineRPC = vi.fn().mockReturnValue({
			handlers: { requests: {} },
		});
	}
	return {
		Electroview: MockElectroview,
	};
});

describe("Counter Component", () => {
	let queryClient: QueryClient;

	beforeEach(() => {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		});
		vi.clearAllMocks();
	});

	const renderCounter = () =>
		render(
			<QueryClientProvider client={queryClient}>
				<Counter />
			</QueryClientProvider>,
		);

	it("renders with initial count from RPC", async () => {
		mockRpc.request.getCounter.mockResolvedValue(10);
		renderCounter();

		expect(screen.getByText("Loading...")).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getByText("Count: 10")).toBeInTheDocument();
		});
	});

	it("increments the count when clicked", async () => {
		mockRpc.request.getCounter.mockResolvedValue(10);
		mockRpc.request.incrementCounter.mockResolvedValue(11);

		renderCounter();

		const button = await screen.findByText("Count: 10");
		fireEvent.click(button);

		await waitFor(() => {
			expect(mockRpc.request.incrementCounter).toHaveBeenCalled();
		});
	});

	it("resets the count when reset button is clicked", async () => {
		mockRpc.request.getCounter.mockResolvedValue(10);
		mockRpc.request.resetCounter.mockResolvedValue(0);

		renderCounter();

		// Wait for initial load
		await screen.findByText("Count: 10");

		const resetButton = screen.getByText("Reset");
		fireEvent.click(resetButton);

		await waitFor(() => {
			expect(mockRpc.request.resetCounter).toHaveBeenCalled();
		});
	});
});
