"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/admin/stat-card";
import {
  FolderKanban,
  Lightbulb,
  CalendarDays,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import useProject from "@/hooks/useProject/useProject";
import useEvents from "@/hooks/useEvents/useEvents";
import useSkill from "@/hooks/useSkill/useSkill";

export default function AdminDashboard() {
  const { projectState: { projectList } } = useProject()
  const { eventState: { eventList } } = useEvents()
  const { skillState: { skillList } } = useSkill()

  const quickActions = [
    {
      label: "Add New Project",
      href: "/admin/projects/new",
      icon: FolderKanban,
    },
    {
      label: "Add New Skill",
      href: "/admin/skills?new=true",
      icon: Lightbulb,
    },
    {
      label: "Add New Event",
      href: "/admin/events?new=true",
      icon: CalendarDays,
    },
  ];

  return (
     <div className="min-h-screen">
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back to your portfolio admin"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Projects"
            value={projectList.length}
            icon={FolderKanban}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Skills"
            value={skillList.length}
            icon={Lightbulb}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Events"
            value={eventList.length}
            icon={CalendarDays}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Portfolio Views"
            value="1,234"
            icon={TrendingUp}
            trend={{ value: 24, isPositive: true }}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-background">
                  <action.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium text-foreground">
                  {action.label}
                </span>
                <Plus className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Projects
              </h2>
              <Link
                href="/admin/projects"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {projectList.length > 0 ? (
              <ul className="space-y-3">
                {projectList.slice(0, 5).map((project) => (
                  <li
                    key={project.project_id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <FolderKanban className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {project.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.tag}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FolderKanban className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No projects yet</p>
                <Link
                  href="/admin/projects/new"
                  className="text-sm text-foreground hover:underline"
                >
                  Add your first project
                </Link>
              </div>
            )}
          </div>

          {/* Recent Events */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Events
              </h2>
              <Link
                href="/admin/events"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {eventList.length > 0 ? (
              <ul className="space-y-3">
                {eventList.slice(0, 5).map((event) => (
                  <li
                    key={event.event_id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {event.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event.side_text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No events yet</p>
                <Link
                  href="/admin/events/new"
                  className="text-sm text-foreground hover:underline"
                >
                  Add your first event
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
