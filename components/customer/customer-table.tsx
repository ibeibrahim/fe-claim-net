import { Customer } from "@/lib/customer-types";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter } from "lucide-react";

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>
              Total {customers.length} customers
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-9 w-64" />
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
                  Customer
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Contact
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Policies
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Total Premium
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div>
                      <p className="text-sm">{customer.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <Badge variant="outline">
                      {customer.policies} policy(s)
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-sm font-medium">
                    {customer.totalPremium}
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <Badge
                      variant={
                        customer.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {customer.status}
                    </Badge>
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
