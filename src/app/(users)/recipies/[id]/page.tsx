'use client'

import { useSearchParams } from "next/navigation"
const param = () => {
  const params = useSearchParams();
  const id = params.get('id');
  return (
    <div>page</div>
  )
}

export default param