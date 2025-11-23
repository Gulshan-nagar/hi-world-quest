-- Create function to update availability
CREATE OR REPLACE FUNCTION update_availability(
  pkg_name TEXT,
  booking_date DATE,
  slots_to_reduce INTEGER
)
RETURNS void AS $$
BEGIN
  UPDATE public.package_availability
  SET available_slots = GREATEST(0, available_slots - slots_to_reduce)
  WHERE package_name = pkg_name AND date = booking_date;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp;