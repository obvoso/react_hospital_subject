import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-w-max min-h-screen items-center justify-center">
      <section className="w-fit h-fit grid grid-rows-2 grid-cols-2 justify-center gap-10">
        <Link href="/baggage">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-auto flex">
            짐 챙기기
          </button>
        </Link>
        <Link href="/rotate-carrier">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-auto flex">
            캐리어 회전
          </button>
        </Link>
        <Link href="/route">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-auto flex">
            경로 기억하기
          </button>
        </Link>
        <Link href="/souvenir">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-auto flex">
            오늘의 기념품은?
          </button>
        </Link>
      </section>
    </main>
  );
}
