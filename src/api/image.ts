import supabase from "@/lib/supabase";

// export async function uploadImage(bucket: string, path: string, blob: Blob) {
//   const { data, error } = await supabase.storage
//     .from(bucket)
//     .upload(path, blob, {
//       contentType: "image/png",
//       upsert: true,
//       cacheControl: "3600",
//     });

//   console.log("upload data:", data);
//   console.log("upload error:", error);

//   if (error) throw error;
//   return data;
// }
export async function replaceImage(bucket: string, path: string, blob: Blob) {
  const { error: deleteError } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (deleteError && deleteError.statusCode !== "404") {
    console.error("delete error:", deleteError);
  }
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, blob, {
      contentType: "image/png",
      cacheControl: "3600",
    });
  if (error) throw error;

  return data;
}

export async function getImageUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
