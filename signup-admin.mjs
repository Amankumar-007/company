import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://vfmvmpqezuzcesukxkzt.supabase.co',
  'sb_publishable_OrlDwWgErdrtrzyAr1qc0A_BzZenLvV'
)

async function signUpAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'amanr3388@gmail.com',
    password: 'adminPassword123!',
  })
  if (error) {
    console.error('Error:', error.message)
  } else {
    console.log('Success:', data)
  }
}

signUpAdmin()
