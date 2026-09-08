import { useState } from "react"
import { ShieldCheck, Search, Filter, Download, UserCheck, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const mockAuditLogs = [
  {
    id: "LOG-9081",
    action: "USER_SUSPENDED",
    performedBy: "admin@aminambulance.com",
    target: "Provider: QuickCare Ltd",
    ipAddress: "197.232.14.88",
    timestamp: "2026-09-07 21:45:12",
    status: "Success",
    details: "Suspended provider account due to compliance audit failure",
  },
  {
    id: "LOG-9080",
    action: "DISPATCH_ASSIGNED",
    performedBy: "dispatch.lead@aminambulance.com",
    target: "Incident #INC-4402",
    ipAddress: "197.232.14.90",
    timestamp: "2026-09-07 21:30:05",
    status: "Success",
    details: "Assigned Ambulance AMB-101 to critical response",
  },
  {
    id: "LOG-9079",
    action: "PAYOUT_APPROVED",
    performedBy: "finance@aminambulance.com",
    target: "Payout #PAY-8819",
    ipAddress: "102.140.2.11",
    timestamp: "2026-09-07 20:12:40",
    status: "Success",
    details: "Approved payout of KES 45,000 to Metro Health",
  },
  {
    id: "LOG-9078",
    action: "LOGIN_FAILED",
    performedBy: "unknown@external.org",
    target: "System Auth Portal",
    ipAddress: "41.90.112.5",
    timestamp: "2026-09-07 19:55:01",
    status: "Failed",
    details: "Multiple failed authentication attempts detected",
  },
  {
    id: "LOG-9077",
    action: "PRICING_UPDATED",
    performedBy: "admin@aminambulance.com",
    target: "Tariff #TRF-ALS-01",
    ipAddress: "197.232.14.88",
    timestamp: "2026-09-07 18:20:15",
    status: "Success",
    details: "Updated base emergency dispatch rate to KES 3,500",
  },
]

export default function AuditPage() {
  const [search, setSearch] = useState("")

  const filtered = mockAuditLogs.filter(
    (item) =>
      item.action.toLowerCase().includes(search.toLowerCase()) ||
      item.performedBy.toLowerCase().includes(search.toLowerCase()) ||
      item.target.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Audit Logs</h2>
          <p className="text-sm text-muted-foreground">
            Complete immutable security, administrative, and access log history
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Logs
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Log Events</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,290</div>
            <p className="text-xs text-muted-foreground mt-1">Recorded past 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Admin Actions</CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,842</div>
            <p className="text-xs text-muted-foreground mt-1">Verified administrative events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Flags</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">Failed logins / rate limit alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Log Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Audit Activity Log</CardTitle>
              <CardDescription>Real-time audit trail of platform events</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-accent/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Event ID</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Target / Resource</th>
                  <th className="px-4 py-3">IP Address</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{item.id}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{item.action}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.performedBy}</td>
                    <td className="px-4 py-3 text-foreground">{item.target}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.ipAddress}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          item.status === "Success"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {item.timestamp}
                    </td>
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
