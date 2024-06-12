export const authEvent = new Event('authChange');

export const triggerAuthChange = () => {
  window.dispatchEvent(authEvent);
};