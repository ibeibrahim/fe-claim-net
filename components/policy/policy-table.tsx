import { Policy } from "@/lib/policy-types";
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
import { statusColors } from "@/lib/policy-utils";

interface PolicyTableProps {
  policies: Policy[];
}

export default function PolicyTable({ policies }: PolicyTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Policy List</CardTitle>
            <CardDescription>Total {policies.length} policies</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search policies..." className="pl-9 w-64" />
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
                  Policy No
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Category
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Premium
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Expiry
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr
                  key={policy.id}
                  className="border-b last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 px-2 text-sm font-medium text-primary">
                    {policy.id}
                  </td>
                  <td className="py-3 px-2 text-sm">{policy.customer}</td>
                  <td className="py-3 px-2 text-sm">
                    <Badge
                      variant={
                        policy.type === "Sharia" ? "secondary" : "outline"
                      }
                    >
                      {policy.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-sm">{policy.category}</td>
                  <td className="py-3 px-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[policy.status]
                      }`}
                    >
                      {policy.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm font-medium">
                    {policy.premium}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {policy.expiry}
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
