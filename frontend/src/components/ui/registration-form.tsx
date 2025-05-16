"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import Image from "next/image"
import axios from "@/lib/axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"user" | "doctor">("user")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Password and confirmation do not match.")
      setLoading(false)
      return
    }

    try {
      const res = await axios.post("/register", {
        username,
        email,
        password,
        password_confirmation: confirmPassword,
        role
      })

      console.log("Register success:", res.data)
      // redirect to login or auto-login
      router.push("/login")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex items-center justify-center mb-5 gap-3">
        <Image src="/logo.svg" alt="Logo" width={56} height={56} />
        <p className="text-4xl font-semibold text-gradient text-center">MELI</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Fullname</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {/* Role Selection - Optional */}
        
        <div className="grid gap-3">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            className="border rounded px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value as "user" | "doctor")}
          >
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
       

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          variant="gradient"
          className="w-full text-sm"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or register with
          </span>
        </div>
        <Button variant="outline" className="w-full" type="button">
          <FcGoogle />
          Register with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  )
}
