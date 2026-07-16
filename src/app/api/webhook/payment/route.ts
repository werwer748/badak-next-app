// revalidatePath / revalidateTag 실제 사용 예시
import { revalidatePath, revalidateTag } from 'next/cache';  // ← next/cache에서 import

export async function POST(request: Request) {
  const body = await request.json();

  // 1. 결제 완료 처리 (실제로는 DB 업데이트)
  console.log('결제 완료:', body.orderId);

  // 2. revalidatePath → 특정 경로의 캐시를 날림
  revalidatePath('/orders');           // /orders 페이지 캐시 무효화
  revalidatePath(`/orders/${body.orderId}`); // 특정 주문 페이지 캐시 무효화

  // 3. revalidateTag → 태그로 묶인 캐시를 날림
  revalidateTag('orders', {});             // 'orders' 태그 달린 캐시 전부 무효화

  return Response.json({ok: true});
}