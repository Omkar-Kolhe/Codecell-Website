const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export interface Week {
  id: string;
  week_number: number;
  chapter_name: string; // display title
  theme?: string;
  description?: string;
  starts_at: string; // ISO datetime
  ends_at: string;
  is_active: boolean;
  scoring_system: "FULL" | "PARTIAL";
  contest_type: "OPEN" | "FIXED";
  created_at: string;
  updated_at: string;
}
 
// Backend model: Problem
export interface Problem {
  id: string;
  week_id?: string;
  event_id?: string;
  title: string;
  slug: string;
  statement: string;
  input_format?: string;
  output_format?: string;
  constraints?: string;
  base_points: number;
  time_limit_ms: number;
  memory_limit_mb: number;
  difficulty: string;
  checker_type: string;
  editorial?: string;
  is_published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
 
// Backend DTO: EventResponse (camelCase — distinct from the raw Event model)
export type EventStatus = "UPCOMING" | "LIVE" | "ENDED";
 
export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: string; // ISO datetime
  endTime: string;
  status: EventStatus;
}
 
// ---------- Shared fetch helper ----------
 
class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
 
// Used by Weeks endpoints — WeekController writes the payload directly,
// no envelope (e.g. c.JSON(200, weeks)).
async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body?.error ?? message;
    } catch {
      // response wasn't JSON, fall back to statusText
    }
    throw new ApiError(res.status, message);
  }
 
  return res.json() as Promise<T>;
}
 
// Used by Events endpoints — EventController wraps every response in
// { success: boolean, data?: T, error?: { message: string } }.
interface Envelope<T> {
  success: boolean;
  data?: T;
  error?: { message: string };
}
 
async function apiGetEnveloped<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
 
  const body = (await res.json()) as Envelope<T>;
 
  if (!res.ok || !body.success) {
    throw new ApiError(res.status, body.error?.message ?? res.statusText);
  }
 
  return body.data as T;
}
 
// ---------- Weeks ----------
 
export function getWeeks(): Promise<Week[]> {
  return apiGet<Week[]>("/weeks");
}
 
export function getWeek(id: string): Promise<Week> {
  return apiGet<Week>(`/weeks/${id}`);
}
 
export function getWeekProblems(id: string): Promise<Problem[]> {
  return apiGet<Problem[]>(`/weeks/${id}/problems`);
}
 
// ---------- Events ----------
 
export function getEvents(): Promise<Event[]> {
  return apiGetEnveloped<Event[]>("/api/events");
}
 
export function getEvent(id: string): Promise<Event> {
  return apiGetEnveloped<Event>(`/api/events/${id}`);
}
 
export { ApiError };