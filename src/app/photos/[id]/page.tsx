import { StudyNote } from '@/components/StudyNote'

const photos = [
  { id: '1', title: '첫 번째 사진', description: '아름다운 풍경' },
  { id: '2', title: '두 번째 사진', description: '도시의 야경' },
  { id: '3', title: '세 번째 사진', description: '바다의 일출' },
]

type Props = {
  params: Promise<{ id: string }>
}

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{photo?.title}</h1>
      <StudyNote id="photos" />
      <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
        <span className="text-gray-500 text-xl">사진 {id}</span>
      </div>
      <p className="text-gray-600">{photo?.description}</p>
      <a href="/photos" className="text-blue-500 hover:underline mt-4 block">
        ← 목록으로
      </a>
    </main>
  )
}