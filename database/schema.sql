-- Create agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  photo_url TEXT,
  commission_rate DECIMAL(4,2) NOT NULL CHECK (commission_rate >= 0 AND commission_rate <= 10),
  years_experience INTEGER NOT NULL CHECK (years_experience >= 0),
  total_sales INTEGER NOT NULL DEFAULT 0,
  avg_days_on_market INTEGER NOT NULL DEFAULT 0,
  rating DECIMAL(2,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER NOT NULL DEFAULT 0,
  bio TEXT,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT '{}',
  license_number TEXT NOT NULL UNIQUE,
  office_address TEXT NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  area_served TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  property_type TEXT NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('buy', 'sell')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recent_sales table
CREATE TABLE recent_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  price INTEGER NOT NULL,
  property_type TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms DECIMAL(3,1) NOT NULL,
  square_feet INTEGER NOT NULL,
  sold_date DATE NOT NULL,
  days_on_market INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_agents_commission_rate ON agents(commission_rate);
CREATE INDEX idx_agents_rating ON agents(rating);
CREATE INDEX idx_agents_years_experience ON agents(years_experience);
CREATE INDEX idx_agents_location ON agents USING GIST (point(longitude, latitude));
CREATE INDEX idx_reviews_agent_id ON reviews(agent_id);
CREATE INDEX idx_recent_sales_agent_id ON recent_sales(agent_id);

-- Enable Row Level Security (optional, for production)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE recent_sales ENABLE ROW LEVEL SECURITY;

-- Create policies (public read access for now)
CREATE POLICY "Public agents are viewable by everyone" ON agents FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public sales are viewable by everyone" ON recent_sales FOR SELECT USING (true);
