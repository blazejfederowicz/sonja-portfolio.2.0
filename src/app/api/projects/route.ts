import { TABLES } from "@/constants";
import { uploadBase64Image } from "@/lib/getBufferHelper";
import supabaseAdmin from "@/lib/supabaseAdmin";
import { ContentItem, ProjectProp } from "@/types/common";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from(TABLES.projects)
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const dataWithUrls = await Promise.all(
    (data || []).map(async (row) => {
      const updatedRow: ProjectProp = { ...row };

      if (row.thumbnail) {
        const { data: urlData } = supabaseAdmin.storage
          .from("images")
          .getPublicUrl(row.thumbnail);
        updatedRow.thumbnailUrl = urlData.publicUrl;
      }

      if (row.content && Array.isArray(row.content)) {
        const updatedContent = await Promise.all(
          row.content.map(async (item: any) => {
            if (item.image) {
              const { data: urlData } = supabaseAdmin.storage
                .from("images")
                .getPublicUrl(item.image);
              return { ...item, image: urlData.publicUrl };
            }
            return item;
          })
        );
        updatedRow.content = updatedContent;
      }

      return updatedRow;
    })
  );

  return new Response(JSON.stringify(dataWithUrls), { status: 200 });
}


export async function POST(req: Request) {
  const body = await req.json();
  const {thumbnail, title, project_id, content, ...rest} = body

  try {
    const thumbnailPath = `projects/${project_id}/${Date.now()}-${title.replace(/\s+/g, '_')}.jpg`;
    await uploadBase64Image(thumbnail, thumbnailPath)

    const updatedContent = await Promise.all(
      content.map( async(item:ContentItem)=>{
        if(item.image && item.image?.startsWith('data:')){
          const imagePath = `projects/${project_id}/content-${item.id}-${Date.now()}-${title.replace(/\s+/g, '_')}.jpg`;
          item.image = await uploadBase64Image(item.image, imagePath)
        }
        return item
      })
    )
    
    const { data, error } = await supabaseAdmin
        .from(TABLES.projects)
        .insert([{title, project_id, thumbnail: thumbnailPath, content:updatedContent, ...rest}])
        .select()
        .single();

        console.log(error)

    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error:any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try{
    const body = await req.json();
    const { id, path } =  body

    const {data: files, error: listError } = await supabaseAdmin.storage
          .from('images')
          .list(`projects/${path}`)

    if(listError) throw listError;
    if(!files || files.length ===0) throw new Error('No files found');
    
    const filePaths = files.map(file => `projects/${path}/${file.name}`)

    const { error:storageError } = await supabaseAdmin.storage
          .from('images')
          .remove(filePaths)

      if (storageError) throw storageError;

    const { data, error } = await supabaseAdmin
      .from(TABLES.projects)
      .delete()
      .eq('id',parseInt(id));

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error:any){
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}