import supabaseAdmin from "./supabaseAdmin";

export async function uploadBase64Image(base64String: string, path: string) {
  const matches = base64String.match(/^data:(.+);base64,(.*)$/);
  const contentType = matches?.[1] || "application/octet-stream";
  const buffer = Buffer.from(base64String.split(",")[1], "base64");

  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(path, buffer, { contentType });

  if (error) throw new Error(error.message);
  return path;
}