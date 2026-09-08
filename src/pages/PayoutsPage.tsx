import { useState } from "react"
import { DollarSign, CheckCircle2, Clock, ShieldCheck, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockPayouts = [
  {
    id: "PO-8819",
    provider: "Metro Health Responders",
    accountNumber: "Bank: Equity (Acc: 0180****992)",
    amount: "KES 145,000",
    period: "Aug 24 - Aug 30, 2026",
    status: "Pending Approval",
    requestedAt: "2026-09-07 10:00",
  },
  {
    id: "PO-8818",
    provider: "QuickCare Lifesaving Services",
    accountNumber: "M-PESA B2B Paybill: 991823",
    amount: "KES 98,500",
    period: "Aug 24 - Aug 30, 2026",
    status: "Approved & Paid",
    requestedAt: "2026-09-06 14:20",
  },
  {
    id: "PO-8817",
    provider: "FirstAid Response Team",
    accountNumber: "Bank: KCB (Acc: 1102****441)",
    amount: "KES 62,000",
    period: "Aug 24 - Aug 30, 2026",
    status: "Approved & Paid",
    requestedAt: "2026-09-05 11:15",
  },
  {
    id: "PO-8816",
    provider: "St. John Ambulance Partner",
    accountNumber: "Bank: NCBA (Acc: 7721****902)",
    amount: "KES 210,000",
    period: "Aug 17 - Aug 23, 2026",
    status: "Approved & Paid",
    requestedAt: "2026-08-30 09:30",
  },
]

export default function PayoutsPage() {
  const [search, setSearch] = useState("")
  const canApprove = authService.hasPermission("payouts.approve")

  const filtered = mockPayouts.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.provider.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Provider Payouts</h2>
          <p className="text-sm text-muted-foreground">
            Review and approve weekly revenue settlements for ambulance service providers
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">KES 145,000</div>
            <p className="text-xs text-muted-foreground mt-1">1 provider batch awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Disbursed This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">KES 515,500</div>
            <p className="text-xs text-muted-foreground mt-1">Settled to provider accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Service Providers</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Verified for weekly payouts</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Settlement Batch List</CardTitle>
              <CardDescription>Review provider revenue breakdowns and release funds</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payouts..."
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
                  <th className="px-4 py-3">Payout Ref</th>
                  <th className="px-4 py-3">Provider Name</th>
                  <th className="px-4 py-3">Destination Account</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Settlement Period</th>
                  <th className="px-4 py-3">Status</th>
                  {canApprove && <th className="px-4 py-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-xs text-foreground">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.provider}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{item.accountNumber}</td>
                    <td className="px-4 py-3 font-bold text-foreground">{item.amount}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{item.period}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          item.status === "Approved & Paid"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    {canApprove && (
                      <td className="px-4 py-3 text-right">
                        {item.status === "Pending Approval" && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve Payout
                          </Button>
                        )}
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
