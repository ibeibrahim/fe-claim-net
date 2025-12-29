import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { statusColors } from "@/lib/claim-utils";

type Claim = {
  id: string;
  customer: string;
  type: string;
  status: string;
  amount: string;
  date: string;
};

interface ClaimTableProps {
  claims: Claim[];
}

export default function RecentClaimTable({ claims }: ClaimTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Claims</CardTitle>
        <CardDescription>
          Latest claim submissions requiring attention
        </CardDescription>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
