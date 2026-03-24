"use client";

import { GripVertical, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ImageUploader } from "./image-uploader";

export default function SortableItem({
  item,
  index,
  updateContentItem,
  removeContentItem,
}: {
  item: any;
  index: number;
  updateContentItem: (index: number, data: any) => void;
  removeContentItem: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "border border-border rounded-lg p-4 space-y-3 bg-background",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>

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

      {/* Layout preview */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <span>Layout preview:</span>
        <span
          className={cn(
            "px-2 py-0.5 rounded bg-muted",
            item.isReverse && "bg-primary/10 text-primary"
          )}
        >
          {item.isReverse
            ? "Image Left | Content Right"
            : "Content Left | Image Right"}
        </span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className={cn("space-y-3", item.isReverse && "order-2")}>
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
              className="w-full h-9 px-3 rounded-lg bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g., Overview"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Content</label>
            <textarea
              value={item.content || ""}
              onChange={(e) =>
                updateContentItem(index, { content: e.target.value })
              }
              className="w-full min-h-20 px-3 py-2 rounded-lg bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
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
            aspectRatio="phone"
            label="Upload Image"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-4 pt-2 border-t border-border mt-3">
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
              updateContentItem(index, {
                isReverse: e.target.checked,
              })
            }
            className="rounded"
          />
          <span className="text-sm text-muted-foreground">
            Reverse layout
          </span>
        </label>
      </div>
    </div>
  );
}