import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Electroview } from "electrobun/view";
import type { MyRPCSchema } from "../shared/rpc";

const rpc = Electroview.defineRPC<MyRPCSchema>({
  handlers: {
    requests: {},
  },
});

const electroview = new Electroview({ rpc });

export function Counter() {
  const queryClient = useQueryClient();

  const { data: count, isLoading } = useQuery({
    queryKey: ["counter"],
    queryFn: async () => {
      return await electroview.rpc!.request.getCounter({});
    },
  });

  const incrementMutation = useMutation({
    mutationFn: async () => {
      return await electroview.rpc!.request.incrementCounter({});
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["counter"] });
    },
  });

  const resetMutation = useMutation({
    mutationFn: async () => {
      return await electroview.rpc!.request.resetCounter({});
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["counter"] });
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold text-primary">
            Persistent Counter
          </CardTitle>
          <Badge variant="secondary" className="font-semibold">
            SQLite + Drizzle
          </Badge>
        </div>
        <CardDescription>
          This counter is persisted in a local SQLite database using Drizzle
          ORM. Even if you restart the application, the value will be
          preserved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => incrementMutation.mutate()}
            disabled={isLoading || incrementMutation.isPending}
            size="lg"
            className="shadow-md hover:shadow-lg transition-all min-w-[120px]"
          >
            {isLoading ? "Loading..." : `Count: ${count ?? 0}`}
          </Button>
          <Button
            onClick={() => resetMutation.mutate()}
            disabled={isLoading || resetMutation.isPending}
            variant="outline"
            size="lg"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
