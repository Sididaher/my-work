-- Student Management System - Database Setup Script
-- Run this in your Supabase SQL Editor

-- STEP 1: Create students table if it doesn't exist
CREATE TABLE IF NOT EXISTS students (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  gender TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 2: Drop ALL existing policies first (important!)
DROP POLICY IF EXISTS "Enable read access for all users" ON students;
DROP POLICY IF EXISTS "Enable insert for all users" ON students;
DROP POLICY IF EXISTS "Enable update for all users" ON students;
DROP POLICY IF EXISTS "Enable delete for all users" ON students;
DROP POLICY IF EXISTS "Allow all operations" ON students;

-- STEP 3: Disable RLS temporarily
ALTER TABLE students DISABLE ROW LEVEL SECURITY;

-- STEP 4: Re-enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- STEP 5: Create a single permissive policy for all operations
CREATE POLICY "Allow all operations"
ON students
FOR ALL
TO public, anon, authenticated
USING (true)
WITH CHECK (true);

-- STEP 6: Grant permissions to anon role (the role used by your app)
GRANT ALL ON students TO anon;
GRANT ALL ON students TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE students_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE students_id_seq TO authenticated;

-- Optional: Add some sample data
-- Uncomment the lines below if you want to add sample students
/*
INSERT INTO students (name, email, phone_number, gender) VALUES
  ('John Doe', 'john@example.com', '+1 (555) 123-4567', 'male'),
  ('Jane Smith', 'jane@example.com', '+1 (555) 234-5678', 'female'),
  ('Bob Johnson', 'bob@example.com', '+1 (555) 345-6789', 'male')
ON CONFLICT DO NOTHING;
*/
