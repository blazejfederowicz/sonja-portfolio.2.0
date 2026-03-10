import { AdminHeader } from "@/components/admin/admin-header";
import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen">
      <AdminHeader
        title="New Project"
        subtitle="Add a new project to your portfolio"
      />

      <div className="p-6 max-w-4xl">
        <ProjectForm />
      </div>
    </div>
  );
}
