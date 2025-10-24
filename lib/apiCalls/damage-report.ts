import { getBackendBaseURL } from '@/lib/backend';

const DAMAGE_REPORT_URL = `${getBackendBaseURL()}/api/damage-report`;

/**
 * Create a new damage report
 */
export const createDamageReport = async (
  token: string,
  data: {
    RentalRequestID: string;
    RentalBusAssignmentID: string;
    vehicleCondition: Record<string, boolean>;
    note?: string;
    checkDate?: string;
  }
) => {
  try {
    const res = await fetch(DAMAGE_REPORT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create damage report');
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating damage report:', error);
    throw error;
  }
};

/**
 * Fetch damage reports for a specific rental request
 */
export const fetchDamageReportsByRentalRequest = async (
  rentalRequestId: string
) => {
  try {
    const url = `${DAMAGE_REPORT_URL}?rentalRequestId=${encodeURIComponent(rentalRequestId)}`;
    const res = await fetch(url, {
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch damage reports');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching damage reports:', error);
    throw error;
  }
};
