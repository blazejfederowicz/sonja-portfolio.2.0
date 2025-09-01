import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET() {
    const {data, error} = await supabaseAdmin
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

    if(error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {status: 200})
}