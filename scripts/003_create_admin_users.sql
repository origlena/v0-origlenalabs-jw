-- Create admin users with hashed passwords
-- Note: These users need to sign up through the app first, then this script will grant admin privileges

-- First, let's add admin emails to a temporary table for reference
-- The actual user creation happens through Supabase Auth when they sign up

-- Grant admin privileges to specific users after they sign up
-- Run this after the users have registered through the signup form

DO $$
BEGIN
  -- Check if users exist and grant admin privileges
  UPDATE profiles 
  SET is_admin = TRUE 
  WHERE email IN ('jarjishalam0299@gmail.com', 'mahabudparvej612@gmail.com');
  
  -- Log the result
  RAISE NOTICE 'Admin privileges granted to specified email addresses';
END $$;

-- Create a function to automatically check admin status
CREATE OR REPLACE FUNCTION check_admin_status(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE email = user_email AND is_admin = TRUE
  );
END;
$$;

COMMENT ON FUNCTION check_admin_status IS 'Check if a user is an admin based on their email';
