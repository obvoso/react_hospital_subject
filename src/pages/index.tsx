import Link from "next/link";

export default function Home() {
  return (
    <main className="min-w-[500px]">
      <section className="flex flex-row items-center justify-center min-h-screen py-2">
        <Link href="/baggage/0">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-3">
            짐 챙기기
          </button>
        </Link>
        <Link href="/rotate-carrier/0">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-3">
            캐리어 회전
          </button>
        </Link>
      </section>
    </main>
  );
}
