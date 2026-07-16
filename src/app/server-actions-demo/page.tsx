import { getPosts } from '@/app/actions/posts'
import PostForm from './_components/PostForm'
import DeleteButton from './_components/DeleteButton'

export default async function ServerActionsDemoPage() {
  const posts = await getPosts()

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Server Actions 데모</h1>
      <PostForm />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">포스트 목록</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">포스트가 없어요.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-white rounded-lg border border-gray-200 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{post.body}</p>
                </div>
                <DeleteButton id={post.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}