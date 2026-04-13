-- Add is_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Update specific users to be admins
UPDATE profiles SET is_admin = TRUE WHERE email = 'jarjishalam0299@gmail.com';
UPDATE profiles SET is_admin = TRUE WHERE email = 'mahabudparvej612@gmail.com';
