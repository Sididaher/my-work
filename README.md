# Student Management System

A modern, professional student management system built with Next.js and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

## Features

- **Modern UI**: Professional design with gradients, animations, and responsive layout
- **Student Management**: Add, edit, delete, and view students
- **Real-time Updates**: Live data synchronization with Supabase
- **Admin Dashboard**: Statistics, gender distribution, and recent students view
- **Form Validation**: Client-side validation for all inputs
- **Toast Notifications**: User-friendly feedback for all actions
- **Confirmation Dialogs**: SweetAlert2 for delete confirmations

## Tech Stack

- **Framework**: Next.js 16.0.5 with App Router
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Database**: Supabase (PostgreSQL)
- **Styling**: Bootstrap 5.3.8 + Custom CSS
- **Notifications**: React Hot Toast
- **Alerts**: SweetAlert2

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sididaher/my-work.git
cd my-work
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Your `.env` file is already configured with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://lfcdjhzplrkshzqyphcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **IMPORTANT**: Set up Supabase database (Required!)

You MUST complete this step or the app won't work. Choose one option:

#### Option A: Quick Fix (2 minutes - For Development)
See [QUICK-FIX.md](QUICK-FIX.md) for the fastest solution.

#### Option B: Proper Setup (5 minutes - Recommended)
See [SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md) for detailed instructions.

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
project-1/
├── app/
│   ├── admin/              # Admin dashboard page
│   │   └── page.tsx
│   ├── components/         # React components
│   │   └── Navbar.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main student management page
├── lib/
│   ├── database.types.ts   # TypeScript types for Supabase
│   └── supabase.ts         # Supabase client configuration
├── public/                 # Static assets
├── .env                    # Environment variables
├── QUICK-FIX.md           # Quick setup guide
├── SETUP-INSTRUCTIONS.md  # Detailed setup guide
├── supabase-setup.sql     # Database setup script
└── README.md              # This file
```

## Database Schema

The `students` table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key (auto-increment) |
| name | TEXT | Student's full name (required) |
| email | TEXT | Student's email address (required) |
| phone_number | TEXT | Student's phone number (optional) |
| gender | TEXT | Student's gender (male/female) |
| created_at | TIMESTAMP | Record creation timestamp |

## Pages

### Main Page (`/`)
- Add new students
- View all students in a table
- Edit existing students
- Delete students with confirmation
- Display total student count

### Admin Dashboard (`/admin`)
- Total students count
- Male students count
- Female students count
- Recent additions (last 7 days)
- Gender distribution with visual progress bars
- Recent students table with detailed view

## Troubleshooting

### Error: "Error fetching students: {}"

This means Supabase Row Level Security (RLS) is blocking access. See [QUICK-FIX.md](QUICK-FIX.md).

### Error: "Database access denied"

Run the SQL setup script from [supabase-setup.sql](supabase-setup.sql) in your Supabase SQL Editor.

### Error: "Failed to connect to database"

Check that your `.env` file has the correct Supabase credentials.

## Development

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Type Check
```bash
npm run type-check
```

## Security Notes

⚠️ **Current Configuration**: The database policies allow public access for development purposes.

For production deployment, you should:
1. Implement authentication (Supabase Auth)
2. Update RLS policies to restrict access based on user roles
3. Add server-side validation
4. Enable HTTPS only
5. Set up proper CORS policies

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## License

This project is open source and available for educational purposes.

## Support

If you encounter any issues:
1. Check [QUICK-FIX.md](QUICK-FIX.md) for common solutions
2. Review [SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md) for detailed setup
3. Check browser console (F12) for detailed error messages
4. Verify Supabase dashboard for table and policy configuration

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Icons by [Heroicons](https://heroicons.com/)
- Styled with [Bootstrap](https://getbootstrap.com/)
