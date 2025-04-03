"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FoundPerson } from "@/types"

export default function FoundPersons() {
  const [foundPersons, setFoundPersons] = useState<FoundPerson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchFoundPersons = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/found`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch found persons")
        }

        setFoundPersons(data)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch found persons")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFoundPersons()
  }, [])

  const filteredPersons = foundPersons.filter(
    (person) =>
      person.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Found Persons</h1>
        <Link href="/report/found">
          <Button>Report Found Person</Button>
        </Link>
      </div>

      <div className="max-w-md">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by location or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : filteredPersons.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPersons.map((person) => (
            <Card key={person._id}>
              <CardHeader>
                <CardTitle>Found Person</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Found on: {new Date(person.foundDate).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">Approximate Age:</span> {person.approximateAge || "Unknown"}
                </div>
                <div>
                  <span className="font-semibold">Gender:</span> {person.gender || "Unknown"}
                </div>
                <div>
                  <span className="font-semibold">Location:</span> {person.location}
                </div>
                <div>
                  <span className="font-semibold">Description:</span> {person.description}
                </div>
                <div>
                  <span className="font-semibold">Contact:</span> {person.contactInfo}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/found/${person._id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">No found persons reported</p>
          {searchQuery && (
            <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-2">
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

