import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const event = await request.json();

  const { data, error } = await supabaseAdmin
    .from("events")
    .insert({
      ...event,
      event_id: nanoid(),
      thumbnail: event.thumbnail,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const event = await request.json();

  const { data, error } = await supabaseAdmin
    .from("events")
    .update({
      ...event,
      thumbnail: event.thumbnail,
    })
    .eq("event_id", event.event_id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const { error } = await supabaseAdmin
    .from("events")
    .delete()
    .eq("event_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}