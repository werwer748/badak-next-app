import { NextRequest } from 'next/server';

const posts = [
  {id: 1, title: '첫 번째 포스트', body: '내용 1'},
  {id: 2, title: '두 번째 포스트', body: '내용 2'},
];

// GET /api/posts/[id]
export async function GET(
  request: NextRequest,
  {params}: { params: Promise<{ id: string }> },
) {
  const {id} = await params;
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return Response.json(
      {error: `${id} 포스트를 찾을 수 없어요`},
      {status: 404},
    );
  }

  return Response.json(post);
}

// PUT /api/posts/[id]
export async function PUT(
  request: NextRequest,
  {params}: { params: Promise<{ id: string }> },
) {
  const {id} = await params;
  const body = await request.json();
  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json(
      {error: '포스트를 찾을 수 없어요'},
      {status: 404},
    );
  }

  posts[index] = {...posts[index], ...body};

  return Response.json(posts[index]);
}

// DELETE /api/posts/[id]
export async function DELETE(
  request: NextRequest,
  {params}: { params: Promise<{ id: string }> },
) {
  const {id} = await params;
  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return Response.json(
      {error: '포스트를 찾을 수 없어요'},
      {status: 404},
    );
  }

  posts.splice(index, 1);

  return Response.json({message: '삭제됐어요'});
}