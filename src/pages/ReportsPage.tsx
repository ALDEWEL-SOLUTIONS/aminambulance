import { BarChart3, Download, Calendar, TrendingUp, Clock, Ambulance, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockReports = [
  {
    id: "REP-2026-08",
    title: "Monthly Ambulance Dispatch Performance Report",
    period: "August 2026",
    generatedAt: "2026-09-01",
    fileSize: "2.4 MB PDF",
    status: "Ready",
  },
  {
    id: "REP-2026-W35",
    title: "Weekly Provider Revenue & Settlement Breakdown",
    period: "Aug 24 - Aug 30, 2026",
    generatedAt: "2026-08-31",
    fileSize: "1.1 MB CSV",
    status: "Ready",
  },
  {
    id: "REP-EMERG-Q3",
    title: "911 Emergency Response SLA Audit Report",
    period: "Q3 2026 (July - September)",
    generatedAt: "2026-09-05",
    fileSize: "4.8 MB PDF",
    status: "Ready",
  },
]

export default function ReportsPage() {
  const canExport = authService.hasPermission("reports.export")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports & Performance Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Generate and export operational analytics, response times, and financial summaries
          </p>
        </div>
        {canExport && (
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Export Full Audit (CSV/PDF)
          </Button>
        )}
      </div>

      {/* Analytics Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Emergency Response</CardTitle>
            <Clock className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">5.8 mins</div>
            <p className="text-xs text-muted-foreground mt-1">Faster by 12% vs benchmark</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Dispatches</CardTitle>
            <Ambulance className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">Past 30 days total trips</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion SLA</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">98.6%</div>
            <p className="text-xs text-muted-foreground mt-1">Successful hospital arrivals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Generated Reports</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">Archived audit files</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generated Analytics Statements</CardTitle>
          <CardDescription>Available reports for compliance and management review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent/40 gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{report.title}</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {report.id}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <Calendar className="h-3 w-3" /> Period: {report.period} • Generated: {report.generatedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-mono text-muted-foreground">{report.fileSize}</span>
                  {canExport && (
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
