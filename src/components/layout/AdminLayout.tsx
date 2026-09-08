import { useState } from "react"
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Ambulance,
  ChevronLeft,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  User,
  Moon,
  Sun,
  ShieldCheck,
  Users,
  AlertCircle,
  CreditCard,
  DollarSign,
  Tag,
  Building2,
  BarChart3,
  Activity,
  FileCheck,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authService } from "@/services/authService"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  requiredPermission?: string
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    requiredPermission: "admin.dashboard.view",
  },
  {
    title: "Dispatches & Orders",
    href: "/orders",
    icon: ClipboardList,
    requiredPermission: "dispatch.view",
  },
  {
    title: "New Dispatch",
    href: "/orders/new",
    icon: PlusCircle,
    requiredPermission: "dispatch.assign",
  },
  {
    title: "Emergency Incidents",
    href: "/incidents",
    icon: AlertCircle,
    requiredPermission: "incidents.view",
  },
  {
    title: "Ambulance Fleet",
    href: "/ambulances",
    icon: Ambulance,
    requiredPermission: "ambulances.view",
  },
  {
    title: "Crew & Medics",
    href: "/crew",
    icon: Users,
    requiredPermission: "crew.view",
  },
  {
    title: "Service Providers",
    href: "/providers",
    icon: Building2,
    requiredPermission: "providers.view",
  },
  {
    title: "Verification Review",
    href: "/verification",
    icon: FileCheck,
    requiredPermission: "verification.view",
  },
  {
    title: "Payments & Revenue",
    href: "/payments",
    icon: CreditCard,
    requiredPermission: "payments.view",
  },
  {
    title: "Provider Payouts",
    href: "/payouts",
    icon: DollarSign,
    requiredPermission: "payouts.view",
  },
  {
    title: "Pricing & Tariffs",
    href: "/pricing",
    icon: Tag,
    requiredPermission: "pricing.view",
  },
  {
    title: "Reports & Analytics",
    href: "/reports",
    icon: BarChart3,
    requiredPermission: "reports.view",
  },
  {
    title: "Notifications & Alerts",
    href: "/notifications",
    icon: Bell,
    requiredPermission: "notifications.view",
  },
  {
    title: "Audit Trail",
    href: "/audit",
    icon: ShieldCheck,
    requiredPermission: "audit.view",
  },
  {
    title: "Users & Roles",
    href: "/users",
    icon: UserCheck,
    requiredPermission: "users.view",
  },
  {
    title: "System Health",
    href: "/system-health",
    icon: Activity,
    requiredPermission: "system_health.view",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    requiredPermission: "settings.view",
  },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  const user = authService.getUser()
  const filteredNavItems = navItems.filter(item => 
    !item.requiredPermission || authService.hasPermission(item.requiredPermission)
  )

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = () => {
    authService.logout()
    navigate("/login")
  }

  const currentTitle = navItems.find((item) => item.href === location.pathname)?.title || "Dashboard"

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex flex-col border-r bg-card transition-all duration-300 ease-in-out z-20",
          collapsed ? "w-[68px]" : "w-[260px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Ambulance className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold tracking-tight text-foreground">
                AminAmbulance
              </span>
              <span className="truncate text-[11px] text-muted-foreground font-medium">
                Admin Command Portal
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                title={collapsed ? item.title : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card/80 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} title="Toggle dark mode">
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative" title="Notifications">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
            </Button>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'AD'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground hidden md:inline">
                    {user?.displayName || 'Admin'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{user?.displayName || 'Administrator'}</span>
                    <span className="text-xs text-muted-foreground truncate">{user?.email || 'admin@aminambulance.com'}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  Account Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
