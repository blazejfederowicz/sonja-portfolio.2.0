import { TABLES } from "@/constants";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET() {
    const {data, error} = await supabaseAdmin
        .from(TABLES.projects)
        .select('*')
        .order('id', { ascending: false });

    if(error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {status: 200})
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { id } = await body

    const { data, error } = await supabaseAdmin
      .from(TABLES.projects)
      .delete()
      .eq('id',parseInt(id));

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}