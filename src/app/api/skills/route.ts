import { TABLES } from "@/constants";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET() {
    const {data, error} = await supabaseAdmin
        .from(TABLES.skills)
        .select('*')

    if(error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {status: 200})
}


export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from(TABLES.skills)
    .insert([body])
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { id } = await body

    const { data, error } = await supabaseAdmin
      .from(TABLES.skills)
      .delete()
      .eq('id',parseInt(id));

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}
