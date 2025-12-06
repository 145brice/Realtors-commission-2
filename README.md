# Agent Finder - Real Estate Agent Search Platform

A modern, production-ready web application that mimics Zillow's layout for finding and comparing real estate agents by commission rate. Built with Next.js 14, TypeScript, and Supabase.

![Agent Finder](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🎯 Features

- **Zillow-like Layout**: Map on the right, agent list on the left, filters on top
- **Commission-Based Sorting**: Find agents with the lowest commission rates (default: low to high)
- **Interactive Map**: Leaflet-powered map with agent markers and clustering
- **Advanced Filters**: Commission range, rating, experience, specialties, languages
- **Agent Profiles**: Detailed pages with bio, reviews, recent sales, and commission breakdown
- **Mobile Responsive**: Fully optimized for all screen sizes
- **Real-time Search**: Location autocomplete with instant results
- **Performance Optimized**: TanStack Query for efficient data fetching and caching

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Maps**: Leaflet with React Leaflet
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for implementation)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)

### Step 1: Clone and Install

```bash
cd "Realtor app"
npm install
```

### Step 2: Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to find your credentials
3. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
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

## 📁 Project Structure

```
src/
├── app/
│   ├── agent/[id]/          # Agent detail pages
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
│   └── AgentDetailPage.tsx  # Agent profile page
├── types/
│   └── index.ts             # TypeScript interfaces
├── store/
│   └── appStore.ts          # Zustand global state
└── lib/
    ├── supabase.ts          # Supabase client
    └── utils.ts             # Utility functions

database/
├── schema.sql               # Database schema
└── seed.sql                 # 50 sample agents
```

## 🎨 Key Components

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

### AgentDetailPage
Comprehensive agent profile with:
- Overview tab: Bio, specialties, languages, commission breakdown
- Reviews tab: Client testimonials with ratings
- Recent Sales tab: Properties sold with photos and details

## 🔧 Configuration

### Tailwind Colors
Primary color is defined in `tailwind.config.ts`. Modify the `primary` color palette to match your brand.

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 📊 Database Schema

### Tables
- **agents**: Core agent information and statistics
- **reviews**: Client reviews and ratings
- **recent_sales**: Property sales data

See `database/schema.sql` for complete schema.

## 🚢 Deployment

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

## 🔒 Security

- Row Level Security (RLS) is enabled on Supabase tables
- Environment variables for sensitive data
- Input validation and sanitization
- CORS configured properly

## 🎯 Future Enhancements

- [ ] User authentication for agents
- [ ] Agent dashboard for managing listings
- [ ] Real-time chat between clients and agents
- [ ] Email notifications
- [ ] Payment integration for featured listings
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Agent comparison tool
- [ ] Save favorite agents

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For questions or issues, please open a GitHub issue.

---

Built with ❤️ using Next.js and Supabase
