import React from 'react';

function ArticleOther() {
  return (
    <div className="flex flex-row space-x-10 gap-y-3">
      <div className="overflow-hidden">
        <img
          src="/assets/article_image_sample.png"
          alt=""
          className="object-cover transition-transform duration-300 ease-out hover:scale-125 hover:opacity-70"
        />
      </div>

    <div className='flex flex-col space-y-3'>
        <div>
            <p className="font-semibold text-[#192F59] text-xl hover:underline transition-all duration-500 ease-out">
            Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy
            </p>
        </div>

        <div className="flex flex-row space-x-2 items-center text-sm opacity-60">
            <div className='border-b-3 border-[#D9D9D9] flex flex-row space-x-2 pb-1'>
                <p>01/01/2025</p>
                <p>|</p>
                <p>09:25:01AM</p>
            </div>
        </div>

        <div>
            <p className="text-[#192F59] text-base">
            t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as =
uiu
            </p>
      </div>
    </div>
    </div>
  );
}

export default ArticleOther;
