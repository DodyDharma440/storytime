export default defineEventHandler(async (event) => {
  const oneDay = 24 * 60 * 60 * 1000;

  setCookie(event, "auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(Date.now() - oneDay),
  });

  return { message: "Cookie set successfully" };
});
