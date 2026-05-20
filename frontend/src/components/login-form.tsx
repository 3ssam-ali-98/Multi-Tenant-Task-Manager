"use client"

import { loginUser } from "@/services/authService";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [formData, setFormData] = useState({
        email: "",
        password: "",
      })

  const [error, setError] = useState("")
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { login } = useAuth();


      function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        })
      }
  
      const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    setError("")
    setLoading(true)
    const data = await loginUser(formData.email, formData.password);

    login(data.access, data.refresh);
    router.push('/dashboard')

  } catch (error) {
    if (error instanceof Error) {
    setError(error.message)  }
  }
  finally {
    setLoading(false)
  }
};


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
              </Field>
              <Field>
                {error && (
                  <p className="text-red-500 text-sm">
                    {error}
                  </p>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
