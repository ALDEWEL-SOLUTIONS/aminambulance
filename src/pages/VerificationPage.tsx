import { useState } from "react"
import { CheckCircle2, XCircle, Search, Filter, Eye, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockVerifications = [
  {
    id: "VER-901",
    entity: "FirstAid Response Team",
    documentType: "Ministry of Health Operating License 2026",
    submittedBy: "Daniel Korir",
    submittedAt: "2026-09-06 14:30",
    status: "Under Review",
    expiryDate: "2027-09-01",
  },
  {
    id: "VER-902",
    entity: "Dr. Elizabeth Wambui",
    documentType: "Advanced Paramedic Certification Board",
    submittedBy: "Elizabeth Wambui",
    submittedAt: "2026-09-05 09:15",
    status: "Approved",
    expiryDate: "2028-06-30",
  },
  {
    id: "VER-903",
    entity: "Emergency Ambulance Corp",
    documentType: "Vehicle Inspection Certificate - AMB-104",
    submittedBy: "Grace Mutua",
    submittedAt: "2026-09-04 11:00",
    status: "Rejected",
    expiryDate: "Expired 2026-08-01",
  },
]

export default function VerificationPage() {
  const [search, setSearch] = useState("")
  const canReview = authService.hasPermission("verification.review")

  const filtered = mockVerifications.filter(
    (item) =>
      item.entity.toLowerCase().includes(search.toLowerCase()) ||
      item.documentType.toLowerCase().includes(search.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Compliance & Document Verification</h2>
          <p className="text-sm text-muted-foreground">
            Inspect paramedic licenses, vehicle inspection certificates, and provider operating permits
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">4 Applications</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting administrative sign-off</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified Certificates</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">86 Approved</div>
            <p className="text-xs text-muted-foreground mt-1">Valid active credentials</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected / Expired</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2 Declined</div>
            <p className="text-xs text-muted-foreground mt-1">Requires re-submission</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Compliance Queue</CardTitle>
              <CardDescription>Submitted licenses and official documentation</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
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
                  <th className="px-4 py-3">Ref ID</th>
                  <th className="px-4 py-3">Applicant Entity</th>
                  <th className="px-4 py-3">Document Title</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Valid Until</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-xs text-foreground">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.entity}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{item.documentType}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{item.submittedAt}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          item.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : item.status === "Under Review"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{item.expiryDate}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="text-xs gap-1">
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                        {canReview && item.status === "Under Review" && (
                          <>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs text-destructive hover:bg-destructive/10">
                              Reject
                            </Button>
                          </>
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
