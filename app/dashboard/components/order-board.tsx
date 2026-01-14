"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock order data
const mockOrders = [
  {
    id: "#1234",
    customer: "Priya Sharma",
    product: "Midnight Essence",
    amount: "₹2,499",
    status: "completed",
    date: "2024-01-30",
    payment: "Paid"
  },
  {
    id: "#1233",
    customer: "Arjun Mehta",
    product: "Obsidian",
    amount: "₹2,999",
    status: "processing",
    date: "2024-01-30",
    payment: "Paid"
  },
  {
    id: "#1232",
    customer: "Sneha Reddy",
    product: "Night Bloom",
    amount: "₹2,799",
    status: "completed",
    date: "2024-01-29",
    payment: "Paid"
  },
  {
    id: "#1231",
    customer: "Rahul Kumar",
    product: "Velvet Rose",
    amount: "₹2,399",
    status: "pending",
    date: "2024-01-29",
    payment: "Pending"
  },
  {
    id: "#1230",
    customer: "Ananya Patel",
    product: "Ethereal",
    amount: "₹2,199",
    status: "completed",
    date: "2024-01-28",
    payment: "Paid"
  },
  {
    id: "#1229",
    customer: "Vikram Singh",
    product: "Shadow",
    amount: "₹1,999",
    status: "cancelled",
    date: "2024-01-28",
    payment: "Refunded"
  },
  {
    id: "#1228",
    customer: "Meera Joshi",
    product: "Dusk",
    amount: "₹2,899",
    status: "completed",
    date: "2024-01-27",
    payment: "Paid"
  },
  {
    id: "#1227",
    customer: "Karan Malhotra",
    product: "Midnight Essence",
    amount: "₹2,499",
    status: "processing",
    date: "2024-01-27",
    payment: "Paid"
  },
]

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    variant: "default" as const,
    color: "text-green-600"
  },
  processing: {
    label: "Processing",
    icon: Clock,
    variant: "secondary" as const,
    color: "text-blue-600"
  },
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "outline" as const,
    color: "text-orange-600"
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    variant: "destructive" as const,
    color: "text-red-600"
  },
}

export function OrderBoard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bebas gradient-text">
              Order Management
            </CardTitle>
            <CardDescription className="font-dm">
              View and manage all customer orders
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search orders, customers, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-space font-semibold">Order ID</TableHead>
                <TableHead className="font-space font-semibold">Customer</TableHead>
                <TableHead className="font-space font-semibold">Product</TableHead>
                <TableHead className="font-space font-semibold">Amount</TableHead>
                <TableHead className="font-space font-semibold">Status</TableHead>
                <TableHead className="font-space font-semibold">Date</TableHead>
                <TableHead className="font-space font-semibold">Payment</TableHead>
                <TableHead className="font-space font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, index) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon

                  return (
                    <TableRow
                      key={order.id}
                      className="hover:bg-secondary/30 transition-colors scale-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-space font-semibold">
                        {order.id}
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell className="font-bebas gradient-text">
                        {order.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className="gap-1">
                          <StatusIcon className={`w-3 h-3 ${status.color}`} />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={order.payment === "Paid" ? "default" : "outline"}
                        >
                          {order.payment}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Download className="w-4 h-4" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground font-space mb-1">Total Orders</p>
            <p className="text-2xl font-bebas gradient-text">{filteredOrders.length}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground font-space mb-1">Completed</p>
            <p className="text-2xl font-bebas gradient-text">
              {filteredOrders.filter(o => o.status === "completed").length}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground font-space mb-1">Processing</p>
            <p className="text-2xl font-bebas gradient-text">
              {filteredOrders.filter(o => o.status === "processing").length}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground font-space mb-1">Pending</p>
            <p className="text-2xl font-bebas gradient-text">
              {filteredOrders.filter(o => o.status === "pending").length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

