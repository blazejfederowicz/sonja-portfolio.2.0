"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { ProjectForm } from "@/components/admin/project-form";
import { useAppDispatch } from "@/lib/hooks";
import { fetchProjects } from "@/store/projects/thunk";
import { Loader2 } from "lucide-react";
import useProject from "@/hooks/useProject/useProject";

export default function EditProjectPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {projectState: { projectList, isLoading } } = useProject()

  useEffect(() => {
    if (projectList.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projectList.length]);

  const project = projectList.find((p) => p.project_id === params.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminHeader
        title={project?.title || "Edit Project"}
        subtitle="Update your project details"
      />

      <div className="p-6 max-w-4xl">
        {project ? (
          <ProjectForm initialData={project} isEditing />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Project not found
          </div>
        )}
      </div>
    </div>
  );
}
