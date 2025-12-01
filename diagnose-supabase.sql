-- Diagnostic script to check Supabase configuration
-- Run this in your Supabase SQL Editor

-- 1. Check if the students table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'students'
) AS table_exists;

-- 2. Check the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'students'
ORDER BY ordinal_position;

-- 3. Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'students';

-- 4. List all policies on the students table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'students';

-- 5. Count students in the table
SELECT COUNT(*) as student_count FROM students;

-- 6. Try to select all students
SELECT * FROM students LIMIT 5;
