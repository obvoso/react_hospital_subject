import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <main className="min-w-[500px]">
      <section className="flex flex-row items-center justify-center min-h-screen w-full py-2">
        <Link href="/rotate-carrier/0">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-3">
            단계별 캐리어 회전
          </button>
        </Link>
        <Link href="/rotate-carrier/custom">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-3">
            커스텀 캐리어 회전
          </button>
        </Link>
      </section>
    </main>
  );
}
