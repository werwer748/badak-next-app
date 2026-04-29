import { NextRequest } from 'next/server';

const posts = [
  {
    id: 1,
    title: '첫 번째 포스트',
    body: '내용 1',
  }, {
    id: 2,
    title: '첫 번째 포스트',
    body: '내용 1',
  },
];

// GET /api/posts -> 목록 반환
export async function GET(request: NextRequest) {
  // searchParams 예시 → /api/posts?limit=1
  const limit = request.nextUrl.searchParams.get('limit');

  const result = limit ? posts.slice(0, Number(limit)) : posts;

  return Response.json(result);
}

// POST /api/posts → 새 포스트 추가
export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || !body.body) {
    return Response.json(
      {error: '제목과 내용을 입력해주세요'},
      {status: 400},
    );
  }

  const newPost = {
    id: posts.length + 1,
    title: body.title,
    body: body.body,
  };
  posts.push(newPost);

  return Response.json(newPost, {status: 201});
}