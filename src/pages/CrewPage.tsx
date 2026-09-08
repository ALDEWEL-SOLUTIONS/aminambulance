import { useState } from "react"
import { Users, UserPlus, Search, Filter, ShieldAlert, Award, Phone, CheckCircle, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockCrew = [
  {
    id: "CRW-01",
    name: "Dr. Elizabeth Wambui",
    role: "Paramedic / EMS Lead",
    provider: "Metro Health Responders",
    phone: "+254 712 345 678",
    qualification: "Advanced Emergency Medical Tech",
    status: "Active",
    shift: "Day Shift (08:00 - 20:00)",
  },
  {
    id: "CRW-02",
    name: "Peter Otieno",
    role: "Emergency Ambulance Driver",
    provider: "QuickCare Lifesaving Services",
    phone: "+254 722 987 654",
    qualification: "Evasive Driving & Basic First Aid",
    status: "Active",
    shift: "Night Shift (20:00 - 08:00)",
  },
  {
    id: "CRW-03",
    name: "Nurse Beatrice Njeri",
    role: "ICU Specialist Nurse",
    provider: "FirstAid Response Team",
    phone: "+254 733 112 233",
    qualification: "Critical Care Paramedic",
    status: "On Leave",
    shift: "Off Duty",
  },
  {
    id: "CRW-04",
    name: "Victor Kiprop",
    role: "EMT Emergency Technician",
    provider: "Metro Health Responders",
    phone: "+254 700 445 566",
    qualification: "EMT-B Certified",
    status: "Suspended",
    shift: "Suspended",
  },
]

export default function CrewPage() {
  const [search, setSearch] = useState("")
  const canManage = authService.hasPermission("crew.manage")
  const canSuspend = authService.hasPermission("crew.suspend")

  const filtered = mockCrew.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.provider.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ambulance Crew & Medical Staff</h2>
          <p className="text-sm text-muted-foreground">
            Manage active medical personnel, EMTs, paramedics, and emergency drivers
          </p>
        </div>
        {canManage && (
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Add Crew Member
          </Button>
        )}
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Personnel</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">Across all registered providers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active On Duty</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">32</div>
            <p className="text-xs text-muted-foreground mt-1">Available & assigned to vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Off Duty / Leave</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">14</div>
            <p className="text-xs text-muted-foreground mt-1">Rest shift & off duty</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspended Staff</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <p className="text-xs text-muted-foreground mt-1">Pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Crew Directory</CardTitle>
              <CardDescription>View certification, contacts, and shift schedules</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crew..."
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
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Provider</th>
                  <th className="px-4 py-3">Qualification</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Status</th>
                  {(canManage || canSuspend) && <th className="px-4 py-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{item.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{item.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground">{item.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.provider}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {item.qualification}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1 text-xs">
                        <Phone className="h-3 w-3" />
                        {item.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          item.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : item.status === "On Leave"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
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
