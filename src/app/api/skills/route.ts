import { NextResponse } from "next/server";
import { nanoid } from "@reduxjs/toolkit";
import supabaseAdmin from "@/lib/supabaseAdmin";


export async function GET() {
  const { data } = await supabaseAdmin
    .from("skills")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const skill = await request.json();

  const { data } = await supabaseAdmin
    .from("skills")
    .insert({
      ...skill,
      skill_id: nanoid(),
    })
    .select()
    .single();

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await supabaseAdmin.from("skills").delete().eq("skill_id", id);

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const skill = await request.json();

  const { data, error } = await supabaseAdmin
    .from("skills")
    .update({
      ...skill,
    })
    .eq("skill_id", skill.skill_id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
