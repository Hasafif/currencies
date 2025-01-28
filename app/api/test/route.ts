async function handler() {
  const data = { message: "API Routes Connection is working well" };
  return Response.json(data, { status: 200 });
}

export { handler as GET, handler as POST };
