import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Clock, Users, Search, Bell, Shield } from "lucide-react"
import StatsCounter from "@/components/stats-counter"
import TestimonialCard from "@/components/testimonial-card"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter number={1243} label="Missing Persons Found" />
            <StatsCounter number={3567} label="Active Cases" />
            <StatsCounter number={12450} label="Registered Users" />
            <StatsCounter number={98} label="Success Rate %" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">How LostTrace Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides powerful tools to help locate missing persons and reunite families through community
              collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Location Tracking</h3>
                <p className="text-muted-foreground mb-4">
                  Report and track missing persons with precise location data and interactive maps.
                </p>
                <Link href="/missing" className="text-primary flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
                <p className="text-muted-foreground mb-4">
                  Receive instant notifications when new information becomes available about a case.
                </p>
                <Link href="/notifications" className="text-primary flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Network</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with a community dedicated to helping find missing persons.
                </p>
                <Link href="/community" className="text-primary flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Search</h3>
                <p className="text-muted-foreground mb-4">
                  Powerful search tools to filter and find specific cases based on multiple criteria.
                </p>
                <Link href="/search" className="text-primary flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Alert System</h3>
                <p className="text-muted-foreground mb-4">
                  Set up alerts for specific regions or case types to stay informed.
                </p>
                <Link href="/alerts" className="text-primary flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Privacy Protection</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced security measures to protect sensitive information and user privacy.
                </p>
                <Link href="/privacy" className="text-primary flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Help Reunite Families?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join our community of volunteers and make a difference in someone's life today. Every report can help bring
            a loved one back home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/report/missing">Report Missing Person</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20" asChild>
              <Link href="/report/found">Report Found Person</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from families who have been reunited through LostTrace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="After 3 months of searching, LostTrace helped us find our son. The community support was incredible."
              author="Maria Johnson"
              role="Parent"
            />
            <TestimonialCard
              quote="The real-time alerts and detailed reporting system made all the difference in locating my brother."
              author="David Chen"
              role="Family Member"
            />
            <TestimonialCard
              quote="As a volunteer, I've witnessed firsthand how LostTrace's technology has revolutionized the way we find missing persons."
              author="Sarah Williams"
              role="Volunteer"
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Trusted Partners</h2>
            <p className="text-muted-foreground">Working together to bring families back together</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="w-32 h-12 bg-muted-foreground/20 rounded flex items-center justify-center">Partner 1</div>
            <div className="w-32 h-12 bg-muted-foreground/20 rounded flex items-center justify-center">Partner 2</div>
            <div className="w-32 h-12 bg-muted-foreground/20 rounded flex items-center justify-center">Partner 3</div>
            <div className="w-32 h-12 bg-muted-foreground/20 rounded flex items-center justify-center">Partner 4</div>
            <div className="w-32 h-12 bg-muted-foreground/20 rounded flex items-center justify-center">Partner 5</div>
          </div>
        </div>
      </section>
    </div>
  )
}

