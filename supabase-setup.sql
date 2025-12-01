-- Student Management System - Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create students table if it doesn't exist
CREATE TABLE IF NOT EXISTS students (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  gender TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON students;
DROP POLICY IF EXISTS "Enable insert for all users" ON students;
DROP POLICY IF EXISTS "Enable update for all users" ON students;
DROP POLICY IF EXISTS "Enable delete for all users" ON students;

-- Create policies for public access (for development)
-- Allow anyone to read students
CREATE POLICY "Enable read access for all users"
ON students FOR SELECT
USING (true);

-- Allow anyone to insert students
CREATE POLICY "Enable insert for all users"
ON students FOR INSERT
WITH CHECK (true);

-- Allow anyone to update students
CREATE POLICY "Enable update for all users"
ON students FOR UPDATE
USING (true);

-- Allow anyone to delete students
CREATE POLICY "Enable delete for all users"
ON students FOR DELETE
USING (true);

-- Optional: Add some sample data
-- Uncomment the lines below if you want to add sample students
/*
INSERT INTO students (name, email, phone_number, gender) VALUES
  ('John Doe', 'john@example.com', '+1 (555) 123-4567', 'male'),
  ('Jane Smith', 'jane@example.com', '+1 (555) 234-5678', 'female'),
  ('Bob Johnson', 'bob@example.com', '+1 (555) 345-6789', 'male')
ON CONFLICT DO NOTHING;
*/
