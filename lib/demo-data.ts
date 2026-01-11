// Demo data store for testing admin panel without database
import type { Chart, TideTable, Notice, Publication, NewsEvent, FormSubmission, ActivityLog } from "@/lib/types"

export const DEMO_CHARTS: Chart[] = [
  {
    id: "1",
    chart_number: "BN 1001",
    title: "Chittagong Port Approach",
    chart_type: "paper",
    scale: "1:50000",
    area: "Chittagong",
    jurisdiction: "Bangladesh",
    year: 2024,
    description: "Detailed approach chart for Chittagong Port",
    preview_url: "/nautical-chart.jpg",
    file_url: "#",
    is_published: true,
    download_count: 234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    chart_number: "BN 1002",
    title: "Mongla Port & Approaches",
    chart_type: "paper",
    scale: "1:75000",
    area: "Mongla",
    jurisdiction: "Bangladesh",
    year: 2024,
    description: "Navigation chart for Mongla Port area",
    preview_url: "/port-chart.jpg",
    file_url: "#",
    is_published: true,
    download_count: 156,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    chart_number: "BN-ENC-001",
    title: "Bangladesh Coast ENC",
    chart_type: "enc",
    scale: "1:100000",
    area: "Bay of Bengal",
    jurisdiction: "Bangladesh",
    year: 2024,
    description: "Electronic Navigation Chart for Bangladesh coastal waters",
    preview_url: "/electronic-chart.jpg",
    file_url: "#",
    is_published: true,
    download_count: 89,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    chart_number: "BN 1003",
    title: "Payra Port Development Area",
    chart_type: "paper",
    scale: "1:25000",
    area: "Payra",
    jurisdiction: "Bangladesh",
    year: 2023,
    description: "Detailed chart of Payra deep sea port area",
    preview_url: "/port-development-chart.jpg",
    file_url: "#",
    is_published: false,
    download_count: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_TIDE_TABLES: TideTable[] = [
  {
    id: "1",
    year: 2025,
    station: "Chittagong",
    file_url: "#",
    is_published: true,
    download_count: 567,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    year: 2025,
    station: "Mongla",
    file_url: "#",
    is_published: true,
    download_count: 342,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    year: 2024,
    station: "Cox's Bazar",
    file_url: "#",
    is_published: true,
    download_count: 289,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_NOTICES: Notice[] = [
  {
    id: "1",
    notice_number: "NTM 01/2025",
    title: "New Buoy Installation - Chittagong Approach",
    month: 1,
    year: 2025,
    content: "A new lateral buoy has been installed at position 22°14.5'N 091°49.2'E",
    affected_charts: ["BN 1001", "BN 1002"],
    is_archived: false,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    notice_number: "NTM 02/2025",
    title: "Depth Change - Mongla Channel",
    month: 1,
    year: 2025,
    content: "Recent survey indicates depth change in Mongla approach channel",
    affected_charts: ["BN 1002"],
    is_archived: false,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    notice_number: "NTM 12/2024",
    title: "Light Characteristic Change",
    month: 12,
    year: 2024,
    content: "The light at Kutubdia has changed characteristics",
    affected_charts: ["BN 1001"],
    is_archived: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_PUBLICATIONS: Publication[] = [
  {
    id: "1",
    title: "Bangladesh Sailing Directions",
    category: "sailing_directions",
    edition: "2024",
    description: "Comprehensive sailing directions for Bangladesh waters",
    file_url: "#",
    is_published: true,
    download_count: 423,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "List of Lights - Bay of Bengal",
    category: "list_of_lights",
    edition: "2024",
    description: "Complete list of navigational lights in Bangladesh waters",
    file_url: "#",
    is_published: true,
    download_count: 312,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_NEWS: NewsEvent[] = [
  {
    id: "1",
    title: "New ENC Cell Released for Chittagong Port",
    slug: "new-enc-cell-chittagong",
    content: "BNHOC has released a new electronic navigation chart cell covering Chittagong Port approaches.",
    excerpt: "New electronic navigation chart cell released",
    type: "news",
    image_url: "/maritime-news.jpg",
    is_featured: true,
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Hydrographic Survey Training Course 2025",
    slug: "hydrographic-survey-course-2025",
    content: "Registration is now open for the annual hydrographic survey training course.",
    excerpt: "Registration open for 2025 training course",
    type: "event",
    event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    image_url: "/training-course.png",
    is_featured: false,
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_SUBMISSIONS: FormSubmission[] = [
  {
    id: "1",
    form_type: "chart_correction",
    status: "pending",
    submitted_by_email: "captain@merchant.com",
    data: { chart: "BN 1001", description: "Depth discrepancy noted" },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    form_type: "data_request",
    status: "pending",
    submitted_by_email: "researcher@university.edu",
    data: { type: "bathymetric", area: "Sundarbans" },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_LOGS: ActivityLog[] = [
  {
    id: "1",
    user_id: "demo",
    action: "create",
    entity_type: "chart",
    entity_id: "1",
    details: { title: "New chart added" },
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "demo",
    action: "update",
    entity_type: "notice",
    entity_id: "5",
    details: { title: "Notice updated" },
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    user_id: "demo",
    action: "login",
    entity_type: "user",
    entity_id: "demo",
    details: {},
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
]

// Demo data management functions (stored in localStorage for persistence during session)
export function getDemoCharts(): Chart[] {
  if (typeof window === "undefined") return DEMO_CHARTS
  const stored = localStorage.getItem("demo_charts")
  return stored ? JSON.parse(stored) : DEMO_CHARTS
}

export function saveDemoCharts(charts: Chart[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("demo_charts", JSON.stringify(charts))
  }
}

export function getDemoTideTables(): TideTable[] {
  if (typeof window === "undefined") return DEMO_TIDE_TABLES
  const stored = localStorage.getItem("demo_tide_tables")
  return stored ? JSON.parse(stored) : DEMO_TIDE_TABLES
}

export function saveDemoTideTables(tables: TideTable[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("demo_tide_tables", JSON.stringify(tables))
  }
}

export function getDemoNotices(): Notice[] {
  if (typeof window === "undefined") return DEMO_NOTICES
  const stored = localStorage.getItem("demo_notices")
  return stored ? JSON.parse(stored) : DEMO_NOTICES
}

export function saveDemoNotices(notices: Notice[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("demo_notices", JSON.stringify(notices))
  }
}

export function getDemoPublications(): Publication[] {
  if (typeof window === "undefined") return DEMO_PUBLICATIONS
  const stored = localStorage.getItem("demo_publications")
  return stored ? JSON.parse(stored) : DEMO_PUBLICATIONS
}

export function saveDemoPublications(publications: Publication[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("demo_publications", JSON.stringify(publications))
  }
}

export function getDemoNews(): NewsEvent[] {
  if (typeof window === "undefined") return DEMO_NEWS
  const stored = localStorage.getItem("demo_news")
  return stored ? JSON.parse(stored) : DEMO_NEWS
}

export function saveDemoNews(news: NewsEvent[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("demo_news", JSON.stringify(news))
  }
}
