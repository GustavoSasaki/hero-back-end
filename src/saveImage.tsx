import axios from "axios";
import { supabase } from "./supabase";

export async function saveImage(id:number, url:string){
    const buffer = await axios.get(url,  { responseType: 'arraybuffer' }).then(response => {
        return Buffer.from(response.data, 'base64');
    })

    await supabase
    .storage
    .from('hero-back-end')
    .upload(`${id}.png`, buffer,
      {contentType: 'image/png'})
}
