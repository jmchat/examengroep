'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction, type LoginState } from './actions'

const initialState: LoginState = {}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center">
          <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-xl bg-[#1d4ed8] px-6 py-3">
            <span className="font-[family-name:var(--font-logo)] text-xl font-light tracking-[0.25em] uppercase text-white">
              Examengroep
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI Workshops
          </p>
        </div>

        {/* Login card */}
        <Card>
          <CardHeader>
            <CardTitle>Inloggen</CardTitle>
            <CardDescription>
              Log in met je Examengroep e-mailadres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              {state.error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {state.error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mailadres</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="naam@examengroep.nl"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Wachtwoord</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Wachtwoord"
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? 'Bezig met inloggen...' : 'Inloggen'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Problemen met inloggen? Neem contact op met de trainer.
        </p>
      </div>
    </div>
  )
}
