"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useSimulations, type Simulation } from "@/lib/simulations-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Dna,
  Atom,
  FlaskConical,
  Calculator,
  LayoutDashboard,
  List,
  Star,
  Check,
  Lock,
  LogIn,
  FileCode,
  FolderUp,
  File,
  X,
  Eye,
  LogOut,
  AlertCircle,
} from "lucide-react"

const subjectIcons = {
  biology: Dna,
  physics: Atom,
  chemistry: FlaskConical,
  math: Calculator,
}

const subjectColors = {
  biology: "text-green-500",
  physics: "text-blue-500",
  chemistry: "text-orange-500",
  math: "text-purple-500",
}

interface UploadedFile {
  name: string
  size: number
  type: string
  content?: string
}

export default function AdminPage() {
  const { simulations, addSimulation, updateSimulation, deleteSimulation } = useSimulations()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [authToken, setAuthToken] = useState("")

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSimulation, setEditingSimulation] = useState<Simulation | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [previewSimulation, setPreviewSimulation] = useState<Simulation | null>(null)

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const token = sessionStorage.getItem("origlena-admin-token")
    if (token) {
      setIsAuthenticated(true)
      setAuthToken(token)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError("")

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        setAuthToken(data.token)
        sessionStorage.setItem("origlena-admin-token", data.token)
        setPassword("")
      } else {
        setAuthError(data.message || "Invalid password")
      }
    } catch (error) {
      setAuthError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAuthToken("")
    sessionStorage.removeItem("origlena-admin-token")
  }

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "biology" as Simulation["subject"],
    difficulty: "beginner" as Simulation["difficulty"],
    topics: "",
    duration: "15 min",
    href: "",
    featured: false,
    type: "react" as "react" | "html" | "iframe",
  })

  const [successMessage, setSuccessMessage] = useState("")

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      subject: "biology",
      difficulty: "beginner",
      topics: "",
      duration: "15 min",
      href: "",
      featured: false,
      type: "react",
    })
    setUploadedFiles([])
  }

  // File upload handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    setUploadProgress(0)

    const newFiles: UploadedFile[] = []
    let processed = 0

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          content: event.target?.result as string,
        })
        processed++
        setUploadProgress((processed / files.length) * 100)

        if (processed === files.length) {
          setUploadedFiles((prev) => [...prev, ...newFiles])
          setIsUploading(false)
        }
      }
      reader.readAsText(file)
    })
  }

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    setUploadProgress(0)

    const newFiles: UploadedFile[] = []
    let processed = 0

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        // Preserve folder structure in filename
        const relativePath = (file as any).webkitRelativePath || file.name
        newFiles.push({
          name: relativePath,
          size: file.size,
          type: file.type,
          content: event.target?.result as string,
        })
        processed++
        setUploadProgress((processed / files.length) * 100)

        if (processed === files.length) {
          setUploadedFiles((prev) => [...prev, ...newFiles])
          setIsUploading(false)
        }
      }
      reader.readAsText(file)
    })
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddSimulation = () => {
    if (!formData.title || !formData.description || !formData.href) {
      return
    }

    addSimulation({
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      difficulty: formData.difficulty,
      topics: formData.topics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      duration: formData.duration,
      rating: 0,
      users: "0",
      href: formData.href.startsWith("/") ? formData.href : `/${formData.href}`,
      featured: formData.featured,
      type: formData.type,
      uploadedFiles: uploadedFiles.map((f) => f.name),
    })

    setSuccessMessage(`"${formData.title}" has been added successfully!`)
    setTimeout(() => setSuccessMessage(""), 3000)
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditSimulation = () => {
    if (!editingSimulation) return

    updateSimulation(editingSimulation.id, {
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      difficulty: formData.difficulty,
      topics: formData.topics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      duration: formData.duration,
      href: formData.href.startsWith("/") ? formData.href : `/${formData.href}`,
      featured: formData.featured,
      type: formData.type,
    })

    setSuccessMessage(`"${formData.title}" has been updated successfully!`)
    setTimeout(() => setSuccessMessage(""), 3000)
    resetForm()
    setEditingSimulation(null)
  }

  const openEditDialog = (sim: Simulation) => {
    setFormData({
      title: sim.title,
      description: sim.description,
      subject: sim.subject,
      difficulty: sim.difficulty,
      topics: sim.topics.join(", "),
      duration: sim.duration,
      href: sim.href,
      featured: sim.featured || false,
      type: sim.type || "react",
    })
    setEditingSimulation(sim)
  }

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setDeleteConfirmId(null)
    setSuccessMessage("Simulation deleted successfully!")
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  // Stats
  const totalSimulations = simulations.length
  const customSimulations = simulations.filter((s) => s.isCustom).length
  const featuredSimulations = simulations.filter((s) => s.featured).length
  const subjectCounts = {
    biology: simulations.filter((s) => s.subject === "biology").length,
    physics: simulations.filter((s) => s.subject === "physics").length,
    chemistry: simulations.filter((s) => s.subject === "chemistry").length,
    math: simulations.filter((s) => s.subject === "math").length,
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl">Admin Panel</CardTitle>
                <CardDescription>Enter password to access the admin dashboard</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    disabled={isLoading}
                  />
                  {authError && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {authError}
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      Login
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-grow">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold">Admin Panel</h1>
                </div>
                <p className="text-muted-foreground">
                  Manage simulations, upload new content, and configure the platform
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-600 dark:text-green-400">
              <Check className="h-5 w-5" />
              {successMessage}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalSimulations}</div>
                <p className="text-sm text-muted-foreground">Total Simulations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{customSimulations}</div>
                <p className="text-sm text-muted-foreground">Custom Added</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{featuredSimulations}</div>
                <p className="text-sm text-muted-foreground">Featured</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">4</div>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="simulations" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="simulations" className="gap-2">
                <List className="h-4 w-4" />
                Simulations
              </TabsTrigger>
              <TabsTrigger value="add" className="gap-2">
                <Plus className="h-4 w-4" />
                Add New
              </TabsTrigger>
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
            </TabsList>

            {/* Simulations List Tab */}
            <TabsContent value="simulations">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Simulations</CardTitle>
                      <CardDescription>
                        Manage all simulations. Click edit to modify or delete to remove.
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {Object.entries(subjectCounts).map(([subject, count]) => {
                        const Icon = subjectIcons[subject as keyof typeof subjectIcons]
                        return (
                          <Badge key={subject} variant="secondary" className="gap-1">
                            <Icon className={cn("h-3 w-3", subjectColors[subject as keyof typeof subjectColors])} />
                            {count}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {simulations.map((sim) => {
                          const Icon = subjectIcons[sim.subject]
                          return (
                            <TableRow key={sim.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{sim.title}</span>
                                  {sim.featured && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Icon className={cn("h-4 w-4", subjectColors[sim.subject])} />
                                  <span className="capitalize">{sim.subject}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {sim.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="capitalize">
                                  {sim.type || "react"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {sim.isCustom ? (
                                  <Badge className="bg-primary/10 text-primary">Custom</Badge>
                                ) : (
                                  <Badge variant="secondary">Default</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" onClick={() => setPreviewSimulation(sim)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(sim)}>
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  {sim.isCustom && (
                                    <>
                                      {deleteConfirmId === sim.id ? (
                                        <div className="flex items-center gap-1">
                                          <Button variant="destructive" size="sm" onClick={() => handleDelete(sim.id)}>
                                            Confirm
                                          </Button>
                                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
                                            Cancel
                                          </Button>
                                        </div>
                                      ) : (
                                        <Button variant="ghost" size="icon" onClick={() => setDeleteConfirmId(sim.id)}>
                                          <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add New Tab */}
            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Simulation</CardTitle>
                  <CardDescription>Create a new simulation entry manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Cell Division"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value: Simulation["subject"]) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="biology">
                            <div className="flex items-center gap-2">
                              <Dna className="h-4 w-4 text-green-500" />
                              Biology
                            </div>
                          </SelectItem>
                          <SelectItem value="physics">
                            <div className="flex items-center gap-2">
                              <Atom className="h-4 w-4 text-blue-500" />
                              Physics
                            </div>
                          </SelectItem>
                          <SelectItem value="chemistry">
                            <div className="flex items-center gap-2">
                              <FlaskConical className="h-4 w-4 text-orange-500" />
                              Chemistry
                            </div>
                          </SelectItem>
                          <SelectItem value="math">
                            <div className="flex items-center gap-2">
                              <Calculator className="h-4 w-4 text-purple-500" />
                              Mathematics
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty *</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value: Simulation["difficulty"]) =>
                          setFormData({ ...formData, difficulty: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Simulation Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: "react" | "html" | "iframe") =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="react">React Component</SelectItem>
                          <SelectItem value="html">HTML/JavaScript</SelectItem>
                          <SelectItem value="iframe">External iFrame</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 15 min"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="href">URL Path *</Label>
                      <Input
                        id="href"
                        placeholder="/simulations/biology/cell"
                        value={formData.href}
                        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this simulation teaches..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topics">Topics (comma separated)</Label>
                    <Input
                      id="topics"
                      placeholder="DNA, Genetics, Molecular Biology"
                      value={formData.topics}
                      onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="featured">Feature this simulation on homepage</Label>
                  </div>

                  <Button onClick={handleAddSimulation} className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Add Simulation
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Simulation Files</CardTitle>
                  <CardDescription>
                    Upload React components or HTML files. Folder uploads will preserve structure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload Area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Upload */}
                    <div
                      className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FileCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Upload Files</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Click to select .tsx, .jsx, .html, .js, .css files
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Select Files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".tsx,.jsx,.html,.js,.css,.ts"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>

                    {/* Folder Upload */}
                    <div
                      className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                      onClick={() => folderInputRef.current?.click()}
                    >
                      <FolderUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">Upload Folder</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload entire simulation folder with structure
                      </p>
                      <Button variant="outline" size="sm">
                        <FolderUp className="h-4 w-4 mr-2" />
                        Select Folder
                      </Button>
                      <input
                        ref={folderInputRef}
                        type="file"
                        // @ts-ignore - webkitdirectory is not in types
                        webkitdirectory=""
                        // @ts-ignore
                        directory=""
                        multiple
                        onChange={handleFolderSelect}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading files...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Uploaded Files ({uploadedFiles.length})</h4>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <File className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Simulation Details for Upload */}
                  {uploadedFiles.length > 0 && (
                    <>
                      <div className="border-t pt-6 space-y-4">
                        <h4 className="font-semibold">Simulation Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title *</Label>
                            <Input
                              placeholder="Simulation title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Subject *</Label>
                            <Select
                              value={formData.subject}
                              onValueChange={(value: Simulation["subject"]) =>
                                setFormData({ ...formData, subject: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="biology">Biology</SelectItem>
                                <SelectItem value="physics">Physics</SelectItem>
                                <SelectItem value="chemistry">Chemistry</SelectItem>
                                <SelectItem value="math">Mathematics</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Type *</Label>
                            <Select
                              value={formData.type}
                              onValueChange={(value: "react" | "html" | "iframe") =>
                                setFormData({ ...formData, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="react">React Component</SelectItem>
                                <SelectItem value="html">HTML/JavaScript</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>URL Path *</Label>
                            <Input
                              placeholder="/simulations/subject/name"
                              value={formData.href}
                              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description *</Label>
                          <Textarea
                            placeholder="What does this simulation teach?"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                          />
                        </div>
                      </div>

                      <Button onClick={handleAddSimulation} className="w-full gap-2">
                        <Upload className="h-4 w-4" />
                        Upload & Create Simulation
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={!!editingSimulation} onOpenChange={() => setEditingSimulation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Simulation</DialogTitle>
            <DialogDescription>Update the simulation details below</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value: Simulation["subject"]) => setFormData({ ...formData, subject: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: Simulation["difficulty"]) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Topics (comma separated)</Label>
              <Input value={formData.topics} onChange={(e) => setFormData({ ...formData, topics: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>URL Path</Label>
              <Input value={formData.href} onChange={(e) => setFormData({ ...formData, href: e.target.value })} />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="edit-featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="edit-featured">Feature on homepage</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSimulation(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSimulation}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewSimulation} onOpenChange={() => setPreviewSimulation(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{previewSimulation?.title}</DialogTitle>
          </DialogHeader>
          {previewSimulation && (
            <div className="space-y-4">
              <p className="text-muted-foreground">{previewSimulation.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Subject:</span>{" "}
                  <span className="capitalize">{previewSimulation.subject}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Difficulty:</span>{" "}
                  <span className="capitalize">{previewSimulation.difficulty}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span> {previewSimulation.duration}
                </div>
                <div>
                  <span className="text-muted-foreground">Rating:</span> {previewSimulation.rating}/5
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {previewSimulation.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
              <Button asChild className="w-full">
                <a href={previewSimulation.href} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  Open Simulation
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
