import { Activity, Database, Wifi, ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    name: "API Web Service (asp.net core)",
    endpoint: "my911webservice.runasp.net/api/v1",
    status: "Operational",
    latency: "42 ms",
    uptime: "99.98%",
  },
  {
    name: "Real-time Dispatch SignalR Gateway",
    endpoint: "my911webservice.runasp.net/hubs/dispatch",
    status: "Operational",
    latency: "18 ms",
    uptime: "99.99%",
  },
  {
    name: "PostgreSQL Production Database",
    endpoint: "db.aminambulance.internal:5432",
    status: "Operational",
    latency: "5 ms",
    uptime: "100.00%",
  },
  {
    name: "M-PESA Payment Gateway Webhook",
    endpoint: "api.safaricom.co.ke/mpesa/b2c/v1",
    status: "Operational",
    latency: "120 ms",
    uptime: "99.95%",
  },
  {
    name: "Google Maps Geolocation Service",
    endpoint: "maps.googleapis.com/maps/api",
    status: "Operational",
    latency: "85 ms",
    uptime: "99.99%",
  },
]

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Infrastructure Health</h2>
          <p className="text-sm text-muted-foreground">
            Live server status, database connections, API latency, and uptime monitoring
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh Health Check
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Global System Uptime</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">99.98%</div>
            <p className="text-xs text-muted-foreground mt-1">Past 90 days reliability</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">API Latency</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 ms</div>
            <p className="text-xs text-muted-foreground mt-1">Optimal response speed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Database Pool</CardTitle>
            <Database className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">18 / 100</div>
            <p className="text-xs text-muted-foreground mt-1">Active connection pool</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active WebSockets</CardTitle>
            <Wifi className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">142</div>
            <p className="text-xs text-muted-foreground mt-1">Live ambulance connections</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Microservice & Gateway Status</CardTitle>
          <CardDescription>Real-time telemetry from platform infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-accent/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Service Name</th>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Latency</th>
                  <th className="px-4 py-3">Uptime</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {services.map((item) => (
                  <tr key={item.name} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{item.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.endpoint}</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{item.latency}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600 text-xs">{item.uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
