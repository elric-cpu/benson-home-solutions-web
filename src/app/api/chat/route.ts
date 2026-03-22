
export async function POST(request: Request) {
  const { message } = await request.json();

  if (message === 'What is the CCB number?') {
    return new Response('258533', {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response('Sorry, I can only answer questions about the CCB number.', {
    status: 400,
    headers: { 'Content-Type': 'text/plain' },
  });
}
