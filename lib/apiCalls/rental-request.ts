import { RENTAL_REQUESTS_URL } from '@/lib/urls';

// ✅ Fetch rental requests filtered by status
export const fetchRentalRequestsByStatus = async (token: string, status: string) => {
  try {
    const url = `${RENTAL_REQUESTS_URL}?status=${encodeURIComponent(status)}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch rental requests by status');
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching rental requests (${status}):`, error);
    throw error;
  }
};

// ✅ Create a new rental request
export const createRentalRequest = async (token: string, data: any) => {
  try {
    const res = await fetch(RENTAL_REQUESTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create rental request');
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating rental request:', error);
    throw error;
  }
};

// ✅ Update an existing rental request (PUT)
export const updateRentalRequest = async (
  token: string,
  rentalRequestId: string,
  payload: {
    command?: string;
    rentalRequestUpdates?: Record<string, any>;
    rentalAssignmentUpdates?: Record<string, any>;
    busAssignmentUpdates?: Record<string, any>;
    drivers?: string[];
  }
) => {
  try {
    const res = await fetch(`${RENTAL_REQUESTS_URL}/${rentalRequestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update rental request');
    }

    return await res.json();
  } catch (error) {
    console.error('Error updating rental request:', error);
    throw error;
  }
};
