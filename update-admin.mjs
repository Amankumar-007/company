import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Setup pathing
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const credsFile = path.join(__dirname, '.admin-creds.json')

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Supabase URL or Anon Key is missing from .env.local")
} else {
  const supabase = createClient(supabaseUrl, supabaseKey)

  const newEmail = process.env.ADMIN_EMAIL
  const newPassword = process.env.ADMIN_PASSWORD

  if (!newEmail || !newPassword) {
    console.error("❌ Error: ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env.local")
  } else {
    run(supabase, newEmail, newPassword)
  }
}

async function run(supabase, newEmail, newPassword) {
  console.log("=== Auto Supabase Admin Credentials Updater ===\n")

  let oldEmail = newEmail
  let oldPassword = newPassword

  // Check if we have previously saved credentials to log in with
  if (fs.existsSync(credsFile)) {
    try {
      const savedCreds = JSON.parse(fs.readFileSync(credsFile, 'utf8'))
      oldEmail = savedCreds.email || newEmail
      oldPassword = savedCreds.password || newPassword
    } catch (err) {
      console.warn("⚠️ Warning: Could not read .admin-creds.json, trying to log in with current .env.local credentials.")
    }
  } else {
    console.log("ℹ️ No previous credentials file found. Assuming this is the first run.")
  }

  if (oldEmail === newEmail && oldPassword === newPassword) {
    // We still try to login just to verify and save the initial creds if missing
    console.log("Authenticating with credentials from .env.local...")
  } else {
    console.log(`Authenticating with previous credentials for: ${oldEmail}...`)
  }

  // 1. Sign in with the old (or initial) credentials
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: oldEmail.trim(),
    password: oldPassword.trim(),
  })

  if (signInError) {
    console.error('❌ Failed to sign in. Reason:', signInError.message)
    
    // Fallback: maybe the admin account hasn't even been created yet?
    if (signInError.message.includes('Invalid login credentials')) {
      console.log('\n🔄 Attempting to create the admin account instead (in case it does not exist)...')
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: newEmail.trim(),
        password: newPassword.trim(),
      })
      if (signUpError) {
        console.error('❌ Failed to create account either:', signUpError.message)
        console.log('\n💡 Tip: If you ALREADY changed the password in .env.local but never ran this script before, you must temporarily put the OLD password back in .env.local, run the script once to save the state, and then change it to the new one.')
      } else {
        console.log('🎉 Successfully created the new admin account in Supabase!')
        fs.writeFileSync(credsFile, JSON.stringify({ email: newEmail, password: newPassword }, null, 2))
      }
    }
    return
  }

  console.log('✅ Successfully signed in!')

  // Check if an update is actually needed
  if (oldEmail === newEmail && oldPassword === newPassword) {
    console.log('✅ The credentials in .env.local match the currently active credentials. No update needed in Supabase.')
    // Save state just in case it was missing
    fs.writeFileSync(credsFile, JSON.stringify({ email: newEmail, password: newPassword }, null, 2))
    return
  }

  console.log('🔄 Detected changes in .env.local! Updating Supabase to match...')

  // 2. Update user in Supabase
  const { data, error } = await supabase.auth.updateUser({
    email: newEmail,
    password: newPassword,
  })

  if (error) {
    console.error('❌ Error updating credentials in Supabase:', error.message)
    return
  } else {
    // 3. Save the new credentials to the local tracker file
    fs.writeFileSync(credsFile, JSON.stringify({ email: newEmail, password: newPassword }, null, 2))
    
    console.log('\n🎉 Successfully updated admin credentials in Supabase automatically!')
    console.log('New Email:', newEmail)
    console.log('New Password: [Hidden for security]')
    console.log('\nImportant: If "Confirm email change" is enabled in your Supabase Auth settings, check your new inbox for a confirmation link. The password change takes effect immediately.')
  }
}
