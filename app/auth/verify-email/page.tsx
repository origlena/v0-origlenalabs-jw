import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-primary/20 shadow-2xl text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription className="text-base mt-2">
              We've sent a verification link to your email address
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Verification Required</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the link in your email to verify your account and start exploring Origlena Labs.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Didn't receive the email? Check your spam folder or</p>
            <Link href="/auth/sign-up" className="text-primary hover:underline font-medium">
              try signing up again
            </Link>
          </div>

          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
