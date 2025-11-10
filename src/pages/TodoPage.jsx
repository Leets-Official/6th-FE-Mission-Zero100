import React from 'react'
import { Link } from 'react-router-dom'

export default function TodoPage() {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-3xl bg-white p-5 rounded-md shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="m-0 text-lg font-semibold">TODO 페이지</h2>
          <Link to="/" className="text-sm text-gray-600 no-underline">루트로</Link>
        </div>

        <div className="p-3 bg-gray-100 rounded-md">
          {/* UI-only placeholder: real todo list already exists in app; this is a page placeholder */}
          <p className="m-0 text-gray-700">여기는 Todo 페이지(UI 전용)입니다. 실제 기능은 기존 Todo 컴포넌트에서 동작합니다.</p>
        </div>
      </div>
    </div>
  )
}
