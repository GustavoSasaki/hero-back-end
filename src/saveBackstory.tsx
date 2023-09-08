import { supabase } from "./supabase";

export async function saveBackstory(id:number, backstory:string){

    await supabase.from('heroes').update({backstory}).eq('id',id)

}