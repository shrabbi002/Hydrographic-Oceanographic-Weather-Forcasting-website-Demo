-- Row Level Security Policies for Bangladesh Navy HOC

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tide_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices_to_mariners ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gis_layers ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_ships ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = user_id;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'editor')
    AND is_active = true
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
    AND is_active = true
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON profiles FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can insert profiles" ON profiles FOR INSERT WITH CHECK (is_admin() OR auth.uid() = id);

-- Public content policies (pages_content, charts, etc.)
-- Anyone can read published content
CREATE POLICY "Anyone can view published pages" ON pages_content FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all pages" ON pages_content FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage pages" ON pages_content FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published charts" ON charts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all charts" ON charts FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage charts" ON charts FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published tide tables" ON tide_tables FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all tide tables" ON tide_tables FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage tide tables" ON tide_tables FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published notices" ON notices_to_mariners FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all notices" ON notices_to_mariners FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage notices" ON notices_to_mariners FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published publications" ON publications FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all publications" ON publications FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage publications" ON publications FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view enabled GIS layers" ON gis_layers FOR SELECT USING (is_enabled = true);
CREATE POLICY "Admins/Editors can view all GIS layers" ON gis_layers FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage GIS layers" ON gis_layers FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published ships" ON survey_ships FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all ships" ON survey_ships FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage ships" ON survey_ships FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published media" ON media_gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all media" ON media_gallery FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage media" ON media_gallery FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all courses" ON courses FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage courses" ON courses FOR ALL USING (is_admin_or_editor());

CREATE POLICY "Anyone can view published news" ON news_events FOR SELECT USING (is_published = true);
CREATE POLICY "Admins/Editors can view all news" ON news_events FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins/Editors can manage news" ON news_events FOR ALL USING (is_admin_or_editor());

-- Form submissions - anyone can submit, only admins can view
CREATE POLICY "Anyone can submit forms" ON form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all submissions" ON form_submissions FOR SELECT USING (is_admin_or_editor());
CREATE POLICY "Admins can update submissions" ON form_submissions FOR UPDATE USING (is_admin_or_editor());

-- System settings - admin only
CREATE POLICY "Admins can manage settings" ON system_settings FOR ALL USING (is_admin());
CREATE POLICY "Anyone can read settings" ON system_settings FOR SELECT USING (true);

-- Activity logs - admin only view, auto-insert allowed
CREATE POLICY "Admins can view logs" ON activity_logs FOR SELECT USING (is_admin());
CREATE POLICY "System can insert logs" ON activity_logs FOR INSERT WITH CHECK (true);
