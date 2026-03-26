import { createClient } from "@supabase/supabase-js"

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbm9ybmhheGZjZnRsaXNpYWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNzkyNTksImV4cCI6MjA4OTk1NTI1OX0.kzuJFAZKTLvQ6eUyzCDVkorVwrwDmG0VXlVZYbvXHvE`;

const url = "https://tpnornhaxfcftlisiaem.supabase.co";

export default function uploadMediaToSupabase(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("File not added.")
        }
        let fileName = file.name
        const extention = fileName.split('.')[fileName.split('.').length - 1]

        const supabase = createClient(url, key)

        const timestamp = new Date().getTime()
        fileName = timestamp + fileName +"." + extention

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        }).then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch((err)=>{
            reject(err.message)
        })
    });
}


