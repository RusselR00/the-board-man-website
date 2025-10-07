"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Settings,
  Save,
  RefreshCw,
  Mail,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Download,
  Upload,
  Trash2,
  Key,
  Clock,
  Users,
} from "lucide-react"

interface SystemSettings {
  site: {
    title: string
    description: string
    email: string
    phone: string
    address: string
    timezone: string
    language: string
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    newContactAlert: boolean
    bookingReminders: boolean
    weeklyReports: boolean
  }
  security: {
    sessionTimeout: number
    maxLoginAttempts: number
    requirePasswordChange: boolean
    twoFactorAuth: boolean
    ipWhitelist: string[]
  }
  appearance: {
    theme: string
    primaryColor: string
    compactMode: boolean
    showWelcomeMessage: boolean
  }
  integrations: {
    resendApiKey: string
    googleAnalyticsId: string
    calendarSync: boolean
    webhookUrl: string
  }
}

const defaultSettings: SystemSettings = {
  site: {
    title: "THE BOARD MAN",
    description: "Professional accounting and business services",
    email: "info@theboardman.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, City, State 12345",
    timezone: "America/New_York",
    language: "en-US"
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newContactAlert: true,
    bookingReminders: true,
    weeklyReports: false
  },
  security: {
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    requirePasswordChange: false,
    twoFactorAuth: false,
    ipWhitelist: []
  },
  appearance: {
    theme: "light",
    primaryColor: "#0070f3",
    compactMode: false,
    showWelcomeMessage: true
  },
  integrations: {
    resendApiKey: "",
    googleAnalyticsId: "",
    calendarSync: false,
    webhookUrl: ""
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setIsLoading(true)
      // For now, use default settings since we don't have a settings API endpoint
      setSettings(defaultSettings)
    } catch (error) {
      console.error('Failed to load settings:', error)
      toast({
        title: "Error",
        description: "Failed to load settings. Using defaults.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      setIsSaving(true)
      // TODO: Implement settings save API
      // await fetch('/api/admin/settings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // })
      
      setHasChanges(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    } catch (error) {
      console.error('Failed to save settings:', error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'admin-settings.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string)
        setSettings(importedSettings)
        setHasChanges(true)
        toast({
          title: "Settings imported",
          description: "Settings have been imported successfully.",
        })
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Invalid settings file format.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    setHasChanges(true)
    toast({
      title: "Settings reset",
      description: "Settings have been reset to defaults.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your admin panel and business settings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={saveSettings}
            disabled={!hasChanges || isSaving}
            className="min-w-[100px]"
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            You have unsaved changes. Don't forget to save your settings.
          </p>
        </div>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Site Information
              </CardTitle>
              <CardDescription>
                Basic information about your business and website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input
                    id="site-title"
                    value={settings.site.title}
                    onChange={(e) => updateSetting('site', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-email">Contact Email</Label>
                  <Input
                    id="site-email"
                    type="email"
                    value={settings.site.email}
                    onChange={(e) => updateSetting('site', 'email', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Description</Label>
                <Textarea
                  id="site-description"
                  value={settings.site.description}
                  onChange={(e) => updateSetting('site', 'description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-phone">Phone Number</Label>
                  <Input
                    id="site-phone"
                    value={settings.site.phone}
                    onChange={(e) => updateSetting('site', 'phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-timezone">Timezone</Label>
                  <Select
                    value={settings.site.timezone}
                    onValueChange={(value) => updateSetting('site', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-address">Business Address</Label>
                <Textarea
                  id="site-address"
                  value={settings.site.address}
                  onChange={(e) => updateSetting('site', 'address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'smsNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('notifications', 'pushNotifications', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Event Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Contact Alerts</Label>
                      <p className="text-sm text-muted-foreground">When someone submits a contact form</p>
                    </div>
                    <Switch
                      checked={settings.notifications.newContactAlert}
                      onCheckedChange={(checked) => updateSetting('notifications', 'newContactAlert', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Booking Reminders</Label>
                      <p className="text-sm text-muted-foreground">Reminders for upcoming appointments</p>
                    </div>
                    <Switch
                      checked={settings.notifications.bookingReminders}
                      onCheckedChange={(checked) => updateSetting('notifications', 'bookingReminders', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Weekly summary of activity</p>
                    </div>
                    <Switch
                      checked={settings.notifications.weeklyReports}
                      onCheckedChange={(checked) => updateSetting('notifications', 'weeklyReports', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access control settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value) || 60)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value) || 5)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Password Change</Label>
                    <p className="text-sm text-muted-foreground">Force password change on first login</p>
                  </div>
                  <Switch
                    checked={settings.security.requirePasswordChange}
                    onCheckedChange={(checked) => updateSetting('security', 'requirePasswordChange', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <Input
                    id="primary-color"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                  </div>
                  <Switch
                    checked={settings.appearance.compactMode}
                    onCheckedChange={(checked) => updateSetting('appearance', 'compactMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Welcome Message</Label>
                    <p className="text-sm text-muted-foreground">Display welcome message on dashboard</p>
                  </div>
                  <Switch
                    checked={settings.appearance.showWelcomeMessage}
                    onCheckedChange={(checked) => updateSetting('appearance', 'showWelcomeMessage', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>
                Configure connections to external services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resend-api-key">Resend API Key</Label>
                <Input
                  id="resend-api-key"
                  type="password"
                  placeholder="re_..."
                  value={settings.integrations.resendApiKey}
                  onChange={(e) => updateSetting('integrations', 'resendApiKey', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Used for sending transactional emails
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-analytics-id">Google Analytics ID</Label>
                <Input
                  id="google-analytics-id"
                  placeholder="GA-XXXXXXXXX-X"
                  value={settings.integrations.googleAnalyticsId}
                  onChange={(e) => updateSetting('integrations', 'googleAnalyticsId', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://..."
                  value={settings.integrations.webhookUrl}
                  onChange={(e) => updateSetting('integrations', 'webhookUrl', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Receive notifications for important events
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Calendar Sync</Label>
                  <p className="text-sm text-muted-foreground">Sync bookings with external calendar</p>
                </div>
                <Switch
                  checked={settings.integrations.calendarSync}
                  onCheckedChange={(checked) => updateSetting('integrations', 'calendarSync', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Import/Export and Reset */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Settings Management
          </CardTitle>
          <CardDescription>
            Import, export, or reset your settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => document.getElementById('import-settings')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import Settings
            </Button>
            <input
              id="import-settings"
              type="file"
              accept=".json"
              className="hidden"
              onChange={importSettings}
            />
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Settings</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset all settings to their default values. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetSettings}>
                    Reset Settings
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}