"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  FileText,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { MissingPerson, FoundPerson } from "@/types"
import { toast } from "react-toastify"

// Sample data for charts
const activityData = [
  { name: "Jan", reports: 65 },
  { name: "Feb", reports: 59 },
  { name: "Mar", reports: 80 },
  { name: "Apr", reports: 81 },
  { name: "May", reports: 56 },
  { name: "Jun", reports: 55 },
  { name: "Jul", reports: 40 },
]

const statusData = [
  { name: "Missing", value: 70 },
  { name: "Found", value: 25 },
  { name: "In Progress", value: 5 },
]

const COLORS = ["#ef4444", "#22c55e", "#f59e0b"]

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [missingReports, setMissingReports] = useState<MissingPerson[]>([])
  const [foundReports, setFoundReports] = useState<FoundPerson[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchUserReports = async () => {
      try {
        // Fetch missing person reports
        const missingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/missing/user`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        // Fetch found person reports
        const foundResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/found/user`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })

        if (!missingResponse.ok || !foundResponse.ok) {
          throw new Error("Failed to fetch reports")
        }

        const missingData = await missingResponse.json()
        const foundData = await foundResponse.json()

        setMissingReports(missingData)
        setFoundReports(foundData)
      } catch (error) {
        toast.error("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserReports()
  }, [user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/report/missing">Report Missing Person</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/report/found">Report Found Person</Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Reports</p>
                <p className="text-2xl font-bold">{missingReports.length + foundReports.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Missing Reports</p>
                <p className="text-2xl font-bold">{missingReports.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">8%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Found Reports</p>
                <p className="text-2xl font-bold">{foundReports.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">24%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Report Views</p>
                <p className="text-2xl font-bold">1,248</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">5%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Report Activity</CardTitle>
            <CardDescription>Monthly report submissions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reports" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Status</CardTitle>
            <CardDescription>Current status of all reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <div className="mb-8">
        <Tabs defaultValue="missing">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Reports</h2>
            <TabsList>
              <TabsTrigger value="missing">Missing</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="missing">
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : missingReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {missingReports.slice(0, 3).map((report) => (
                  <Card key={report._id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{report.name}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Missing since {new Date(report.lastSeen).toLocaleDateString()}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant="destructive">Missing</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{report.location}</span>
                        </div>
                        <p className="line-clamp-2">{report.description}</p>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/missing/${report._id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't reported any missing persons yet.</p>
                  <Button asChild>
                    <Link href="/report/missing">Report Missing Person</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {missingReports.length > 3 && (
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <Link href="/my-reports">View All Reports</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="found">
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : foundReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {foundReports.slice(0, 3).map((report) => (
                  <Card key={report._id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Found Person</CardTitle>
                          <CardDescription>
                            <div className="flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Found on {new Date(report.foundDate).toLocaleDateString()}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                          Found
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span>{report.location}</span>
                        </div>
                        <p className="line-clamp-2">{report.description}</p>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link href={`/found/${report._id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">You haven't reported any found persons yet.</p>
                  <Button asChild>
                    <Link href="/report/found">Report Found Person</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {foundReports.length > 3 && (
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <Link href="/my-reports">View All Reports</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">New match found</p>
                <p className="text-sm text-muted-foreground">
                  A potential match was found for your missing person report.
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-500/10 p-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Report verified</p>
                <p className="text-sm text-muted-foreground">
                  Your missing person report has been verified by our team.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-500/10 p-2">
                <Eye className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Report viewed</p>
                <p className="text-sm text-muted-foreground">Your missing person report has been viewed 24 times.</p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Case update</p>
                <p className="text-sm text-muted-foreground">
                  Authorities have been notified about your missing person report.
                </p>
                <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

