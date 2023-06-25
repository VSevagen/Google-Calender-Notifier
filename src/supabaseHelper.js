import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://rapdmmwlfnwjqxlwvobv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcGRtbXdsZm53anF4bHd2b2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2Nzc5NTEsImV4cCI6MjAwMzI1Mzk1MX0.j2ieg4G1S3pLvwJe4MlBgQOJu2VgIIfLenbzgr2i0aE')

export const getPhoneNumbers = async () => {
  let { data, error } = await supabase
    .from('PhoneNumbers')
    .select('*')
  return ({data, error});
}

export const addPhoneNumber = async (name, number) => {
  const { data, error } = await supabase
  .from('PhoneNumbers')
  .insert([
    { name: name, number: number },
  ])
}

export const removePhoneNumber = async (id) => {
  const { data, error } = await supabase
  .from('PhoneNumbers')
  .delete()
  .eq('id', id)
}