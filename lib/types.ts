export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: "admin" | "editor" | "viewer"
  avatar_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Chart {
  id: string
  chart_number: string
  title: string
  chart_type: "paper" | "enc"
  scale: string | null
  area: string | null
  jurisdiction: string | null
  year: number | null
  description: string | null
  preview_url: string | null
  file_url: string | null
  metadata: Record<string, unknown>
  is_published: boolean
  download_count: number
  created_by: string | null
  updated_by: string | null
  created_at: string
  updated_at: string
}

export interface TideTable {
  id: string
  title: string
  year: number
  station: string
  file_url: string | null
  description: string | null
  is_published: boolean
  download_count: number
  created_at: string
  updated_at: string
}

export interface NoticeToMariners {
  id: string
  notice_number: string
  title: string
  month: number
  year: number
  file_url: string | null
  content: string | null
  is_archived: boolean
  is_published: boolean
  download_count: number
  created_at: string
  updated_at: string
}

export interface Publication {
  id: string
  title: string
  category: "list_of_lights" | "sailing_directions" | "radio_signals" | "pilot_books" | "annual_summaries" | "other"
  description: string | null
  file_url: string | null
  preview_allowed: boolean
  is_published: boolean
  download_count: number
  created_at: string
  updated_at: string
}

export interface GISLayer {
  id: string
  name: string
  layer_type: string
  scale: string | null
  location: string | null
  jurisdiction: string | null
  geojson_data: unknown
  file_url: string | null
  is_enabled: boolean
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface SurveyShip {
  id: string
  name: string
  role: string | null
  capability: string | null
  image_url: string | null
  description: string | null
  specifications: Record<string, unknown>
  is_published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface MediaGallery {
  id: string
  title: string
  media_type: "image" | "video"
  url: string
  thumbnail_url: string | null
  category: string | null
  description: string | null
  is_published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  category: string
  description: string | null
  duration: string | null
  brochure_url: string | null
  image_url: string | null
  is_published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface FormSubmission {
  id: string
  form_type: "chart_correction" | "data_request" | "payment_info" | "contact" | "suggestion"
  data: Record<string, unknown>
  status: "pending" | "in_review" | "completed" | "rejected"
  submitted_by_email: string | null
  admin_notes: string | null
  reviewed_by: string | null
  created_at: string
  updated_at: string
}

export interface NewsEvent {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  image_url: string | null
  event_date: string | null
  is_event: boolean
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface PageContent {
  id: string
  page_key: string
  title: string | null
  content: Record<string, unknown>
  meta_description: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface SystemSetting {
  id: string
  setting_key: string
  setting_value: Record<string, unknown>
  updated_at: string
}

export interface ActivityLog {
  id: string
  user_id: string | null
  action: string
  entity_type: string | null
  entity_id: string | null
  details: Record<string, unknown>
  ip_address: string | null
  user_agent: string | null
  created_at: string
}
