"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { Project } from "@/types/common";
import { Plus, Pencil, Trash2, FolderKanban } from "lucide-react";
import Link from "next/link";
import useProject from "@/hooks/useProject/useProject";
import { fetchProjects } from "@/store/projects/thunk";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";

export default function ProjectsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { projectState: { projectList, isLoading }, deleteProject } = useProject()
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      setDeleteId(project.project_id);
      await deleteProject({id: project.project_id});
      await dispatch(fetchProjects());
    }
  };

  const columns = [
    {
      key: "thumbnail",
      header: "",
      className: "w-16",
      render: (project: Project) => (
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <FolderKanban className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      render: (project: Project) => (
        <div>
          <p className="font-medium">{project.title}</p>
          <p className="text-xs text-muted-foreground truncate max-w-xs">
            {project.short_description}
          </p>
        </div>
      ),
    },
    {
      key: "tag",
      header: "Tag",
      render: (project: Project) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {project.tag}
        </span>
      ),
    },
    {
      key: "content",
      header: "Sections",
      render: (project: Project) => (
        <span className="text-muted-foreground">
          {project.content?.length || 0}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      render: (project: Project) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/projects/${project.project_id}`);
            }}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(project);
            }}
            disabled={deleteId === project.project_id}
            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <AdminHeader
        title="Projects"
        subtitle="Manage your architecture portfolio projects"
      />

      <div className="p-6">
        <div className="bg-card border border-border rounded-xl">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {projectList.length} project{projectList.length !== 1 ? "s" : ""}
              </span>
            </div>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </Link>
          </div>

          {/* Table */}
          <DataTable
            data={projectList}
            columns={columns}
            isLoading={isLoading}
            emptyMessage="No projects yet. Add your first project to get started."
            getRowKey={(project) => project.project_id}
            onRowClick={(project) =>
              router.push(`/admin/projects/${project.project_id}`)
            }
          />
        </div>
      </div>
    </div>
  );
}
