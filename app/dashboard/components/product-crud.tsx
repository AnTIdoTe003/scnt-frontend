"use client"

import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Image as ImageIcon,
  Save,
  X
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product, ProductCategory, getAllProducts } from "@/lib/products"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock products data (in a real app, this would come from an API)
const initialProducts = getAllProducts().slice(0, 10) // Get first 10 products

export function ProductCRUD() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    notes: "",
    intensity: "Medium" as "Low" | "Medium" | "High",
    category: "Men" as ProductCategory,
    description: "",
    topNotes: "",
    heartNotes: "",
    baseNotes: "",
    longevity: "",
    images: "",
  })

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.notes.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenCreate = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      slug: "",
      price: "",
      notes: "",
      intensity: "Medium",
      category: "Men",
      description: "",
      topNotes: "",
      heartNotes: "",
      baseNotes: "",
      longevity: "",
      images: "",
    })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price.replace("₹", ""),
      notes: product.notes,
      intensity: product.intensity,
      category: product.category,
      description: product.description,
      topNotes: product.topNotes.join(", "),
      heartNotes: product.heartNotes.join(", "),
      baseNotes: product.baseNotes.join(", "),
      longevity: product.longevity,
      images: product.images.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    const newProduct: Product = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      price: `₹${formData.price}`,
      notes: formData.notes,
      intensity: formData.intensity,
      category: formData.category,
      description: formData.description,
      topNotes: formData.topNotes.split(",").map(n => n.trim()).filter(Boolean),
      heartNotes: formData.heartNotes.split(",").map(n => n.trim()).filter(Boolean),
      baseNotes: formData.baseNotes.split(",").map(n => n.trim()).filter(Boolean),
      longevity: formData.longevity,
      recommendations: [],
      images: formData.images.split(",").map(img => img.trim()).filter(Boolean),
    }

    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.slug === editingProduct.slug ? newProduct : p))
    } else {
      // Create new product
      setProducts([...products, newProduct])
    }

    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  const handleDelete = (slug: string) => {
    setProducts(products.filter(p => p.slug !== slug))
    setDeleteProductId(null)
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bebas gradient-text">
              Product Management
            </CardTitle>
            <CardDescription className="font-dm">
              Create, edit, and manage your perfume products
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bebas gradient-text">
                  {editingProduct ? "Edit Product" : "Create New Product"}
                </DialogTitle>
                <DialogDescription className="font-dm">
                  {editingProduct
                    ? "Update product information below"
                    : "Fill in the details to add a new product"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Product Name</label>
                    <Input
                      placeholder="Midnight Essence"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Slug</label>
                    <Input
                      placeholder="midnight-essence"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Price (₹)</label>
                    <Input
                      type="number"
                      placeholder="2499"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Category</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as ProductCategory })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Unisex">Unisex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Intensity</label>
                    <Select
                      value={formData.intensity}
                      onValueChange={(value) => setFormData({ ...formData, intensity: value as "Low" | "Medium" | "High" })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-space font-semibold">Notes</label>
                  <Input
                    placeholder="Woody, Spicy"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-space font-semibold">Description</label>
                  <Textarea
                    placeholder="A bold spicy opening that settles into a smooth, woody dry-down..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Top Notes (comma separated)</label>
                    <Input
                      placeholder="Black Pepper, Bergamot, Ginger"
                      value={formData.topNotes}
                      onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Heart Notes (comma separated)</label>
                    <Input
                      placeholder="Leather, Incense"
                      value={formData.heartNotes}
                      onChange={(e) => setFormData({ ...formData, heartNotes: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-space font-semibold">Base Notes (comma separated)</label>
                    <Input
                      placeholder="Sandalwood, Patchouli, Musk"
                      value={formData.baseNotes}
                      onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-space font-semibold">Longevity</label>
                  <Input
                    placeholder="8–10 hours"
                    value={formData.longevity}
                    onChange={(e) => setFormData({ ...formData, longevity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-space font-semibold">Image URLs (comma separated)</label>
                  <Input
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  {editingProduct ? "Update" : "Create"} Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products by name, category, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-space font-semibold">Product</TableHead>
                <TableHead className="font-space font-semibold">Category</TableHead>
                <TableHead className="font-space font-semibold">Price</TableHead>
                <TableHead className="font-space font-semibold">Notes</TableHead>
                <TableHead className="font-space font-semibold">Intensity</TableHead>
                <TableHead className="font-space font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product, index) => (
                  <TableRow
                    key={product.slug}
                    className="hover:bg-secondary/30 transition-colors scale-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="font-space font-semibold">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-bebas gradient-text">
                      {product.price}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.notes}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.intensity === "High" ? "default" :
                          product.intensity === "Medium" ? "secondary" : "outline"
                        }
                      >
                        {product.intensity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleOpenEdit(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => setDeleteProductId(product.slug)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-bebas text-xl">
                                Delete Product
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-dm">
                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product.slug)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 rounded-lg bg-secondary/50">
          <p className="text-sm text-muted-foreground font-space">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{" "}
            <span className="font-semibold text-foreground">{products.length}</span> products
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

