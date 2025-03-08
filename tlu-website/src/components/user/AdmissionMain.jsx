import React from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'
import HighlightHeader from '../layouts/HighlightHeader';
import ArticleOther from '../layouts/ArticleOther';

function AdmissionMain() {
  return (
    <div>
        <NavBar />

        <div>
            <div className='w-[1300px] mx-auto mb-10 mt-30'>
                <HighlightHeader title="TUYỂN SINH" />
                <div className='flex flex-col gap-y-5'>
                    <ArticleOther />
                    <ArticleOther />
                    <ArticleOther />
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default AdmissionMain