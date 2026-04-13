# Admin User Setup Instructions

## Admin Accounts

Two admin accounts have been configured for Origlena Labs:

1. **Primary Admin**: jarjishalam0299@gmail.com
   - Password: sabana299@
   
2. **Secondary Admin**: mahabudparvej612@gmail.com
   - Password: MPJS277331

## Setup Process

### Step 1: Sign Up
Both admin users need to sign up through the normal registration process at `/auth/sign-up`

1. Go to https://origlenalabs.vercel.app/auth/sign-up
2. Fill in the registration form with:
   - Name
   - Email (use the admin emails above)
   - Password (use the passwords above)
   - Class
   - School
3. Submit the form
4. Check email for verification link
5. Click the verification link

### Step 2: Grant Admin Privileges
After both users have signed up and verified their emails, run the SQL scripts:

1. Run `scripts/002_add_admin_column.sql` (if not already run)
2. Run `scripts/003_create_admin_users.sql`

These scripts will:
- Add an `is_admin` column to the profiles table
- Grant admin privileges to the specified email addresses
- Create a helper function to check admin status

### Step 3: Verify Admin Access
Log in with either admin account and verify that admin features are accessible.

## Admin Features

Admin users will have access to:
- User management dashboard (future feature)
- Analytics and usage statistics (future feature)
- Content management (future feature)
- System settings (future feature)

## Security Notes

- Admin passwords should be changed after first login
- Keep admin credentials secure and never share them
- Admin privileges are tied to email addresses
- RLS policies protect the profiles table

## Environment Variables Required

Make sure these environment variables are set in Vercel:

- `GEMINI_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY` - For Origlena AI
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for admin operations)
