import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { statusColors } from "@/lib/claim-utils";
import { Claim } from "@/lib/claim-types";

interface ClaimTableProps {
  claims: Claim[];
}

export default function ClaimTable({ claims }: ClaimTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Claims List</CardTitle>
            <CardDescription>
              Total {claims.length} claims found
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search claims..." className="pl-9 w-64" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Claim ID
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Policy No
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr
                  key={claim.id}
                  className="border-b last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 px-2 text-sm font-medium text-primary">
                    {claim.id}
                  </td>
                  <td className="py-3 px-2 text-sm font-mono text-muted-foreground">
                    {claim.polis}
                  </td>
                  <td className="py-3 px-2 text-sm">{claim.customer}</td>
                  <td className="py-3 px-2 text-sm">
                    <Badge variant="outline">{claim.type}</Badge>
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[claim.status]
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm font-medium">
                    {claim.amount}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {claim.date}
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
