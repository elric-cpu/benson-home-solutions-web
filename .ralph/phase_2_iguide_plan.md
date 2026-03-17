# Phase 2: iGUIDE & Spatial Data Integration Plan
## Objective: Transform "Standard Reports" into "Forensic Spatial Assets"
**Status:** Draft (Senior Principal Standard)
**Target Date:** Q1 2026

---

## 1 · Architectural Overview
Phase 2 shifts Benson Home Solutions from a "lead-gen" site to a "digital twin" platform. We will ingest iGUIDE spatial data (RESO-compliant) and map it to our maintenance logic, allowing for room-level risk assessment and visual verification.

### Core Components:
1.  **`src/lib/iguide/client.ts`**: Server-side client for the iGUIDE Portal REST API.
2.  **`src/components/iguide/InteractiveViewer.tsx`**: Client-side React wrapper for the Viewer JS API.
3.  **Database Schema (Supabase/Drizzle)**: New tables for `iguide_projects`, `floors`, and `rooms`.
4.  **Sanity Schema**: Integration of iGUIDE `viewId` into `property` documents.

---

## 2 · Database Schema Extensions (Drizzle)

```typescript
// Proposed additions to src/db/schema.ts

export const iguideProjects = pgTable('iguide_projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  propertyId: uuid('property_id').references(() => properties.id),
  viewId: text('view_id').notNull().unique(), // iGUIDE View ID (e.g., 'abc-123')
  externalUrl: text('external_url'),
  totalInteriorArea: numeric('total_interior_area'), // mm2
  measurementStandard: text('measurement_standard'), // e.g., 'ANSI Z765-2021'
  lastSyncedAt: timestamp('last_synced_at').defaultNow(),
});

export const propertyFloors = pgTable('property_floors', {
  id: uuid('id').primaryKey().defaultRandom(),
  iguideProjectId: uuid('iguide_project_id').references(() => iguideProjects.id),
  floorName: text('floor_name').notNull(),
  level: integer('level').default(0),
  isBelowGrade: boolean('is_below_grade').default(false),
  areaMm2: numeric('area_mm2'),
});

export const propertyRooms = pgTable('property_rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  floorId: uuid('floor_id').references(() => propertyFloors.id),
  roomName: text('room_name').notNull(),
  roomType: text('room_type'), // e.g., 'Kitchen', 'Bedroom'
  widthMm: numeric('width_mm'),
  lengthMm: numeric('length_mm'),
  areaMm2: numeric('area_mm2'),
  panoId: text('pano_id'), // Linked to iGUIDE Pano
});
```

---

## 3 · API Service Structure (`src/lib/iguide/`)

### `client.ts` (Server-Side)
- **`fetchViewSummary(viewId: string)`**: Calls `GET /api/v2/views/{viewId}/summary`.
- **`syncSpatialData(viewId: string)`**: Normalizes iGUIDE JSON into our Drizzle schema. Converts `mm` to `ft` for display.
- **`getAuthToken()`**: Manages Bearer token rotation/retrieval from `.env.local`.

### `viewer.tsx` (Client-Side)
- **`useiGuideViewer(iframeRef: React.RefObject<HTMLIFrameElement>)`**: Custom hook to initialize the `iGUIDE.Viewer` class and expose methods like `moveCamera` and `moveToPano`.

---

## 4 · The "Forensic Link" Integration

### A. TrueCostCalculator v2 (Spatial-Aware)
- Instead of relying on user-provided SQFT, we will allow users to "Link iGUIDE" for absolute precision.
- **Logic Change:** If a property has an iGUIDE, use `iguide_projects.totalInteriorArea` for the maintenance multiplier.

### B. Room-Level Maintenance (The "Benson Edge")
- Map "Photo Updates" from Notion to specific `property_rooms.panoId`.
- **UI:** A "View Forensic Proof" button next to a maintenance item that teleports the user's 3D view directly to the repaired area.

---

## 5 · Security & VA Layer (RBAC)
To address **Dima’s** security concern:
1.  **Strict Row-Level Security (RLS):** iGUIDE data is restricted to the specific `clientId` associated with the property.
2.  **VA Restricted Access:** VAs can view "Active Projects" but cannot "Delete" or "Export" spatial data.
3.  **Sanity Protection:** Sensitive iGUIDE tokens will be stored in `process.env` (Server-only), never exposed to the Sanity Studio frontend.

---

## 6 · Implementation Phases (Sprint 2)
1.  **Step 1:** Run Drizzle migrations for spatial tables.
2.  **Step 2:** Implement `src/lib/iguide/client.ts` with mock data tests.
3.  **Step 3:** Build `InteractiveViewer.tsx` with "Teleport" functionality.
4.  **Step 4:** Integrate spatial area data into the `TrueCostCalculator` logic.

---
**Approval Required:** Elric Benson
**Technical Sign-off:** Dima (Backend), Mari (UX), Silas (AEO)
