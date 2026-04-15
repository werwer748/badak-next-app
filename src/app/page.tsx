/*
* (/) 경로로 접근했을 때 보여줄 내용이에요.
  src/app/page.tsx가 루트(/)고,
  src/app/about/page.tsx를 만들면 /about 경로가 돼요. 폴더 구조가 곧 URL 구조예요.
*/
import Counter from "@/app/_components/Counter";

export default function HomePage() {

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-blue-500">홈페이지</h1>
      <p className="mt-4 text-gray-600">직접 만들었다!!!! 기가 막힌다!!!!!</p>
      <Counter/>
    </main>
  );
}