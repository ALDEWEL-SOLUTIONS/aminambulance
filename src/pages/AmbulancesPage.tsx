import { useState } from "react"
import {
  Ambulance,
  Plus,
  Search,
  Filter,
  AlertOctagon,
  CheckCircle2,
  Clock,
  ShieldAlert,
  MoreVertical,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockAmbulances = [
  {
    id: "AMB-101",
    plateNumber: "KAA 123A",
    model: "Toyota HiAce ALS",
    provider: "Metro Health Responders",
    driver: "John Doe",
    equipmentLevel: "Advanced Life Support (ALS)",
    status: "Available",
    location: "Central Station",
    lastMaintenance: "2026-08-28",
  },
  {
    id: "AMB-102",
    plateNumber: "KBB 456B",
    model: "Mercedes Sprinter ICU",
    provider: "QuickCare Lifesaving Services",
    driver: "Samuel K.",
    equipmentLevel: "Mobile ICU",
    status: "On Mission",
    location: "En Route to City Hospital",
    lastMaintenance: "2026-09-01",
  },
  {
    id: "AMB-103",
    plateNumber: "KCC 789C",
    model: "Ford Transit BLS",
    provider: "FirstAid Response Team",
    driver: "David M.",
    equipmentLevel: "Basic Life Support (BLS)",
    status: "Maintenance",
    location: "Garage Depot B",
    lastMaintenance: "2026-09-06",
  },
  {
    id: "AMB-104",
    plateNumber: "KDD 321D",
    model: "Nissan NV350 Neo",
    provider: "Metro Health Responders",
    driver: "Grace N.",
    equipmentLevel: "Basic Life Support (BLS)",
    status: "Suspended",
    location: "Out of Service",
    lastMaintenance: "2026-07-15",
  },
]

export default function AmbulancesPage() {
  const [search, setSearch] = useState("")
  const canManage = authService.hasPermission("ambulances.manage")
  const canSuspend = authService.hasPermission("ambulances.suspend")

  const filtered = mockAmbulances.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.provider.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ambulance Fleet</h2>
          <p className="text-sm text-muted-foreground">
            Manage active vehicles, emergency capabilities, and operational status
          </p>
        </div>
        {canManage && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Ambulance
          </Button>
        )}
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Fleet</CardTitle>
            <Ambulance className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Across 6 providers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">14</div>
            <p className="text-xs text-muted-foreground mt-1">Ready for dispatch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On Mission</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">7</div>
            <p className="text-xs text-muted-foreground mt-1">Active response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspended / Out</CardTitle>
            <AlertOctagon className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground mt-1">Maintenance & suspended</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Registered Ambulances</CardTitle>
              <CardDescription>View status, equipment levels, and provider ownership</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search fleet..."
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
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Equipment</th>
                  <th className="px-4 py-3">Current Location</th>
                  <th className="px-4 py-3">Status</th>
                  {(canManage || canSuspend) && <th className="px-4 py-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{item.id} ({item.plateNumber})</span>
                        <span className="text-xs text-muted-foreground">{item.model}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.provider}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {item.equipmentLevel}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.location}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          item.status === "Available"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : item.status === "On Mission"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : item.status === "Suspended"
                            ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    {(canManage || canSuspend) && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {canSuspend && item.status !== "Suspended" && (
                            <Button variant="outline" size="sm" className="text-xs text-destructive hover:bg-destructive/10">
                              <ShieldAlert className="h-3.5 w-3.5 mr-1" /> Suspend
                            </Button>
                          )}
                          {canManage && (
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
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
