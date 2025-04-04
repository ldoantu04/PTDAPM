import React from 'react'

function Article() {
  return (
    <div className='flex flex-col gap-y-2'>
        <div>
            <img src="/assets/article_image_sample.png" alt="" />
        </div>

        <div className='flex flex-row space-x-2 items-center text-sm opacity-60'>
            <p>01/01/2025</p>
            <p>|</p>
            <p>09:25:01AM</p>
        </div>

        <div>
            <p className='font-semibold text-[#192F59] text-base hover:underline transition-all duration-500 ease-out'>Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy</p>
        </div>
    </div>
  )
}

export default Article