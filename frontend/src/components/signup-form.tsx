"use client"

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
import { signupUser } from "@/services/authService"
import { toast } from "sonner";


export function SignupForm({

  
  className,
  ...props

  

}: React.ComponentProps<"div">) {

  const [formData, setFormData] = useState({
      full_name: "",
      email: "",
      password: "",
    })


    const [error, setError] = useState("")
    const router = useRouter()
  
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
      await signupUser(formData.full_name, formData.email, formData.password);

      toast.success("Account created successfully", { position: "top-center", style: { background: "green", color: "white" }, duration: 2000 });
      setTimeout(() => {router.push("/login");}, 1000);  
      
    } catch (error) {
      if (error instanceof Error) {
      setError(error.message)  }
    }
    
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="full_name">Full Name</FieldLabel>
                <Input id="full_name" name="full_name" type="text" placeholder="John Doe" value={formData.full_name} onChange={handleChange} required />
              </Field>
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
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                {error && (
                  <p className="text-red-500 text-sm">
                    {error}
                  </p>
                )}
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
