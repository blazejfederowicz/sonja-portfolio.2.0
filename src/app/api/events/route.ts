import { TABLES } from "@/constants";
import supabase from "@/lib/supabaseClient";

export async function GET() {
    const {data, error} = await supabase
        .from(TABLES.events)
        .select('*')
        .order('created_at', { ascending: false });

    if(error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {status: 200})
}

export async function POST(req: Request) {
    const body = await req.json();
    const { title, short_description, thumbnail, side_text } = body;
    const matches = thumbnail.match(/^data:(.+);base64,(.*)$/);
    const contentType = matches?.[1] || "application/octet-stream"; // fallback

    const filename = `events/${Date.now()}-${title.replace(/\s+/g, '_')}.jpg`;
    const base64 = thumbnail.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    const { error: storageError } = await supabase.storage
        .from("images")
        .upload(filename, buffer, {
            contentType
        });

    if (storageError) return new Response(JSON.stringify({ error: storageError.message }), { status: 500 });

    const { data: imageData } = supabase.storage
        .from("images")
        .getPublicUrl(filename);

    const { data, error } = await supabase
        .from(TABLES.events)
        .insert([{ 
            title, short_description, thumbnail: imageData.publicUrl, side_text 
        }])
        .select()
        .single();

        console.log(error)

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(JSON.stringify(data), { status: 200 });
}

