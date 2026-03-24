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
import SortableItem from "./sortable-item";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";

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

  function handleDragEnd(event:DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setContentItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over?.id);

        const newItems = [...items];
        const [moved] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, moved);

        return newItems;
      });
    }
  }

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
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={contentItems.map(item => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {contentItems.map((item, index) => (
                <SortableItem key={item.id} item={item} index={index} updateContentItem={updateContentItem} removeContentItem={removeContentItem}/>
              ))}
            </SortableContext>
          </DndContext>
            )}
      </div>
    </form>
  );
}
