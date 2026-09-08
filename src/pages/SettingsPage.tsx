import { useState } from "react"
import { Save, Bell, Sliders, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/services/authService"

export default function SettingsPage() {
  const canManage = authService.hasPermission("settings.manage")
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Settings & Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Platform parameters, API integration webhooks, SLA thresholds, and emergency call routing
          </p>
        </div>
        {canManage && (
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> {saved ? "Saved Changes!" : "Save Configuration"}
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dispatch Parameters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Auto-Dispatch SLA Rules</CardTitle>
            </div>
            <CardDescription>Configure emergency vehicle allocation parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="radius">Search Radius for Nearest Ambulance (km)</Label>
              <Input id="radius" defaultValue="15" disabled={!canManage} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acceptTimeout">Driver Acceptance Timeout (seconds)</Label>
              <Input id="acceptTimeout" defaultValue="45" disabled={!canManage} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxEscalation">Max Escalation Time Before Lead Dispatcher Alert (mins)</Label>
              <Input id="maxEscalation" defaultValue="3" disabled={!canManage} />
            </div>
          </CardContent>
        </Card>

        {/* API & Webhook Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">External Integration Keys</CardTitle>
            </div>
            <CardDescription>Payment gateways, SMS providers, and mapping APIs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mpesaPaybill">M-PESA Emergency B2C Paybill</Label>
              <Input id="mpesaPaybill" defaultValue="991823" disabled={!canManage} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsGateway">Africa's Talking SMS API Key</Label>
              <Input id="smsGateway" type="password" defaultValue="atsk_88192389102938102" disabled={!canManage} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mapsKey">Google Maps / Routing API Token</Label>
              <Input id="mapsKey" type="password" defaultValue="AIzaSyA88921379102381203" disabled={!canManage} />
            </div>
          </CardContent>
        </Card>

        {/* Platform Notifications */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Emergency Hotline & Broadcast Channels</CardTitle>
            </div>
            <CardDescription>911 inbound call forwarding and admin escalation numbers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hotline">Primary 911 Hotline Phone Number</Label>
                <Input id="hotline" defaultValue="+254 700 911 911" disabled={!canManage} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminAlertEmail">Escalation Alert Email Address</Label>
                <Input id="adminAlertEmail" defaultValue="escalations@aminambulance.com" disabled={!canManage} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
