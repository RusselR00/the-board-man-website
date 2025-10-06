"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Cookie, Settings, X } from "lucide-react"
import Link from "next/link"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const COOKIE_CONSENT_KEY = "board-man-cookie-consent"
const COOKIE_PREFERENCES_KEY = "board-man-cookie-preferences"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
    
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted))
    setPreferences(allAccepted)
    setShowBanner(false)
    
    // Initialize analytics and other services here based on preferences
    initializeServices(allAccepted)
  }

  const handleDeclineAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined")
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(onlyNecessary))
    setPreferences(onlyNecessary)
    setShowBanner(false)
    
    // Clean up any existing analytics or marketing cookies
    cleanupServices()
  }

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "customized")
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences))
    setShowBanner(false)
    setShowPreferences(false)
    
    // Initialize services based on custom preferences
    initializeServices(preferences)
  }

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    if (key === "necessary") return // Necessary cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const initializeServices = (prefs: CookiePreferences) => {
    // Initialize Google Analytics or other services based on preferences
    if (prefs.analytics) {
      // Initialize analytics
      console.log("Analytics enabled")
      // Example: gtag('consent', 'update', { analytics_storage: 'granted' })
    }
    
    if (prefs.marketing) {
      // Initialize marketing tools
      console.log("Marketing cookies enabled")
      // Example: gtag('consent', 'update', { ad_storage: 'granted' })
    }
    
    if (prefs.preferences) {
      // Initialize preference cookies
      console.log("Preference cookies enabled")
    }
  }

  const cleanupServices = () => {
    // Remove or disable analytics and marketing services
    console.log("Non-essential services disabled")
    // Example: gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' })
  }

  if (!showBanner) return null

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">We use cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  You can choose which cookies to accept below. For more information, please read our{" "}
                  <Link href="/privacy-policy" className="underline font-medium">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreferences(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeclineAll}
              >
                Decline All
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-primary" />
                  <CardTitle>Cookie Preferences</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreferences(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Choose which cookies you want to accept. You can change these preferences at any time.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Necessary Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Necessary Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Essential for the website to function properly
                    </p>
                  </div>
                  <Switch
                    checked={preferences.necessary}
                    disabled={true}
                    aria-label="Necessary cookies (always enabled)"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies are necessary for the website to function and cannot be disabled. 
                  They include session management, security, and basic functionality.
                </p>
              </div>

              <Separator />

              {/* Analytics Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked: boolean) => handlePreferenceChange("analytics", checked)}
                    aria-label="Analytics cookies"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies collect information about how you use our website, such as which pages you visit most often. 
                  This data helps us improve our website&apos;s performance and user experience.
                </p>
              </div>

              <Separator />

              {/* Marketing Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Used to deliver relevant advertisements and content
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked: boolean) => handlePreferenceChange("marketing", checked)}
                    aria-label="Marketing cookies"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies are used to make advertising messages more relevant to you and your interests. 
                  They also perform functions like preventing the same ad from appearing repeatedly.
                </p>
              </div>

              <Separator />

              {/* Preference Cookies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Preference Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Remember your preferences and personalize your experience
                    </p>
                  </div>
                  <Switch
                    checked={preferences.preferences}
                    onCheckedChange={(checked: boolean) => handlePreferenceChange("preferences", checked)}
                    aria-label="Preference cookies"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  These cookies allow the website to remember choices you make (such as language or region) 
                  and provide enhanced, more personal features.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleDeclineAll}
                className="w-full sm:w-auto"
              >
                Decline All Optional
              </Button>
              <Button
                variant="outline"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
              <Button
                onClick={handleSavePreferences}
                className="w-full sm:w-auto"
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}