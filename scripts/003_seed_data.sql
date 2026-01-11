-- Seed initial data for Bangladesh Navy HOC

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value) VALUES
('site_name', '{"en": "Bangladesh Navy Hydrographic & Oceanographic Center", "bn": "বাংলাদেশ নৌবাহিনী হাইড্রোগ্রাফিক ও ওশানোগ্রাফিক সেন্টার"}'),
('contact_info', '{"address": "BNHOC, Chittagong, Bangladesh", "phone": "+880-xxx-xxxx", "email": "info@bnhoc.mil.bd"}'),
('social_links', '{"facebook": "", "twitter": "", "youtube": ""}'),
('footer_content', '{"copyright": "© 2026 Bangladesh Navy. All rights reserved."}')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default pages content
INSERT INTO pages_content (page_key, title, content, is_published) VALUES
('home_hero', 'Welcome to BNHOC', '{"heading": "Bangladesh Navy Hydrographic & Oceanographic Center", "subheading": "Charting the Waters of Bangladesh", "description": "Providing accurate nautical charts, tide tables, and navigational publications for safe maritime navigation."}', true),
('chief_message', 'Message from Chief Hydrographer', '{"name": "Rear Admiral (Name)", "designation": "Chief Hydrographer", "message": "Welcome to the Bangladesh Navy Hydrographic and Oceanographic Center. Our mission is to provide mariners with accurate and up-to-date nautical information for safe navigation in Bangladesh waters."}', true),
('about_history', 'Our History', '{"timeline": [{"year": "1971", "event": "Independence of Bangladesh"}, {"year": "1978", "event": "Establishment of Hydrographic Department"}, {"year": "1990", "event": "First Digital Chart Published"}, {"year": "2010", "event": "ENC Production Commenced"}, {"year": "2020", "event": "GIS Integration Implemented"}]}', true),
('about_vision', 'Vision & Mission', '{"vision": "To be the premier hydrographic authority in the region, providing world-class nautical charting services.", "mission": "To survey, chart and provide navigational information for safe navigation in Bangladesh waters and contribute to national maritime security."}', true)
ON CONFLICT (page_key) DO NOTHING;

-- Insert sample survey ships
INSERT INTO survey_ships (name, role, capability, description, is_published, display_order) VALUES
('BNS Anusandhan', 'Survey Vessel', 'Hydrographic Survey', 'Primary hydrographic survey vessel equipped with modern multi-beam echo sounders and positioning systems.', true, 1),
('BNS Tallashi', 'Survey Vessel', 'Coastal Survey', 'Coastal survey vessel for nearshore and harbor surveys.', true, 2),
('BNS Darshak', 'Survey Launch', 'River Survey', 'Survey launch for river and inland waterway surveys.', true, 3)
ON CONFLICT DO NOTHING;

-- Insert sample courses
INSERT INTO courses (title, category, description, duration, is_published, display_order) VALUES
('Category A Hydrographic Surveying', 'Category A', 'Advanced hydrographic surveying course recognized by FIG/IHO/ICA.', '12 months', true, 1),
('Category B Hydrographic Surveying', 'Category B', 'Basic hydrographic surveying course for naval and civilian personnel.', '6 months', true, 2),
('Survey Recorder Course I', 'Survey Recorder', 'Entry level course for survey recorders.', '3 months', true, 3),
('Survey Recorder Course II', 'Survey Recorder', 'Intermediate course for survey recorders.', '3 months', true, 4),
('Survey Recorder Course III', 'Survey Recorder', 'Advanced course for survey recorders.', '3 months', true, 5),
('Surveyor Course', 'Surveyor', 'Comprehensive surveyor training program.', '6 months', true, 6)
ON CONFLICT DO NOTHING;

-- Insert sample charts
INSERT INTO charts (chart_number, title, chart_type, scale, area, jurisdiction, year, description, is_published) VALUES
('BN 1001', 'Chittagong Port Approach', 'paper', '1:50000', 'Chittagong', 'Bangladesh', 2024, 'Approach chart for Chittagong Port', true),
('BN 1002', 'Mongla Port and Approaches', 'paper', '1:75000', 'Mongla', 'Bangladesh', 2024, 'Chart covering Mongla Port area', true),
('BN 2001', 'Cox''s Bazar to Saint Martin', 'paper', '1:100000', 'Cox''s Bazar', 'Bangladesh', 2023, 'Coastal chart from Cox''s Bazar to Saint Martin Island', true),
('BD500001', 'Chittagong Port ENC', 'enc', '1:22000', 'Chittagong', 'Bangladesh', 2024, 'Electronic Navigational Chart for Chittagong Port', true),
('BD500002', 'Mongla Port ENC', 'enc', '1:45000', 'Mongla', 'Bangladesh', 2024, 'Electronic Navigational Chart for Mongla Port', true)
ON CONFLICT DO NOTHING;

-- Insert sample tide tables
INSERT INTO tide_tables (title, year, station, description, is_published) VALUES
('Chittagong Tide Table 2024', 2024, 'Chittagong', 'Annual tide predictions for Chittagong Port', true),
('Mongla Tide Table 2024', 2024, 'Mongla', 'Annual tide predictions for Mongla Port', true),
('Cox''s Bazar Tide Table 2024', 2024, 'Cox''s Bazar', 'Annual tide predictions for Cox''s Bazar', true),
('Chittagong Tide Table 2023', 2023, 'Chittagong', 'Annual tide predictions for Chittagong Port', true)
ON CONFLICT DO NOTHING;

-- Insert sample notices to mariners
INSERT INTO notices_to_mariners (notice_number, title, month, year, content, is_published) VALUES
('NTM 01/2024', 'January 2024 Notice to Mariners', 1, 2024, 'Monthly compilation of navigational warnings and chart corrections.', true),
('NTM 02/2024', 'February 2024 Notice to Mariners', 2, 2024, 'Monthly compilation of navigational warnings and chart corrections.', true),
('NTM 03/2024', 'March 2024 Notice to Mariners', 3, 2024, 'Monthly compilation of navigational warnings and chart corrections.', true)
ON CONFLICT DO NOTHING;

-- Insert sample publications
INSERT INTO publications (title, category, description, is_published) VALUES
('Bangladesh List of Lights', 'list_of_lights', 'Comprehensive list of all lighthouses and navigation lights in Bangladesh waters.', true),
('Sailing Directions - Bay of Bengal', 'sailing_directions', 'Sailing directions for the Bay of Bengal including Bangladesh coast.', true),
('Bangladesh Waters Radio Signals', 'radio_signals', 'Guide to radio signals and maritime communications in Bangladesh.', true),
('Chittagong Port Pilot Book', 'pilot_books', 'Detailed pilotage information for Chittagong Port.', true),
('Annual Summary of Notices 2023', 'annual_summaries', 'Annual compilation of all Notices to Mariners for 2023.', true)
ON CONFLICT DO NOTHING;

-- Insert sample news/events
INSERT INTO news_events (title, slug, content, excerpt, is_event, is_published, published_at) VALUES
('New ENC Series Released', 'new-enc-series-released', 'Bangladesh Navy Hydrographic Center has released a new series of Electronic Navigational Charts covering the entire coastline of Bangladesh.', 'New Electronic Navigational Charts now available for Bangladesh waters.', false, true, NOW()),
('Hydrographic Survey Completed', 'hydrographic-survey-completed', 'Successfully completed comprehensive hydrographic survey of Payra Port approach channel.', 'Payra Port survey completed with latest technology.', false, true, NOW() - INTERVAL '7 days'),
('World Hydrography Day 2024', 'world-hydrography-day-2024', 'Join us in celebrating World Hydrography Day on June 21st, 2024.', 'Celebrating the importance of hydrography in maritime safety.', true, true, NOW() + INTERVAL '30 days')
ON CONFLICT DO NOTHING;
