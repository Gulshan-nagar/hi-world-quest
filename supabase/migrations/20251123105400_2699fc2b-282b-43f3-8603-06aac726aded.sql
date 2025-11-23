-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  group_size INTEGER NOT NULL CHECK (group_size > 0),
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create package_availability table
CREATE TABLE IF NOT EXISTS public.package_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_name TEXT NOT NULL,
  date DATE NOT NULL,
  available_slots INTEGER NOT NULL CHECK (available_slots >= 0),
  max_slots INTEGER NOT NULL CHECK (max_slots > 0),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(package_name, date)
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_availability ENABLE ROW LEVEL SECURITY;

-- Policies for bookings (public can create, view their own)
CREATE POLICY "Anyone can create bookings"
  ON public.bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view bookings"
  ON public.bookings
  FOR SELECT
  TO public
  USING (true);

-- Policies for availability (public read access)
CREATE POLICY "Anyone can view availability"
  ON public.package_availability
  FOR SELECT
  TO public
  USING (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_package_availability_updated_at
  BEFORE UPDATE ON public.package_availability
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert some sample availability data
INSERT INTO public.package_availability (package_name, date, available_slots, max_slots)
SELECT 
  pkg,
  CURRENT_DATE + (day || ' days')::INTERVAL,
  10,
  10
FROM 
  (VALUES 
    ('sunset-camel-safari'),
    ('jeep-desert-adventure'),
    ('luxury-overnight-camp'),
    ('royal-desert-expedition')
  ) AS packages(pkg),
  generate_series(0, 90) AS day;