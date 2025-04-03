import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Missing Person Finder</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Help reunite families by reporting missing persons or sharing information about found individuals.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/missing">
          <Button size="lg">View Missing Persons</Button>
        </Link>
        <Link href="/found">
          <Button size="lg" variant="outline">
            View Found Persons
          </Button>
        </Link>
        <Link href="/report/missing">
          <Button size="lg" variant="secondary">
            Report Missing Person
          </Button>
        </Link>
        <Link href="/report/found">
          <Button size="lg" variant="secondary">
            Report Found Person
          </Button>
        </Link>
      </div>
    </div>
  )
}

