export async function logoutUser(): Promise<void> {
  try {
    const res = await fetch('https://auth.agilabuscorp.me/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // ensures cookies are sent
    });

    if (!res.ok) {
      throw new Error('Logout failed');
    }

    // Redirect to login page or auth system
    window.location.href = 'https://auth.agilabuscorp.me';
  } catch (error) {
    console.error('Error during logout:', error);
  }
}