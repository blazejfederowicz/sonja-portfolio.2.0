import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET() {
  const { error } = await supabaseAdmin
    .from("skills")
    .select("skill_id")
    .limit(1);

  if (error) {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }

  return NextResponse.json({ status: "ok" });
}