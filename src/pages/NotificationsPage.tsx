import { useState } from "react"
import { Bell, Send, CheckCircle2, AlertTriangle, Info, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockNotifications = [
  {
    id: "NOTIF-301",
    title: "Critical Traffic Alert - Uhuru Highway",
    type: "Emergency Alert",
    recipientGroup: "All Emergency Drivers",
    message: "Major accident blocking all northbound lanes. Re-route via Valley Road.",
    sentAt: "10 mins ago",
    status: "Delivered",
  },
  {
    id: "NOTIF-302",
    title: "System Maintenance Broadcast",
    type: "System Notice",
    recipientGroup: "All Registered Providers",
    message: "Scheduled platform upgrade tonight between 02:00 AM and 03:00 AM UTC.",
    sentAt: "2 hours ago",
    status: "Delivered",
  },
  {
    id: "NOTIF-303",
    title: "License Renewal Reminder",
    type: "Compliance Notice",
    recipientGroup: "Metro Health Responders",
    message: "Vehicle AMB-104 inspection certificate expires in 7 days.",
    sentAt: "1 day ago",
    status: "Pending Read",
  },
]

export default function NotificationsPage() {
  const [search, setSearch] = useState("")
  const canManage = authService.hasPermission("notifications.manage")

  const filtered = mockNotifications.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase()) ||
      item.recipientGroup.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications & Alerts</h2>
          <p className="text-sm text-muted-foreground">
            Manage system push notifications, dispatch broadcasts, and SMS alerts
          </p>
        </div>
        {canManage && (
          <Button className="gap-2">
            <Send className="h-4 w-4" /> Broadcast Notification
          </Button>
        )}
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Broadcasts Sent Today</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">To drivers & provider admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivery Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">99.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Push & SMS response rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Emergency Alerts Active</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground mt-1">Active roadblock broadcast</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Log */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Recent Notification Broadcasts</CardTitle>
              <CardDescription>History of platform alerts and dispatch broadcasts</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/40 gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                    {item.type === "Emergency Alert" ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Info className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{item.title}</span>
                      <Badge variant="outline" className="text-xs font-normal">
                        {item.type}
                      </Badge>
                      <Badge className="bg-accent text-accent-foreground text-xs font-normal">
                        To: {item.recipientGroup}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {item.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.sentAt}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
