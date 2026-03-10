import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthLayoutProps } from "./AuthLayout.interface"


export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </section>
  )
}