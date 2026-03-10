"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { fetchProjects } from "@/store/projects/thunk";
import { Project, ContentItem } from "@/types/common";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Loader2,
  Save,
} from "lucide-react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/image-uploader";
import useProject from "@/hooks/useProject/useProject";
import { cn } from "@/lib/utils";

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ initialData, isEditing }: ProjectFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projectState: { isLoading }, addProject, updateCurrentProject } = useProject()

  const [formData, setFormData] = useState<Partial<Project>>({
    project_id: initialData?.project_id || "",
    title: initialData?.title || "",
    short_description: initialData?.short_description || "",
    tag: initialData?.tag || "",
    thumbnail: initialData?.thumbnail || "",
    height: initialData?.height || 400,
    content: initialData?.content || [],
  });

  const [contentItems, setContentItems] = useState<ContentItem[]>(
    initialData?.content || []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData: Project = {
      project_id:
        formData.project_id ||
        formData.title?.toLowerCase().replace(/\s+/g, "-") ||
        "",
      title: formData.title || "",
      short_description: formData.short_description || "",
      tag: formData.tag || "",
      thumbnail: formData.thumbnail || "",
      height: formData.height || 400,
      content: contentItems,
      created_at: initialData?.created_at || new Date().toISOString(),
    };

    if (isEditing) {
      await updateCurrentProject(projectData);
    } else {
      await addProject(projectData);
    }
    await dispatch(fetchProjects());
    router.push("/admin/projects");
  };

  const addContentItem = () => {
    const newItem: ContentItem = {
      id: `content-${Date.now()}`,
      name: "",
      content: "",
      bgColor: "#ffffff",
      isReverse: false,
    };
    setContentItems([...contentItems, newItem]);
  };

  const updateContentItem = (index: number, updates: Partial<ContentItem>) => {
    const updated = [...contentItems];
    updated[index] = { ...updated[index], ...updates };
    setContentItems(updated);
  };

  const removeContentItem = (index: number) => {
    setContentItems(contentItems.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
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
          {isEditing ? "Update Project" : "Create Project"}
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., Modern Villa Design"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Project ID (slug)
            </label>
            <input
              type="text"
              value={formData.project_id}
              onChange={(e) =>
                setFormData({ ...formData, project_id: e.target.value })
              }
              className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., modern-villa-design"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-generate from title
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tag</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) =>
                setFormData({ ...formData, tag: e.target.value })
              }
              className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., Residential, Commercial, Interior"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Card Height (px)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: parseInt(e.target.value) })
              }
              className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Short Description
          </label>
          <textarea
            value={formData.short_description}
            onChange={(e) =>
              setFormData({ ...formData, short_description: e.target.value })
            }
            className="w-full min-h-24 px-3 py-2 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            placeholder="A brief description of the project..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Thumbnail
          </label>
          <ImageUploader
            value={formData.thumbnail}
            onChange={(url) => setFormData({ ...formData, thumbnail: url })}
            aspectRatio="video"
            label="Upload Thumbnail"
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Content Sections
          </h2>
          <button
            type="button"
            onClick={addContentItem}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>
        </div>

        {contentItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-lg">
            <p className="mb-2">No content sections yet</p>
            <button
              type="button"
              onClick={addContentItem}
              className="text-sm text-foreground hover:underline"
            >
              Add your first section
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {contentItems.map((item, index) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Section {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeContentItem(index)}
                    className="ml-auto p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Layout preview indicator */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span>Layout preview:</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded bg-muted",
                    item.isReverse && "bg-primary/10 text-primary"
                  )}>
                    {item.isReverse ? "Image Left | Content Right" : "Content Left | Image Right"}
                  </span>
                </div>

                <div className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-3",
                  item.isReverse && "md:[direction:rtl] [&>*]:md:[direction:ltr]"
                )}>
                  {/* Content side */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Section Name
                      </label>
                      <input
                        type="text"
                        value={item.name || ""}
                        onChange={(e) =>
                          updateContentItem(index, { name: e.target.value })
                        }
                        className="w-full h-9 px-3 rounded-lg bg-muted border-0 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g., Overview, Design Process"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Content
                      </label>
                      <textarea
                        value={item.content || ""}
                        onChange={(e) =>
                          updateContentItem(index, { content: e.target.value })
                        }
                        className="w-full min-h-20 px-3 py-2 rounded-lg bg-muted border-0 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                        placeholder="Section content..."
                      />
                    </div>
                  </div>

                  {/* Image side */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Section Image
                    </label>
                    <ImageUploader
                      value={item.image || ""}
                      onChange={(url) =>
                        updateContentItem(index, { image: url })
                      }
                      aspectRatio="video"
                      label="Upload Image"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-border mt-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">
                      Background:
                    </label>
                    <input
                      type="color"
                      value={item.bgColor || "#ffffff"}
                      onChange={(e) =>
                        updateContentItem(index, { bgColor: e.target.value })
                      }
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isReverse || false}
                      onChange={(e) =>
                        updateContentItem(index, { isReverse: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-muted-foreground">
                      Reverse layout (image on left)
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
