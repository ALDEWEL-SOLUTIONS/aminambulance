import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  Filter,
  PlusCircle,
  Ambulance,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Order {
  id: string
  patient: string
  phone: string
  location: string
  priority: "Critical" | "High" | "Medium" | "Low"
  status: "Pending" | "Dispatched" | "En Route" | "Completed" | "Cancelled"
  ambulance: string
  createdAt: string
}

const orders: Order[] = [
  {
    id: "AMB-001",
    patient: "Ahmed Hassan",
    phone: "+234 801 234 5678",
    location: "123 Main St, Downtown",
    priority: "Critical",
    status: "En Route",
    ambulance: "AMB-V12",
    createdAt: "2025-09-07 09:15",
  },
  {
    id: "AMB-002",
    patient: "Fatima Ali",
    phone: "+234 802 345 6789",
    location: "456 Oak Ave, Suburbs",
    priority: "High",
    status: "Dispatched",
    ambulance: "AMB-V08",
    createdAt: "2025-09-07 09:10",
  },
  {
    id: "AMB-003",
    patient: "Omar Yusuf",
    phone: "+234 803 456 7890",
    location: "789 Pine Rd, Industrial",
    priority: "Medium",
    status: "Completed",
    ambulance: "AMB-V03",
    createdAt: "2025-09-07 08:45",
  },
  {
    id: "AMB-004",
    patient: "Aisha Ibrahim",
    phone: "+234 804 567 8901",
    location: "321 Elm Blvd, Riverside",
    priority: "Low",
    status: "Pending",
    ambulance: "—",
    createdAt: "2025-09-07 08:30",
  },
  {
    id: "AMB-005",
    patient: "Khalid Mahmoud",
    phone: "+234 805 678 9012",
    location: "654 Cedar Ln, Hilltop",
    priority: "Critical",
    status: "En Route",
    ambulance: "AMB-V01",
    createdAt: "2025-09-07 08:15",
  },
  {
    id: "AMB-006",
    patient: "Maryam Bello",
    phone: "+234 806 789 0123",
    location: "987 Birch Way, Lakeview",
    priority: "High",
    status: "Completed",
    ambulance: "AMB-V05",
    createdAt: "2025-09-07 07:50",
  },
  {
    id: "AMB-007",
    patient: "Ibrahim Suleiman",
    phone: "+234 807 890 1234",
    location: "246 Spruce Ct, Midtown",
    priority: "Medium",
    status: "Cancelled",
    ambulance: "—",
    createdAt: "2025-09-07 07:30",
  },
  {
    id: "AMB-008",
    patient: "Zainab Mohammed",
    phone: "+234 808 901 2345",
    location: "135 Walnut Dr, Eastside",
    priority: "Low",
    status: "Completed",
    ambulance: "AMB-V09",
    createdAt: "2025-09-07 07:00",
  },
]

const priorityColors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  "En Route": {
    icon: <Ambulance className="h-3.5 w-3.5" />,
    color: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  },
  Dispatched: {
    icon: <MapPin className="h-3.5 w-3.5" />,
    color: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  },
  Completed: {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    color: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
  Pending: {
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    color: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
  },
  Cancelled: {
    icon: <Trash2 className="h-3.5 w-3.5" />,
    color: "border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-900/20 dark:text-gray-400",
  },
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter className="h-4 w-4" />
                {statusFilter === "all" ? "All Status" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Dispatched")}>
                Dispatched
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("En Route")}>
                En Route
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Cancelled")}>
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link to="/orders/new">
          <Button className="gap-1.5">
            <PlusCircle className="h-4 w-4" />
            New Order
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        {["Pending", "Dispatched", "En Route", "Completed", "Cancelled"].map(
          (status) => {
            const count = orders.filter((o) => o.status === status).length
            const config = statusConfig[status]
            return (
              <Card
                key={status}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  statusFilter === status ? "ring-2 ring-primary" : ""
                }`}
                onClick={() =>
                  setStatusFilter(statusFilter === status ? "all" : status)
                }
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <div className={`rounded-full border p-2 ${config.color}`}>
                    {config.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">{status}</p>
                  </div>
                </CardContent>
              </Card>
            )
          }
        )}
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-base">
            Dispatch Orders ({filteredOrders.length})
          </CardTitle>
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Ambulance</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{order.patient}</p>
                      <p className="text-xs text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate max-w-[200px]">{order.location}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${priorityColors[order.priority]}`}
                    >
                      {order.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`gap-1 ${statusConfig[order.status].color}`}
                    >
                      {statusConfig[order.status].icon}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {order.ambulance}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {order.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
