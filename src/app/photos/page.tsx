import Link from 'next/link'
import { StudyNote } from '@/components/StudyNote'

const photos = [
  { id: '1', title: '첫 번째 사진', description: '아름다운 풍경' },
  { id: '2', title: '두 번째 사진', description: '도시의 야경' },
  { id: '3', title: '세 번째 사진', description: '바다의 일출' },
]

export default function PhotosPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">사진 목록</h1>
      <StudyNote id="photos" />
      <div className="grid grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/photos/${photo.id}`}
            className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <div className="w-full h-32 bg-gray-300 rounded mb-2 flex items-center justify-center">
              <span className="text-gray-500">사진 {photo.id}</span>
            </div>
            <h2 className="font-bold">{photo.title}</h2>
            <p className="text-sm text-gray-600">{photo.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}