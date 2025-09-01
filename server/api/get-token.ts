export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");

  return { token: token ?? null };
});
