import { TABLES } from "@/constants";
import { uploadBase64Image } from "@/lib/getBufferHelper";
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

    try{
        const filename = `events/${Date.now()}-${title.replace(/\s+/g, '_')}.jpg`;
        await uploadBase64Image(thumbnail, filename);

        const { data, error } = await supabaseAdmin
            .from(TABLES.events)
            .insert([{ 
                title, short_description, thumbnail: filename, side_text 
            }])
            .select()
            .single();

            console.log(error)

        if (error)  throw error
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error:any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
   
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