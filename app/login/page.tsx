"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-serif font-bold tracking-wider">SARTHAK CLOTHINGS</h1>
          </Link>
          <h2 className="text-2xl font-serif font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-muted-foreground">
            {isLogin
              ? 'Sign in to access your account and orders'
              : 'Join us to enjoy exclusive benefits and offers'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-secondary p-8">
          <form className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">First Name</label>
                  <Input
                    type="text"
                    placeholder="John"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    className="bg-background border-border"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium block mb-2">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-background border-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="bg-background border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-border" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-sm uppercase tracking-wider"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-secondary px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-border">
              Google
            </Button>
            <Button variant="outline" className="border-border">
              Apple
            </Button>
          </div>
        </div>

        {/* Toggle */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-foreground font-medium hover:text-accent"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
