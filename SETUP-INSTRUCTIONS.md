# Student Management System - Setup Instructions

## Issue: "Error fetching students: {}"

This error occurs when the Supabase database table doesn't have proper Row Level Security (RLS) policies configured.

## Solution

Follow these steps to fix the issue:

### Step 1: Go to Supabase Dashboard

1. Open your browser and go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: `lfcdjhzplrkshzqyphcg`

### Step 2: Run the Setup SQL

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the entire contents of the `supabase-setup.sql` file
4. Paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify the Table

1. Go to **Table Editor** in the left sidebar
2. You should see the `students` table
3. Click on it to verify the columns: `id`, `name`, `email`, `phone_number`, `gender`, `created_at`

### Step 4: Restart Your Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it:
npm run dev
```

### Step 5: Test the Application

1. Open http://localhost:3000 in your browser
2. Try adding a new student
3. The error should now be resolved!

## What the SQL Script Does

The script:
- Creates the `students` table if it doesn't exist
- Enables Row Level Security (RLS)
- Creates policies that allow:
  - SELECT (read) access for everyone
  - INSERT (create) access for everyone
  - UPDATE (edit) access for everyone
  - DELETE (remove) access for everyone

**Note:** These policies allow public access for development. For production, you should implement proper authentication and more restrictive policies.

## Alternative: Disable RLS (Quick Fix for Development)

If you want a quick fix for development only:

1. Go to **Table Editor** > **students** table
2. Click on **Settings** (gear icon)
3. Toggle **Enable Row Level Security** to OFF
4. Click **Save**

⚠️ **Warning:** This is NOT recommended for production as it allows anyone to access your data!

## Still Having Issues?

If you're still experiencing errors, check the browser console (F12) for detailed error messages. The app now includes comprehensive logging that will show:

- Connection status
- Detailed error messages
- Data fetch results

## Environment Variables

Your `.env` file should contain:

```env
NEXT_PUBLIC_SUPABASE_URL=https://lfcdjhzplrkshzqyphcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmY2RqaHpwbHJrc2h6cXlwaGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDU1MDAsImV4cCI6MjA3OTgyMTUwMH0.S24bsCe_yvYZHj10MObxmNMNWif_ayNKWaBCArdg3wI
```

✅ These are already configured correctly in your project!
