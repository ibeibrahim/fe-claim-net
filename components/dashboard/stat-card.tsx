import { LucideIcon, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type Stat = {
  title: string;
  value: string;
  change: string;
  changeText?: string;
  icon: LucideIcon;
  color: string;
};

interface StatCardProps {
  stat: Stat;
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </CardTitle>
        <stat.icon className={`h-5 w-5 ${stat.color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3" />
          {stat.change} {stat.changeText ?? "from last month"}
        </p>
      </CardContent>
    </Card>
  );
}
