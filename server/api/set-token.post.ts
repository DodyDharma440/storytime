export default defineEventHandler(async (event) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const body = await readBody(event);

  setCookie(event, "auth-token", body.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now() + oneDay),
  });

  return { message: "Cookie set successfully" };
});
