import React from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'

const PostManager = () => {
  return (
    <div className="min-h-screen flex flex-col mt-50">
      <NavBar />
      {/* hearder */}
      <div className="flex justify-between">
        <h2>Danh sach bai viet</h2>
        <div>
          <button>Them moi</button>
        </div>
      </div>
      {/* list */}
      <Footer />
    </div>
  )
}

export default PostManager