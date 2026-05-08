'use server';

import { revalidatePath } from 'next/cache';

type PostState = {
  message: string
  success: boolean
}

// 메모리에 임시 저장 (실제로는 DB)
const posts = [
  {id: 1, title: '첫 번째 포스트', body: '내용 1'},
  {id: 2, title: '두 번째 포스트', body: '내용 2'},
];

export async function createPost(
  prevState: PostState,
  formData: FormData,
): Promise<PostState> {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  // 유효성 검사
  if (!title || !body) {
    return {
      message: '제목과 내용을 모두 입력해주세요',
      success: false,
    };
  }

  if (title.length < 2) {
    return {
      message: '제목은 최소 2글자 이상이어야 합니다',
      success: false,
    };
  }

  // DB 저장 (실제로는 db.posts.create(...))
  const newPost = {
    id: posts.length + 1,
    title,
    body,
  };
  posts.push(newPost);

  revalidatePath('/server-actions-demo'); // 해당 경로의 데이터를 다시 불러오도록 트리거

  return {
    message: '포스트가 작성됐어요!',
    success: true,
  };
}

export async function deletePost(
  prevState: PostState,
  formData: FormData,
): Promise<PostState> {
  const id = formData.get('id') as string;
  const index = posts.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return {
      message: '포스트를 찾을 수 없어요',
      success: false,
    };
  }

  posts.splice(index, 1);
  revalidatePath('/server-actions-demo');

  return {
    message: '삭제됐어요!',
    success: true,
  };
}

export async function getPosts() {
  return posts;
}