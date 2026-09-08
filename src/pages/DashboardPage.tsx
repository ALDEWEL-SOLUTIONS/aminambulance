import {
  Activity,
  Ambulance,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Active Dispatches",
    value: "12",
    change: "+3",
    changeType: "increase" as const,
    icon: Activity,
    description: "Currently en route",
  },
  {
    title: "Available Ambulances",
    value: "8",
    change: "-2",
    changeType: "decrease" as const,
    icon: Ambulance,
    description: "Ready for dispatch",
  },
  {
    title: "Avg Response Time",
    value: "6.2 min",
    change: "-0.8 min",
    changeType: "increase" as const,
    icon: Clock,
    description: "Last 24 hours",
  },
  {
    title: "Completed Today",
    value: "34",
    change: "+12%",
    changeType: "increase" as const,
    icon: TrendingUp,
    description: "vs. yesterday",
  },
]

const recentOrders = [
  {
    id: "AMB-001",
    patient: "Ahmed Hassan",
    location: "123 Main St, Downtown",
    priority: "Critical",
    status: "En Route",
    time: "2 min ago",
  },
  {
    id: "AMB-002",
    patient: "Fatima Ali",
    location: "456 Oak Ave, Suburbs",
    priority: "High",
    status: "Dispatched",
    time: "5 min ago",
  },
  {
    id: "AMB-003",
    patient: "Omar Yusuf",
    location: "789 Pine Rd, Industrial",
    priority: "Medium",
    status: "Completed",
    time: "12 min ago",
  },
  {
    id: "AMB-004",
    patient: "Aisha Ibrahim",
    location: "321 Elm Blvd, Riverside",
    priority: "Low",
    status: "Pending",
    time: "15 min ago",
  },
  {
    id: "AMB-005",
    patient: "Khalid Mahmoud",
    location: "654 Cedar Ln, Hilltop",
    priority: "Critical",
    status: "En Route",
    time: "18 min ago",
  },
]

const priorityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

const statusIcons: Record<string, React.ReactNode> = {
  "En Route": <Ambulance className="h-3.5 w-3.5" />,
  Dispatched: <MapPin className="h-3.5 w-3.5" />,
  Completed: <CheckCircle2 className="h-3.5 w-3.5" />,
  Pending: <AlertTriangle className="h-3.5 w-3.5" />,
}

const statusColors: Record<string, string> = {
  "En Route": "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400",
  Dispatched: "border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-400",
  Completed: "border-green-200 text-green-700 dark:border-green-800 dark:text-green-400",
  Pending: "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400",
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {stat.changeType === "increase" ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.changeType === "increase"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
              {/* Decorative gradient */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Orders</CardTitle>
          <CardDescription>Latest ambulance dispatch requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{order.id}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${priorityColors[order.priority]}`}>
                        {order.priority}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{order.patient}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {order.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`gap-1 ${statusColors[order.status]}`}>
                    {statusIcons[order.status]}
                    {order.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {order.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
