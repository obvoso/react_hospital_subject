import Link from "next/link";

export default function Home() {
  return (
    <main className="min-w-[500px]">
      <section className="flex flex-col items-center justify-center min-h-screen py-2">
        <Link href="/baggage/0">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            짐 챙기기
          </button>
        </Link>
      </section>
    </main>
  );
}
