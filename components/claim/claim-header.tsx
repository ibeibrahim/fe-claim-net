import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ClaimHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">All Claims</h1>
        <p className="text-muted-foreground">
          Manage and review insurance claims
        </p>
      </div>
      <Link href="/claims/register">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Claim
        </Button>
      </Link>
    </div>
  );
}
