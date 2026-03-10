import { NextResponse } from "next/server";
import { nanoid } from "@reduxjs/toolkit";
import supabaseAdmin from "@/lib/supabaseAdmin";



export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const project = await request.json();

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert({
      ...project,
      project_id: nanoid(),
      content: project.content ?? [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const project = await request.json();

  const { data, error } = await supabaseAdmin
    .from("projects")
    .update({
      ...project,
      thumbnail: project.thumbnail,
    })
    .eq("project_id", project.project_id)
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
    .from("projects")
    .delete()
    .eq("project_id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
