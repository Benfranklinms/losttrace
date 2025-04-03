"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { MissingPerson } from "@/types"

export default function MissingPersons() {
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchMissingPersons = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/missing`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch missing persons")
        }

        setMissingPersons(data)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch missing persons")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMissingPersons()
  }, [])

  const filteredPersons = missingPersons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Missing Persons</h1>
        <Link href="/report/missing">
          <Button>Report Missing Person</Button>
        </Link>
      </div>

      <div className="max-w-md">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by name, location, or description"
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
                <CardTitle>{person.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  Missing since: {new Date(person.lastSeen).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-semibold">Age:</span> {person.age}
                </div>
                <div>
                  <span className="font-semibold">Gender:</span> {person.gender}
                </div>
                <div>
                  <span className="font-semibold">Last seen:</span> {person.location}
                </div>
                <div>
                  <span className="font-semibold">Description:</span> {person.description}
                </div>
                <div>
                  <span className="font-semibold">Contact:</span> {person.contactInfo}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/missing/${person._id}`} className="w-full">
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
          <p className="text-xl">No missing persons found</p>
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

