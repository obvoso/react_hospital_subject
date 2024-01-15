import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <main className="min-w-[500px]">
      <section className="flex flex-row items-center justify-center min-h-screen w-full py-2">
        <Link href="/baggage/0">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-3">
            단계별 짐챙기기
          </button>
        </Link>
        <Link href="/baggage/custom">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-3">
            커스텀 짐챙기기
          </button>
        </Link>
      </section>
    </main>
  );
}
