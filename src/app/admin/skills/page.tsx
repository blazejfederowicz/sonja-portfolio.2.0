"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { useAppDispatch } from "@/lib/hooks";
import { fetchSkills} from "@/store/skills/thunk";
import { Skill } from "@/types/common";
import { Plus, Pencil, Trash2, Lightbulb, X, Save, Loader2 } from "lucide-react";
import useSkill from "@/hooks/useSkill/useSkill";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SkillsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { skillState: {skillList, isLoading}, deleteSkill, dispatchSkill, updateCurrentSkill } = useSkill()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    title: "",
    short_description: "",
    tag: "",
  });

  useEffect(() => {
      if (searchParams.get("new") === "true") {
        openModal();
        // Clear the URL param
        router.replace("/admin/skills", { scroll: false });
      }
    }, [searchParams, router]);

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData(skill);
    } else {
      setEditingSkill(null);
      setFormData({ title: "", short_description: "", tag: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
    setFormData({ title: "", short_description: "", tag: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skill: Skill = {
      skill_id: formData.skill_id || 
      formData.title?.toLowerCase().replace(/\s+/g, "-") ||
        "",
      title: formData.title || "",
      short_description: formData.short_description || "",
      tag: formData.tag,
      created_at: formData.created_at || new Date().toISOString(),
    };

    if(editingSkill) {
      await updateCurrentSkill({ ...skill, skill_id: editingSkill.skill_id } as Skill);
    } else {
      await dispatchSkill(skill);
    }

    await dispatch(fetchSkills());

    closeModal();
  };

  const handleDelete = async (skill: Skill) => {
    if (confirm(`Are you sure you want to delete "${skill.title}"?`)) {
      if (skill.skill_id) {
        await deleteSkill(skill.skill_id);
        await dispatch(fetchSkills());
      }
    }
  };

  const columns = [
    {
      key: "icon",
      header: "",
      className: "w-12",
      render: () => (
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-muted-foreground" />
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      render: (skill: Skill) => (
        <div>
          <p className="font-medium">{skill.title}</p>
        </div>
      ),
    },
    {
      key: "short_description",
      header: "Description",
      render: (skill: Skill) => (
        <p className="text-muted-foreground truncate max-w-md">
          {skill.short_description}
        </p>
      ),
    },
    {
      key: "tag",
      header: "Tag",
      render: (skill: Skill) =>
        skill.tag ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            {skill.tag}
          </span>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      render: (skill: Skill) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(skill);
            }}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(skill);
            }}
            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
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
        title="Skills"
        subtitle="Manage your architecture skills and expertise"
      />

      <div className="p-6">
        <div className="bg-card border border-border rounded-xl">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {skillList.length} skill{skillList.length !== 1 ? "s" : ""}
              </span>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

          {/* Table */}
          <DataTable
            data={skillList}
            columns={columns}
            isLoading={isLoading}
            emptyMessage="No skills yet. Add your first skill to get started."
            getRowKey={(skill) => skill.id || skill.title}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {editingSkill ? "Edit Skill" : "Add Skill"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., 3D Modeling, AutoCAD"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      short_description: e.target.value,
                    })
                  }
                  className="w-full min-h-24 px-3 py-2 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  placeholder="Brief description of your skill..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Tag (optional)
                </label>
                <input
                  type="text"
                  value={formData.tag || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., Software, Design, Technical"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingSkill ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
