"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background pt-24 pb-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-sm text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>Helping reunite families since 2023</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Find Missing Loved Ones with <span className="text-primary">LostTrace</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Our advanced platform connects communities to help locate missing persons and bring families back
              together.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for missing persons..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="default" asChild>
                <Link href="/report/missing">Report Missing Person</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/report/found">Report Found Person</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full"></div>
            <div className="relative z-10 bg-gradient-to-tr from-primary to-primary/80 rounded-2xl p-1">
              <div className="bg-background rounded-xl overflow-hidden">
                <div className="aspect-[4/3] bg-muted relative">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="LostTrace Platform"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">Interactive Map</h3>
                      <p className="text-white/80">Track and locate missing persons in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

