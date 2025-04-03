"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Filter, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "react-toastify"
import type { MissingPerson, FoundPerson } from "@/types"

export default function MapPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([])
  const [foundPersons, setFoundPersons] = useState<FoundPerson[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | FoundPerson | null>(null)
  const [filters, setFilters] = useState({
    showMissing: true,
    showFound: true,
    timeRange: 30, // days
    ageRange: [0, 100],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch missing persons
        const missingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/missing`)
        const missingData = await missingResponse.json()

        // Fetch found persons
        const foundResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/found`)
        const foundData = await foundResponse.json()

        if (!missingResponse.ok || !foundResponse.ok) {
          throw new Error("Failed to fetch data")
        }

        setMissingPersons(missingData)
        setFoundPersons(foundData)
      } catch (error) {
        toast.error("Failed to load map data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Initialize map (this would use a real map library in production)
    const initMap = () => {
      // This is a placeholder for actual map initialization
      console.log("Map initialized")
    }

    initMap()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter map markers based on search query
    console.log("Searching for:", searchQuery)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Interactive Map</h1>
          <p className="text-muted-foreground">Visualize and search for missing and found persons</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Search</CardTitle>
              <CardDescription>Find specific locations or cases</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or location..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showMissing"
                    checked={filters.showMissing}
                    onCheckedChange={(checked: boolean) => handleFilterChange("showMissing", checked)}
                  />
                  <Label htmlFor="showMissing" className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    Show Missing Persons
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showFound"
                    checked={filters.showFound}
                    onCheckedChange={(checked: boolean) => handleFilterChange("showFound", checked)}
                  />
                  <Label htmlFor="showFound" className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    Show Found Persons
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeRange">Time Range: {filters.timeRange} days</Label>
                <Slider
                  id="timeRange"
                  min={1}
                  max={365}
                  step={1}
                  value={[filters.timeRange]}
                  onValueChange={(value: number[]) => handleFilterChange("timeRange", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ageRange">
                  Age Range: {filters.ageRange[0]} - {filters.ageRange[1]} years
                </Label>
                <Slider
                  id="ageRange"
                  min={0}
                  max={100}
                  step={1}
                  value={filters.ageRange}
                  onValueChange={(value: number[]) => handleFilterChange("ageRange", value)}
                />
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setFilters({
                    showMissing: true,
                    showFound: true,
                    timeRange: 30,
                    ageRange: [0, 100],
                  })
                }
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>

          {/* Selected Person Details */}
          {selectedPerson && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle>{"name" in selectedPerson ? selectedPerson.name : "Found Person"}</CardTitle>
                  {"status" in selectedPerson ? (
                    <Badge variant="destructive">Missing</Badge>
                  ) : (
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                      Found
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  {"lastSeen" in selectedPerson
                    ? `Missing since ${new Date(selectedPerson.lastSeen).toLocaleDateString()}`
                    : `Found on ${new Date(selectedPerson.foundDate).toLocaleDateString()}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <span>{selectedPerson.location}</span>
                </div>
                <p>{selectedPerson.description}</p>
                <Button className="w-full" asChild>
                  <a href={`/${"status" in selectedPerson ? "missing" : "found"}/${selectedPerson._id}`}>
                    View Full Details
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)]">
            <CardContent className="p-0 h-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading map...</p>
                </div>
              ) : (
                <div className="relative h-full bg-muted">
                  {/* This would be replaced with an actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive map would be displayed here</p>
                  </div>

                  {/* Sample map markers */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => setSelectedPerson(missingPersons[0])}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => setSelectedPerson(foundPersons[0])}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => setSelectedPerson(missingPersons[1])}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Map controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <Button size="icon" variant="secondary">
                      +
                    </Button>
                    <Button size="icon" variant="secondary">
                      -
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

