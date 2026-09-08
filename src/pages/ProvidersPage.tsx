import { useState } from "react"
import { Building2, Plus, Search, Filter, ShieldCheck, ShieldAlert, CheckCircle2, UserCheck, Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockProviders = [
  {
    id: "PRV-001",
    name: "Metro Health Responders",
    contactPerson: "Dr. James K.",
    email: "ops@metrohealth.co.ke",
    phone: "+254 711 000 111",
    ambulancesCount: 12,
    verificationStatus: "Verified",
    accountStatus: "Active",
  },
  {
    id: "PRV-002",
    name: "QuickCare Lifesaving Services",
    contactPerson: "Sarah Wanjiku",
    email: "info@quickcare.co.ke",
    phone: "+254 722 333 444",
    ambulancesCount: 8,
    verificationStatus: "Verified",
    accountStatus: "Active",
  },
  {
    id: "PRV-003",
    name: "FirstAid Response Team",
    contactPerson: "Daniel Korir",
    email: "dispatch@firstaid.or.ke",
    phone: "+254 733 555 666",
    ambulancesCount: 4,
    verificationStatus: "Pending Verification",
    accountStatus: "Active",
  },
  {
    id: "PRV-004",
    name: "Emergency Ambulance Corp",
    contactPerson: "Grace Mutua",
    email: "contact@eacorp.co.ke",
    phone: "+254 700 888 999",
    ambulancesCount: 2,
    verificationStatus: "Rejected",
    accountStatus: "Suspended",
  },
]

export default function ProvidersPage() {
  const [search, setSearch] = useState("")
  const canCreate = authService.hasPermission("providers.create")
  const canUpdate = authService.hasPermission("providers.update")
  const canSuspend = authService.hasPermission("providers.suspend")
  const canVerify = authService.hasPermission("providers.verify")

  const filtered = mockProviders.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ambulance Service Providers</h2>
          <p className="text-sm text-muted-foreground">
            Manage partner companies, medical emergency fleets, and verification status
          </p>
        </div>
        {canCreate && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Register New Provider
          </Button>
        )}
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Providers</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">Registered healthcare partners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified & Active</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">11</div>
            <p className="text-xs text-muted-foreground mt-1">Full operational license</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            <UserCheck className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-xs text-muted-foreground mt-1">Documents under inspection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspended</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground mt-1">Out of compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Registered Provider Directory</CardTitle>
              <CardDescription>View operational details and compliance status</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search providers..."
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
                  <th className="px-4 py-3">Provider ID & Name</th>
                  <th className="px-4 py-3">Contact Person</th>
                  <th className="px-4 py-3">Fleet Count</th>
                  <th className="px-4 py-3">Verification</th>
                  <th className="px-4 py-3">Account Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
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
                    <td className="px-4 py-3">
                      <div className="flex flex-col text-xs">
                        <span className="font-medium text-foreground">{item.contactPerson}</span>
                        <span className="text-muted-foreground">{item.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">{item.ambulancesCount} units</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          item.verificationStatus === "Verified"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : item.verificationStatus === "Pending Verification"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }
                      >
                        {item.verificationStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          item.accountStatus === "Active"
                            ? "border-emerald-500 text-emerald-600"
                            : "border-red-500 text-red-600"
                        }
                      >
                        {item.accountStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canVerify && item.verificationStatus === "Pending Verification" && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Verify
                          </Button>
                        )}
                        {canSuspend && item.accountStatus === "Active" && (
                          <Button variant="outline" size="sm" className="text-xs text-destructive hover:bg-destructive/10">
                            <ShieldAlert className="h-3.5 w-3.5 mr-1" /> Suspend
                          </Button>
                        )}
                        {canUpdate && (
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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
