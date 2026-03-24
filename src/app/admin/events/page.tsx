"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { useAppDispatch } from "@/lib/hooks";
import {
  fetchEvents,
} from "@/store/events/thunk";
import { Event } from "@/types/common";
import {
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  X,
  Save,
  Loader2,
} from "lucide-react";
import { ImageUploader } from "@/components/admin/image-uploader";
import useEvents from "@/hooks/useEvents/useEvents";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function EventsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { eventState: { eventList, isLoading }, dispatchEvent, deleteEvent, updateCurrentEvent } = useEvents()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    short_description: "",
    side_text: "",
    thumbnail: "",
  });

  useEffect(() => {
      if (searchParams.get("new") === "true") {
        openModal();
        // Clear the URL param
        router.replace("/admin/events", { scroll: false });
      }
    }, [searchParams, router]);

  const openModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        short_description: event.short_description,
        side_text: event.side_text,
        thumbnail: event.thumbnail,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        short_description: "",
        side_text: "",
        thumbnail: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      short_description: "",
      side_text: "",
      thumbnail: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      event_id: formData.event_id || formData.title?.toLowerCase().replace(/\s+/g, "-") || "",
      title: formData.title || "",
      short_description: formData.short_description || "",
      side_text: formData.side_text || "",
      thumbnail: formData.thumbnail || "",
      created_at: formData.created_at || new Date().toISOString(),
    };
    if (editingEvent) {
      await updateCurrentEvent({ ...event, event_id: editingEvent.event_id } as Event);
    } else {
      await dispatchEvent(event as Event);
    }
    await dispatch(fetchEvents());
    closeModal();
  };

  const handleDelete = async (event: Event) => {
    if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
      await deleteEvent({id: event.event_id});
      await dispatch(fetchEvents());
    }
  };

  const columns = [
    {
      key: "thumbnail",
      header: "",
      className: "w-16",
      render: (event: Event) => (
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {event.thumbnail ? (
            <Image
              src={event.thumbnail}
              alt={event.title}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      render: (event: Event) => (
        <div>
          <p className="font-medium">{event.title}</p>
          <p className="text-xs text-muted-foreground">{event.side_text}</p>
        </div>
      ),
    },
    {
      key: "short_description",
      header: "Description",
      render: (event: Event) => (
        <p className="text-muted-foreground truncate max-w-md">
          {event.short_description}
        </p>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-24",
      render: (event: Event) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(event);
            }}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(event);
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
        title="Events"
        subtitle="Manage your architecture events and exhibitions"
      />

      <div className="p-6">
        <div className="bg-card border border-border rounded-xl">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {eventList.length} event{eventList.length !== 1 ? "s" : ""}
              </span>
            </div>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:block">Add Event</span>
            </button>
          </div>

          {/* Table */}
          <DataTable
            data={eventList}
            columns={columns}
            isLoading={isLoading}
            emptyMessage="No events yet. Add your first event to get started."
            getRowKey={(event) => event.event_id}
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
                {editingEvent ? "Edit Event" : "Add Event"}
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
                  placeholder="e.g., Design Exhibition 2024"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Side Text (Date/Location)
                </label>
                <input
                  type="text"
                  value={formData.side_text}
                  onChange={(e) =>
                    setFormData({ ...formData, side_text: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., March 2024, New York"
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
                  placeholder="Brief description of the event..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Thumbnail
                </label>
                <ImageUploader
                  value={formData.thumbnail}
                  onChange={(url) =>
                    setFormData({ ...formData, thumbnail: url })
                  }
                  aspectRatio="video"
                  label="Upload Thumbnail"
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
                  {editingEvent ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
