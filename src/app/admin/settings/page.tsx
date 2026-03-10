"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Save, Loader2, User, Globe, Palette } from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Settings"
        subtitle="Manage your portfolio settings and profile"
      />

      <div className="p-6 max-w-2xl space-y-6">
        {/* Profile Settings */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-muted">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Profile Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Website
              </label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) =>
                  setProfile({ ...profile, website: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full min-h-24 px-3 py-2 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </form>

        {/* Site Settings */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-muted">
              <Globe className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Site Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-foreground">Portfolio URL</p>
                <p className="text-sm text-muted-foreground">
                  Configure your public portfolio URL
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-foreground">SEO Settings</p>
                <p className="text-sm text-muted-foreground">
                  Optimize your portfolio for search engines
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-muted">
              <Palette className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Theme Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-foreground">Color Theme</p>
                <p className="text-sm text-muted-foreground">
                  Customize your portfolio colors
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-foreground">Typography</p>
                <p className="text-sm text-muted-foreground">
                  Choose fonts for your portfolio
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
