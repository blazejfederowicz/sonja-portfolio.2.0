import { TABLES } from "@/constants";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET() {
    const {data, error} = await supabaseAdmin
        .from(TABLES.events)
        .select('*')
        .order('created_at', { ascending: false });

    if(error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    const dataWithUrls = data?.map((row) => {
        if (row.thumbnail) {
            const { data: urlData } = supabaseAdmin.storage
                .from("images")
                .getPublicUrl(row.thumbnail);
            return { ...row,  thumbnailUrl: urlData.publicUrl,  };
        }
        return row;
    });

    return new Response(JSON.stringify(dataWithUrls), {status: 200})
}

export async function POST(req: Request) {
    const body = await req.json();
    const { title, short_description, thumbnail, side_text } = body;
    const matches = thumbnail.match(/^data:(.+);base64,(.*)$/);
    const contentType = matches?.[1] || "application/octet-stream"; // fallback

    const filename = `events/${Date.now()}-${title.replace(/\s+/g, '_')}.jpg`;
    const base64 = thumbnail.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    const { error: storageError } = await supabaseAdmin.storage
        .from("images")
        .upload(filename, buffer, {
            contentType
        });

    if (storageError) return new Response(JSON.stringify({ error: storageError.message }), { status: 500 });

    const { data, error } = await supabaseAdmin
        .from(TABLES.events)
        .insert([{ 
            title, short_description, thumbnail: filename, side_text 
        }])
        .select()
        .single();

        console.log(error)

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { id, path } = body;

    const { error:storageError } = await supabaseAdmin.storage
        .from('images')
        .remove([path])

    if (storageError) {
        return new Response(JSON.stringify({ error: storageError.message }), { status: 500 });
    }

    const { data, error } = await supabaseAdmin
        .from(TABLES.events)
        .delete()
        .eq('id',parseInt(id));

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }


    return new Response(JSON.stringify(data), { status: 200 });
}