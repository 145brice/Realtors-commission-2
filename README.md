# Agent Finder - Real Estate Agent Search Platform

A modern, production-ready web application that mimics Zillow's layout for finding and comparing real estate agents by commission rate. Built with Next.js 15, TypeScript, and Supabase.

![Agent Finder](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- **Zillow-like Layout**: Map on the right, agent list on the left, filters on top
- **Commission-Based Sorting**: Find agents with the lowest commission rates (default: low to high)
- **Interactive Map**: Leaflet-powered map with agent markers and clustering
- **Advanced Filters**: Commission range, rating, experience, specialties, languages
- **Agent Profiles**: Detailed pages with bio, reviews, recent sales, and commission breakdown
- **Mobile Responsive**: Fully optimized for all screen sizes
- **Real-time Search**: Location autocomplete with instant results
- **Performance Optimized**: TanStack Query for efficient data fetching and caching
- **Property Listings**: Browse active MLS listings via SimplyRETS API with search by ZIP/city, price, and bedrooms
- **Authentication**: Supabase Auth sign-in/sign-up modal

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Maps**: Leaflet with React Leaflet
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Listings API**: SimplyRETS (with mock data fallback)

## Installation

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- SimplyRETS account (demo credentials included)

### Step 1: Clone and Install

```bash
cd "Realtor app"
npm install
```

### Step 2: Setup Environment

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# SimplyRETS (demo credentials work out of the box)
SIMPLYRETS_API_KEY=simplyrets
SIMPLYRETS_API_SECRET=simplyrets
```

### Step 3: Setup Database

1. Open Supabase SQL Editor
2. Run the schema creation script from `database/schema.sql`
3. Run the seed data script from `database/seed.sql` to add 50 sample agents

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── agent/[id]/          # Agent detail pages
│   ├── listings/            # Property listings page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── providers.tsx        # React Query provider
│   └── globals.css          # Global styles
├── components/
│   ├── HomePage.tsx         # Main search interface
│   ├── SearchBar.tsx        # Location search
│   ├── Filters.tsx          # Advanced filters
│   ├── AgentList.tsx        # Agent list view
│   ├── AgentCard.tsx        # Individual agent card
│   ├── MapView.tsx          # Interactive map
│   ├── AgentDetailPage.tsx  # Agent profile page
│   ├── AuthModal.tsx        # Sign-in / sign-up modal
│   ├── ListingsPage.tsx     # Property listings page
│   ├── ListingsSearchBar.tsx# Search by ZIP, city, price, beds
│   ├── ListingsGrid.tsx     # Responsive listings grid
│   └── ListingCard.tsx      # Individual listing card
├── types/
│   ├── index.ts             # Agent TypeScript interfaces
│   └── listings.ts          # Listing TypeScript interfaces
├── store/
│   └── appStore.ts          # Zustand global state
└── lib/
    ├── supabase.ts          # Supabase client (null-safe)
    ├── simplyRets.ts        # SimplyRETS API client
    └── utils.ts             # Utility functions

database/
├── schema.sql               # Database schema
└── seed.sql                 # 50 sample agents
```

## Key Components

### Property Listings (`/listings`)
Browse active MLS listings powered by SimplyRETS:
- Search by ZIP code or city name
- Filter by price range and minimum bedrooms
- Sold listings hidden by default
- Mock data fallback when API is unavailable
- Responsive 1/2/3 column grid with skeleton loading

### HomePage
Main interface with search, filters, agent list, and map view.

### AgentCard
Displays agent info including:
- Photo and name
- Commission rate (prominent badge)
- Years of experience
- Total sales
- Average days on market
- Star rating and review count
- Specialties
- Contact button

### MapView
Interactive Leaflet map showing:
- Agent markers with commission rates
- Clickable popups with agent info
- Automatic bounds adjustment
- Selected agent highlighting

### Filters
Advanced filtering by:
- Commission range (0-3%)
- Minimum rating
- Minimum experience
- Specialties (Residential, Luxury, Commercial, etc.)
- Languages
- Sort options (commission, rating, experience, sales)

### AuthModal
Supabase-powered authentication with:
- Sign-in and sign-up tabs
- Email/password auth
- Graceful handling when Supabase is not configured

## Configuration

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SIMPLYRETS_API_KEY`: SimplyRETS API key (default: `simplyrets` for demo)
- `SIMPLYRETS_API_SECRET`: SimplyRETS API secret (default: `simplyrets` for demo)

### Tailwind Colors
Primary color is defined in `tailwind.config.ts`. Modify the `primary` color palette to match your brand.

## Database Schema

### Tables
- **agents**: Core agent information and statistics
- **reviews**: Client reviews and ratings
- **recent_sales**: Property sales data

See `database/schema.sql` for complete schema.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app works on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Security

- Row Level Security (RLS) enabled on Supabase tables
- Environment variables for sensitive credentials
- SimplyRETS requests should be proxied server-side in production to avoid exposing API keys
- Input validation and sanitization

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

Built with Next.js and Supabase
