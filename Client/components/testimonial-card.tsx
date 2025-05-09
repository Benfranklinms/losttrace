import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image?: string
}

export default function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/40 mb-4" />
        <p className="text-lg mb-6">{quote}</p>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {image ? (
              <Image src={image || "/placeholder.svg"} alt={author} width={40} height={40} className="object-cover" />
            ) : (
              <span className="text-lg font-medium">{author.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

