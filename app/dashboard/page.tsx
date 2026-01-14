"use client"

import { useState } from "react"
import {
  TrendingUp,
  ShoppingCart,
  Package,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SalesChart } from "./components/sales-chart"
import { OrderBoard } from "./components/order-board"
import { ProductCRUD } from "./components/product-crud"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Mock data for stats
const stats = [
  {
    title: "Total Revenue",
    value: "₹2,45,890",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600"
  },
  {
    title: "Products Sold",
    value: "3,456",
    change: "+15.3%",
    trend: "up",
    icon: Package,
    color: "text-purple-600"
  },
  {
    title: "Avg Order Value",
    value: "₹1,995",
    change: "+5.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600"
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bebas gradient-text mb-2">
              SALES DASHBOARD
            </h1>
            <p className="text-muted-foreground font-dm">
              Manage your perfume business with real-time insights
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={stat.title}
                  className="glass-card hover:glow-subtle transition-all duration-300 hover:-translate-y-1 scale-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-space font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bebas gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-green-600 font-space font-semibold">
                        {stat.change}
                      </span>
                      <span>from last month</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="glass-card mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Products
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Sales Chart */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bebas gradient-text">
                        Sales Performance
                      </CardTitle>
                      <CardDescription className="font-dm">
                        Revenue trends over the last 30 days
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <SalesChart />
                </CardContent>
              </Card>

              {/* Additional Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-bebas gradient-text">
                      Top Products
                    </CardTitle>
                    <CardDescription className="font-dm">
                      Best sellers this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Midnight Essence", sales: 234, revenue: "₹2,08,326" },
                        { name: "Night Bloom", sales: 189, revenue: "₹1,79,555" },
                        { name: "Obsidian", sales: 156, revenue: "₹1,54,444" },
                        { name: "Velvet Rose", sales: 142, revenue: "₹1,26,380" },
                      ].map((product, index) => (
                        <div
                          key={product.name}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors scale-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div>
                            <p className="font-space font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.sales} units sold
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bebas gradient-text text-lg">{product.revenue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-bebas gradient-text">
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="font-dm">
                      Latest orders and updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "New order", details: "Order #1234 - ₹2,499", time: "2 min ago" },
                        { action: "Product updated", details: "Midnight Essence stock updated", time: "15 min ago" },
                        { action: "New order", details: "Order #1233 - ₹1,799", time: "32 min ago" },
                        { action: "Payment received", details: "₹4,298 from 2 orders", time: "1 hour ago" },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors scale-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                          <div className="flex-1">
                            <p className="font-space font-semibold text-sm">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.details}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <OrderBoard />
            </TabsContent>

            <TabsContent value="products">
              <ProductCRUD />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}

