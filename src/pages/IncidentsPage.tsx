import { useState } from "react"
import { AlertCircle, Plus, Search, Filter, MapPin, Clock, ShieldAlert, CheckCircle2, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockIncidents = [
  {
    id: "INC-8801",
    caller: "John Maina (+254 701 112 233)",
    location: "Mombasa Road near City Mall",
    type: "Road Traffic Accident (RTA)",
    severity: "Critical",
    assignedAmbulance: "AMB-102 (QuickCare)",
    status: "Active Dispatch",
    timeReported: "10 mins ago",
  },
  {
    id: "INC-8802",
    caller: "St. Mary's Clinic Dispatcher",
    location: "Kibera South Clinic",
    type: "Maternal Emergency Transfer",
    severity: "High",
    assignedAmbulance: "AMB-101 (Metro)",
    status: "En Route Hospital",
    timeReported: "25 mins ago",
  },
  {
    id: "INC-8803",
    caller: "Security Guards Desk",
    location: "Westlands Commercial Tower",
    type: "Cardiac Arrest / Collapsed",
    severity: "Critical",
    assignedAmbulance: "AMB-105 (FirstAid)",
    status: "Resolved",
    timeReported: "1 hour ago",
  },
  {
    id: "INC-8804",
    caller: "Resident Mary A.",
    location: "Kilimani Ring Road",
    type: "Severe Asthma Attack",
    severity: "Medium",
    assignedAmbulance: "Unassigned",
    status: "Pending Dispatch",
    timeReported: "2 mins ago",
  },
]

const severityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  High: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  Medium: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Low: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
}

export default function IncidentsPage() {
  const [search, setSearch] = useState("")
  const canManage = authService.hasPermission("incidents.manage")

  const filtered = mockIncidents.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Emergency Incidents</h2>
          <p className="text-sm text-muted-foreground">
            Track real-time 911 medical emergencies, caller details, and escalation status
          </p>
        </div>
        {canManage && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Report New Incident
          </Button>
        )}
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">6</div>
            <p className="text-xs text-muted-foreground mt-1">Requires immediate response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Dispatch</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting vehicle assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Level</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">Life-threatening emergencies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">18</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully handled</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Incident Control Log</CardTitle>
              <CardDescription>Live feed of reported emergency incidents</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search incidents..."
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
                  <th className="px-4 py-3">Incident ID</th>
                  <th className="px-4 py-3">Emergency Type</th>
                  <th className="px-4 py-3">Location & Caller</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Assigned Unit</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reported</th>
                  {canManage && <th className="px-4 py-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-xs text-foreground">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
                          <MapPin className="h-3 w-3 text-primary" /> {item.location}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.caller}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={severityColors[item.severity]}>
                        {item.severity}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                      {item.assignedAmbulance}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          item.status === "Pending Dispatch"
                            ? "border-amber-500 text-amber-600"
                            : item.status === "Resolved"
                            ? "border-emerald-500 text-emerald-600"
                            : "border-blue-500 text-blue-600"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{item.timeReported}</td>
                    {canManage && (
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    )}
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
