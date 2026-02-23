// Demo data store for testing without database
import type { Chart, TideTable, NoticeToMariners, Publication, NewsEvent, FormSubmission, ActivityLog } from "@/lib/types"

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
    description: "Detailed approach chart for Chittagong Port including anchorage areas, channel depths, and navigational aids.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 234,
    created_by: null,
    updated_by: null,
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
    description: "Navigation chart for Mongla Port area including Pashur River approaches with detailed depth soundings.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 156,
    created_by: null,
    updated_by: null,
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
    description: "Electronic Navigational Chart covering the entire Bangladesh coastline, compatible with all ECDIS systems.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 89,
    created_by: null,
    updated_by: null,
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
    description: "Detailed chart of Payra deep sea port area with berth layouts and approach channel details.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 45,
    created_by: null,
    updated_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    chart_number: "BN-ENC-002",
    title: "Cox's Bazar to Teknaf — ENC",
    chart_type: "enc",
    scale: "1:100000",
    area: "Cox's Bazar",
    jurisdiction: "Bangladesh",
    year: 2025,
    description: "Electronic Navigational Chart covering the southeastern coast from Cox's Bazar to Teknaf in S-57 format.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 567,
    created_by: null,
    updated_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    chart_number: "BN 1004",
    title: "Sandwip Channel & Approaches",
    chart_type: "paper",
    scale: "1:50000",
    area: "Chittagong",
    jurisdiction: "Bangladesh",
    year: 2025,
    description: "Covers Sandwip Channel and surrounding waters with high-resolution bathymetric data.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 423,
    created_by: null,
    updated_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    chart_number: "BN-ENC-003",
    title: "Karnaphuli River — ENC",
    chart_type: "enc",
    scale: "1:25000",
    area: "Chittagong",
    jurisdiction: "Bangladesh",
    year: 2025,
    description: "High-resolution ENC of Karnaphuli River entrance and approaches to Chittagong port inner harbor.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 612,
    created_by: null,
    updated_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    chart_number: "BN 1005",
    title: "Kutubdia Island to St. Martin's Island",
    chart_type: "paper",
    scale: "1:150000",
    area: "Cox's Bazar",
    jurisdiction: "Bangladesh",
    year: 2024,
    description: "Coastal chart covering the southeastern coast of Bangladesh from Kutubdia Island to St. Martin's Island.",
    preview_url: "#",
    file_url: "#",
    metadata: {},
    is_published: true,
    download_count: 289,
    created_by: null,
    updated_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_TIDE_TABLES: TideTable[] = [
  {
    id: "1",
    title: "Chittagong Port Tide Table 2026",
    year: 2026,
    station: "Chittagong",
    file_url: "#",
    description: "Annual tide predictions for Chittagong Port",
    is_published: true,
    download_count: 1245,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Mongla Port Tide Table 2026",
    year: 2026,
    station: "Mongla",
    file_url: "#",
    description: "Annual tide predictions for Mongla Port",
    is_published: true,
    download_count: 876,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Payra Port Tide Table 2026",
    year: 2026,
    station: "Payra",
    file_url: "#",
    description: "Annual tide predictions for Payra Deep Sea Port",
    is_published: true,
    download_count: 543,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Cox's Bazar Tide Table 2026",
    year: 2026,
    station: "Cox's Bazar",
    file_url: "#",
    description: "Annual tide predictions for Cox's Bazar coastal area",
    is_published: true,
    download_count: 654,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Chittagong Port Tide Table 2025",
    year: 2025,
    station: "Chittagong",
    file_url: "#",
    description: "Annual tide predictions for Chittagong Port",
    is_published: true,
    download_count: 2340,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Mongla Port Tide Table 2025",
    year: 2025,
    station: "Mongla",
    file_url: "#",
    description: "Annual tide predictions for Mongla Port",
    is_published: true,
    download_count: 1890,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Payra Port Tide Table 2025",
    year: 2025,
    station: "Payra",
    file_url: "#",
    description: "Annual tide predictions for Payra Port",
    is_published: true,
    download_count: 1234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Cox's Bazar Tide Table 2025",
    year: 2025,
    station: "Cox's Bazar",
    file_url: "#",
    description: "Annual tide predictions for Cox's Bazar",
    is_published: true,
    download_count: 789,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_NOTICES: NoticeToMariners[] = [
  {
    id: "1",
    notice_number: "NTM 01/2026",
    title: "Temporary Buoyage Change — Chittagong Outer Anchorage",
    month: 1,
    year: 2026,
    file_url: "#",
    content: "A new lateral buoy has been installed at position 22°14.5'N 091°49.2'E",
    is_archived: false,
    is_published: true,
    download_count: 312,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    notice_number: "NTM 02/2026",
    title: "Depth Changes — Karnaphuli River Channel",
    month: 2,
    year: 2026,
    file_url: "#",
    content: "Recent survey indicates significant depth changes in the Karnaphuli approach channel",
    is_archived: false,
    is_published: true,
    download_count: 287,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    notice_number: "NTM 12/2025",
    title: "New Lighthouse — St. Martin's Island Southeast",
    month: 12,
    year: 2025,
    file_url: "#",
    content: "New lighthouse commissioned at St. Martin's Island southeastern tip",
    is_archived: false,
    is_published: true,
    download_count: 456,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    notice_number: "NTM 11/2025",
    title: "Chart Correction — BN 1001 Chittagong Port Approach",
    month: 11,
    year: 2025,
    file_url: "#",
    content: "Correction to depth contours and navigation aids on chart BN 1001",
    is_archived: false,
    is_published: true,
    download_count: 389,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    notice_number: "NTM 10/2025",
    title: "Wreck Marking — Bay of Bengal Sector 7",
    month: 10,
    year: 2025,
    file_url: "#",
    content: "New wreck discovered and marked in Bay of Bengal Sector 7",
    is_archived: true,
    is_published: true,
    download_count: 521,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    notice_number: "NTM 09/2025",
    title: "Traffic Separation Scheme Update — Mongla Approaches",
    month: 9,
    year: 2025,
    file_url: "#",
    content: "Updated traffic separation scheme for Mongla Port approaches",
    is_archived: true,
    is_published: true,
    download_count: 445,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_PUBLICATIONS: Publication[] = [
  {
    id: "1",
    title: "Bangladesh List of Lights & Fog Signals 2025-26",
    category: "list_of_lights",
    description: "Comprehensive listing of all lighthouses, light vessels, and fog signals along the Bangladesh coast and inland waterways.",
    file_url: "#",
    preview_allowed: true,
    is_published: true,
    download_count: 678,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Bangladesh Coast Light List — Supplement A",
    category: "list_of_lights",
    description: "Supplementary additions and corrections to the main List of Lights publication.",
    file_url: "#",
    preview_allowed: true,
    is_published: true,
    download_count: 234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Sailing Directions — Chittagong to Cox's Bazar",
    category: "sailing_directions",
    description: "Detailed sailing directions for the southeastern coast including port entry procedures, anchorages, and pilotage information.",
    file_url: "#",
    preview_allowed: true,
    is_published: true,
    download_count: 945,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Sailing Directions — Mongla and Sundarbans Waters",
    category: "sailing_directions",
    description: "Navigation guide for Mongla port approaches through the Sundarbans waterways, including seasonal information.",
    file_url: "#",
    preview_allowed: false,
    is_published: true,
    download_count: 712,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Bangladesh Maritime Radio Signals Guide 2025",
    category: "radio_signals",
    description: "Complete guide to maritime radio stations, frequencies, and communication procedures for Bangladesh waters.",
    file_url: "#",
    preview_allowed: true,
    is_published: true,
    download_count: 567,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Chittagong Port Pilot Book",
    category: "pilot_books",
    description: "Essential pilotage handbook for Chittagong port including berth information, tidal streams, and port regulations.",
    file_url: "#",
    preview_allowed: true,
    is_published: true,
    download_count: 1123,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Mongla & Payra Ports Pilot Book",
    category: "pilot_books",
    description: "Combined pilotage handbook for Mongla and Payra ports with approach charts and tidal data.",
    file_url: "#",
    preview_allowed: false,
    is_published: true,
    download_count: 834,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Annual Summary of Notices to Mariners 2025",
    category: "annual_summaries",
    description: "Compiled annual summary of all notices to mariners issued during 2025, including permanent corrections.",
    file_url: "#",
    preview_allowed: true,
    is_published: true,
    download_count: 1456,
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
    image_url: "/maritime-news.jpg",
    is_event: false,
    event_date: null,
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
    image_url: "/training-course.png",
    is_event: true,
    event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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
    admin_notes: null,
    reviewed_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    form_type: "data_request",
    status: "pending",
    submitted_by_email: "researcher@university.edu",
    data: { type: "bathymetric", area: "Sundarbans" },
    admin_notes: null,
    reviewed_by: null,
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
    ip_address: null,
    user_agent: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "demo",
    action: "update",
    entity_type: "notice",
    entity_id: "5",
    details: { title: "Notice updated" },
    ip_address: null,
    user_agent: null,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    user_id: "demo",
    action: "login",
    entity_type: "user",
    entity_id: "demo",
    details: {},
    ip_address: null,
    user_agent: null,
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

export function getDemoNotices(): NoticeToMariners[] {
  if (typeof window === "undefined") return DEMO_NOTICES
  const stored = localStorage.getItem("demo_notices")
  return stored ? JSON.parse(stored) : DEMO_NOTICES
}

export function saveDemoNotices(notices: NoticeToMariners[]) {
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
