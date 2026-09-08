import { useState } from "react"
import { DollarSign, RefreshCw, Search, Filter, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockPayments = [
  {
    id: "PAY-9901",
    tripId: "AMB-001",
    patientName: "Ahmed Hassan",
    amount: "KES 4,500",
    method: "M-PESA (Ref: QWE8891)",
    status: "Completed",
    date: "2026-09-07 20:14",
  },
  {
    id: "PAY-9902",
    tripId: "AMB-002",
    patientName: "Fatima Ali",
    amount: "KES 8,000",
    method: "Insurance (NHIF/SHA)",
    status: "Completed",
    date: "2026-09-07 19:30",
  },
  {
    id: "PAY-9903",
    tripId: "AMB-003",
    patientName: "Omar Yusuf",
    amount: "KES 3,500",
    method: "Credit Card (Visa **4112)",
    status: "Refunded",
    date: "2026-09-07 17:45",
  },
  {
    id: "PAY-9904",
    tripId: "AMB-004",
    patientName: "Aisha Ibrahim",
    amount: "KES 5,000",
    method: "M-PESA (Ref: QWE7712)",
    status: "Pending Settlement",
    date: "2026-09-07 16:10",
  },
]

export default function PaymentsPage() {
  const [search, setSearch] = useState("")
  const canRefund = authService.hasPermission("payments.refund")

  const filtered = mockPayments.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.patientName.toLowerCase().includes(search.toLowerCase()) ||
      item.method.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payments & Transactions</h2>
          <p className="text-sm text-muted-foreground">
            Track customer payments, M-PESA transactions, insurance billing, and refunds
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue Today</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">KES 142,500</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500" /> +15.4% vs yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Successful Payments</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground mt-1">98.2% transaction success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Refunds Issued</CardTitle>
            <RefreshCw className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">KES 7,000</div>
            <p className="text-xs text-muted-foreground mt-1">2 refunded trips this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">Payment History</CardTitle>
              <CardDescription>All incoming payments for ambulance dispatches</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
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
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Trip ID</th>
                  <th className="px-4 py-3">Patient Name</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  {canRefund && <th className="px-4 py-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-xs text-foreground">{item.id}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{item.tripId}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.patientName}</td>
                    <td className="px-4 py-3 font-bold text-foreground">{item.amount}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{item.method}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          item.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : item.status === "Refunded"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{item.date}</td>
                    {canRefund && (
                      <td className="px-4 py-3 text-right">
                        {item.status === "Completed" && (
                          <Button variant="outline" size="sm" className="text-xs text-destructive hover:bg-destructive/10">
                            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Issue Refund
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
