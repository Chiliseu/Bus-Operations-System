# Backend Requirements Summary - Bus Operations System

## Session Changes Overview

This document summarizes all frontend changes made and the corresponding backend API requirements needed to support these features.

---

## 1. Bus Rental Module Enhancements

### 1.1 Approved Bus Rentals Page
**Frontend Changes:**
- Added search functionality (search by customer name)
- Added filter dropdown (sort by customer name A-Z/Z-A, created newest/oldest)
- Added pagination (10 items per page, configurable)
- Pagination positioned inside tab content area
- Tab indicator switches instantly without animation

**Backend Requirements:**
✅ **ALREADY IMPLEMENTED** - No backend changes needed. Frontend uses existing `fetchRentalRequestsByStatus('Approved')` API and handles filtering/pagination client-side.

---

### 1.2 Completed Bus Rentals Page
**Frontend Changes:**
- Added search functionality (search by customer name)
- Added filter dropdown (sort by customer name A-Z/Z-A, created newest/oldest)
- Added pagination (10 items per page, configurable)

**Backend Requirements:**
✅ **ALREADY IMPLEMENTED** - No backend changes needed. Frontend uses existing `fetchRentalRequestsByStatus('Completed')` API and handles filtering/pagination client-side.

---

## 2. Maintenance Module Enhancements

### 2.1 Damage Reports Page
**Frontend Changes:**
- Added sliding segmented control tabs: Pending, Accepted, Rejected
- Updated table design to match Add Work Details styling
- Tab badges show count for each status

**Backend Requirements:**
✅ **ALREADY IMPLEMENTED** - No backend changes needed. Frontend filters damage reports by status client-side.

---

### 2.2 Add Work Details Page
**Frontend Changes:**
- Added sliding segmented control tabs: "Work without Details", "Work with Details"
- Tab badges show count for each category
- Fixed hover effects on active tabs

**Backend Requirements:**
✅ **ALREADY IMPLEMENTED** - No backend changes needed. Frontend filters work details based on whether details exist.

---

## 3. Dashboard Enhancements

### 3.1 Bus Status Section - Added "In Rental" Status
**Frontend Changes:**
- Added 4th status card: "In Rental" (blue color, #3b82f6)
- Updated pie chart to show 4 segments:
  - In Operation (green)
  - Not Ready (red)
  - Not Started (gray)
  - **In Rental (blue) - NEW**

**Backend Requirements:**
⚠️ **REQUIRES BACKEND UPDATE**

**API Endpoint:** `fetchDashboardSummary()` (from `/lib/apiCalls/dashboard.ts`)

**Current Response Structure:**
```typescript
{
  earnings: { ... },
  busStatus: {
    NotStarted: number,
    NotReady: number,
    InOperation: number
  },
  topRoutes: { ... }
}
```

**REQUIRED UPDATE - Add InRental field:**
```typescript
{
  earnings: { ... },
  busStatus: {
    NotStarted: number,
    NotReady: number,
    InOperation: number,
    InRental: number  // NEW - Count of buses currently in rental
  },
  topRoutes: { ... }
}
```

**Implementation Notes:**
- Count buses where status is 'InRental' or associated with active rental requests
- Include buses in Approved/Ongoing rental operations
- Exclude completed rental operations

---

### 3.2 Bus Earnings Section - Split into Operations & Rentals
**Frontend Changes:**
- Split "Bus Earnings" tab into two sections:
  1. **Bus Operations Total Earning** (regular bus operations)
  2. **Bus Rentals Total Earning** (rental services)
- Each section shows:
  - Today's earnings with yesterday comparison
  - This week's earnings with last week trend
  - This month's earnings with previous month trend
  - Monthly graph visualization

**Backend Requirements:**
⚠️ **REQUIRES BACKEND UPDATE**

**API Endpoint:** `fetchDashboardSummary()` (from `/lib/apiCalls/dashboard.ts`)

**Current Response Structure:**
```typescript
{
  earnings: {
    month: number,
    year: number,
    data: number[],  // Daily earnings for current month
    previous?: {
      month: number,
      year: number,
      data: number[]  // Daily earnings for previous month
    }
  },
  busStatus: { ... },
  topRoutes: { ... }
}
```

**REQUIRED UPDATE - Add rentalEarnings field:**
```typescript
{
  earnings: {
    month: number,
    year: number,
    data: number[],  // Daily earnings for bus OPERATIONS only
    previous?: {
      month: number,
      year: number,
      data: number[]
    }
  },
  rentalEarnings: {  // NEW - Separate rental earnings tracking
    month: number,
    year: number,
    data: number[],  // Daily earnings for bus RENTALS only
    previous?: {
      month: number,
      year: number,
      data: number[]
    }
  },
  busStatus: {
    NotStarted: number,
    NotReady: number,
    InOperation: number,
    InRental: number  // Also added here
  },
  topRoutes: { ... }
}
```

**Implementation Notes:**
- **`earnings`**: Should only include revenue from regular bus operations (routes, tickets, etc.)
- **`rentalEarnings`**: Should only include revenue from bus rental services
- Both should have the same structure with daily data arrays (31 elements for 31 days)
- Both should include `previous` month data for trend comparison
- `data` array index corresponds to day of month (index 0 = day 1, index 1 = day 2, etc.)

---

## Summary of Backend Work Required

### ✅ No Changes Needed (5 items)
1. Approved page search/filter/pagination
2. Completed page search/filter/pagination
3. Damage Reports segmented tabs
4. Add Work Details segmented tabs
5. UI styling improvements

### ⚠️ Backend Updates Required (2 items)

#### Priority 1: Dashboard API Updates
**Endpoint:** `GET /api/dashboard/summary` (or equivalent)

**Changes:**
1. Add `InRental` count to `busStatus` object
2. Add `rentalEarnings` object with same structure as `earnings`
3. Separate earnings calculation:
   - `earnings.data[]` = Only bus operations revenue
   - `rentalEarnings.data[]` = Only rental services revenue

**Estimated Impact:** Medium
- Requires updating dashboard data aggregation logic
- Requires separating revenue sources in database queries

---

## Testing Requirements

### Frontend Testing Checklist
- ✅ Search functionality works on Approved/Completed pages
- ✅ Filter dropdown works correctly
- ✅ Pagination displays correct number of items
- ✅ Tab switching works smoothly
- ⚠️ Dashboard displays "In Rental" count (pending backend)
- ⚠️ Dashboard shows separate Operations/Rentals earnings (pending backend)

### Backend Testing Checklist (For Backend Team)
- [ ] Verify `busStatus.InRental` returns correct count
- [ ] Verify `rentalEarnings.data[]` contains only rental revenue
- [ ] Verify `earnings.data[]` contains only operations revenue
- [ ] Verify previous month data is included for both earnings types
- [ ] Verify data arrays have 31 elements (for days of month)
- [ ] Test with various date ranges and edge cases

---

## API Response Example

```json
{
  "earnings": {
    "month": 1,
    "year": 2026,
    "data": [1200, 1500, 1800, ...], // 31 elements - operations only
    "previous": {
      "month": 12,
      "year": 2025,
      "data": [1100, 1400, 1700, ...]
    }
  },
  "rentalEarnings": {
    "month": 1,
    "year": 2026,
    "data": [500, 800, 600, ...], // 31 elements - rentals only
    "previous": {
      "month": 12,
      "year": 2025,
      "data": [450, 700, 550, ...]
    }
  },
  "busStatus": {
    "NotStarted": 5,
    "NotReady": 3,
    "InOperation": 12,
    "InRental": 4  // NEW
  },
  "topRoutes": {
    "Route A": 150,
    "Route B": 120,
    "Route C": 95
  }
}
```

---

## Timeline & Priority

**High Priority:**
1. Add `InRental` count to bus status (simple addition)
2. Add `rentalEarnings` to dashboard (requires revenue separation)

**Estimated Development Time:** 
- Bus Status update: 1-2 hours
- Rental Earnings separation: 3-4 hours
- Testing: 2-3 hours
- **Total: ~1 day of backend work**

---

## Contact & Questions

For any questions about these requirements, please reach out to the frontend team. All frontend changes are already implemented and waiting for the backend API updates to be fully functional.

**Files Modified:**
- `app/(dashboard)/bus-rental/Approved/page.tsx`
- `app/(dashboard)/bus-rental/Approved/approved.module.css`
- `app/(dashboard)/bus-rental/Completed/page.tsx`
- `app/(dashboard)/maintenance/Damage-Reports/page.tsx`
- `app/(dashboard)/maintenance/Add-Work-Details/page.tsx`
- `app/(dashboard)/dashboard/page.tsx`
- `app/(dashboard)/dashboard/dashboard.module.css`
