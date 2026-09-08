import { DollarSign, Tag, Plus, Edit, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockTariffs = [
  {
    id: "TRF-ALS-01",
    category: "Advanced Life Support (ALS)",
    baseFee: "KES 4,500",
    perKmRate: "KES 150 / km",
    nightSurge: "+ 20%",
    waitingFee: "KES 500 / hr",
    status: "Active Tier",
  },
  {
    id: "TRF-BLS-01",
    category: "Basic Life Support (BLS)",
    baseFee: "KES 3,000",
    perKmRate: "KES 100 / km",
    nightSurge: "+ 15%",
    waitingFee: "KES 300 / hr",
    status: "Active Tier",
  },
  {
    id: "TRF-ICU-01",
    category: "Mobile ICU Ambulance",
    baseFee: "KES 8,000",
    perKmRate: "KES 250 / km",
    nightSurge: "+ 25%",
    waitingFee: "KES 1,000 / hr",
    status: "Active Tier",
  },
  {
    id: "TRF-NEO-01",
    category: "Neonatal Transport Care",
    baseFee: "KES 6,500",
    perKmRate: "KES 200 / km",
    nightSurge: "+ 20%",
    waitingFee: "KES 750 / hr",
    status: "Active Tier",
  },
]

export default function PricingPage() {
  const canManage = authService.hasPermission("pricing.manage")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pricing & Emergency Tariffs</h2>
          <p className="text-sm text-muted-foreground">
            Configure base dispatch rates, per-kilometer pricing, and surge multipliers
          </p>
        </div>
        {canManage && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Pricing Tier
          </Button>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Pricing Tiers</CardTitle>
            <Tag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Categories</div>
            <p className="text-xs text-muted-foreground mt-1">BLS, ALS, ICU & Neonatal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dynamic Surge Multiplier</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">1.0x (Standard)</div>
            <p className="text-xs text-muted-foreground mt-1">Peak emergency hours surge auto-off</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Platform Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">12% / trip</div>
            <p className="text-xs text-muted-foreground mt-1">Deducted on provider payout</p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockTariffs.map((tier) => (
          <Card key={tier.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="font-mono text-xs">
                  {tier.id}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {tier.status}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-2">{tier.category}</CardTitle>
              <CardDescription>Standard emergency dispatch rate matrix</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-accent/40 p-4">
                <div>
                  <span className="text-xs text-muted-foreground block">Base Dispatch Fee</span>
                  <span className="text-lg font-bold text-foreground">{tier.baseFee}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Per Distance Rate</span>
                  <span className="text-lg font-bold text-foreground">{tier.perKmRate}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Night Shift Surge</span>
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">{tier.nightSurge}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Waiting Time Fee</span>
                  <span className="text-sm font-semibold text-foreground">{tier.waitingFee}</span>
                </div>
              </div>

              {canManage && (
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-3.5 w-3.5" /> Edit Rate Matrix
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
