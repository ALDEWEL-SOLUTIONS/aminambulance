import { useState } from "react"
import { Users, UserPlus, Search, Filter, ShieldCheck, Lock, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { authService } from "@/services/authService"

const mockUsers = [
  {
    id: "USR-001",
    name: "System Super Admin",
    email: "admin@aminambulance.com",
    role: "Super Administrator",
    permissionsCount: 37,
    status: "Active",
    lastLogin: "Just now",
  },
  {
    id: "USR-002",
    name: "Lead Dispatcher Desk",
    email: "dispatch.lead@aminambulance.com",
    role: "Dispatch Manager",
    permissionsCount: 12,
    status: "Active",
    lastLogin: "15 mins ago",
  },
  {
    id: "USR-003",
    name: "Finance & Accounts Officer",
    email: "finance@aminambulance.com",
    role: "Financial Auditor",
    permissionsCount: 8,
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: "USR-004",
    name: "Provider Metro Admin",
    email: "admin@metrohealth.co.ke",
    role: "Provider Admin",
    permissionsCount: 10,
    status: "Active",
    lastLogin: "1 day ago",
  },
]

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const canManage = authService.hasPermission("users.manage")
  const canManageRoles = authService.hasPermission("users.manage_roles")

  const filtered = mockUsers.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Users & RBAC Roles</h2>
          <p className="text-sm text-muted-foreground">
            Manage administrative accounts, role-based access control, and assigned permissions
          </p>
        </div>
        {canManage && (
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Create User Account
          </Button>
        )}
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Registered Accounts</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">Platform staff & provider managers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Configured Roles</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">5 Roles</div>
            <p className="text-xs text-muted-foreground mt-1">Super Admin, Dispatcher, Finance, Provider</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Permission Scopes</CardTitle>
            <Lock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">37 Scopes</div>
            <p className="text-xs text-muted-foreground mt-1">Granular access definitions</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg">User Accounts Directory</CardTitle>
              <CardDescription>View system access credentials and security roles</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
                  <th className="px-4 py-3">User ID & Name</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Assigned Role</th>
                  <th className="px-4 py-3">Permissions</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Last Active</th>
                  {(canManage || canManageRoles) && <th className="px-4 py-3 text-right">Actions</th>}
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
                    <td className="px-4 py-3 text-foreground">{item.email}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.role}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className="font-mono text-xs font-normal">
                        {item.permissionsCount} permissions
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{item.lastLogin}</td>
                    {(canManage || canManageRoles) && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {canManageRoles && (
                            <Button variant="outline" size="sm" className="text-xs">
                              <Lock className="h-3.5 w-3.5 mr-1" /> Edit Roles
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
