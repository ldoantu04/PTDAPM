import React, { useState } from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'
import ImageSlider from '../layouts/ImageSlider';
import PartnerImageSlider from '../layouts/PartnerImageSlider';
import HighlightHeader from '../layouts/HighlightHeader';
import ArticleMainPage from '../layouts/ArticleMainPage';
import SeeAll from '../layouts/SeeAll';

function Main() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className='w-full relative'>
        <NavBar />

        <ImageSlider />

        {/* Intro Card */}
        <div className='w-[1300px] h-auto mx-auto rounded-xl relative -mt-12 bg-white shadow-lg p-10 pb-10'>
          {/* Button chọn nội dung */}
          <div className='flex justify-center gap-15 mb-4 '>
            <button
              className={`text-[#192E58] text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-500 ease-out flex items-center justify-center gap-3 ${
                activeTab === 'tab1' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setActiveTab('tab1')}
            >
              <img src="/assets/intro_card/icon-2.png" alt="" /> Môi trường giáo dục
            </button>
            <button
              className={`text-[#192E58] text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-500 ease-out flex items-center justify-center gap-3 ${
                activeTab === 'tab2' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setActiveTab('tab2')}
            >
              <img src="/assets/intro_card/icon-1.png" alt="" /> Chương trình đào tạo
            </button>
            <button
              className={`text-[#192E58] text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-500 ease-out flex items-center justify-center gap-3 ${
                activeTab === 'tab3' ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => setActiveTab('tab3')}
            >
              <img src="/assets/intro_card/icon.png" alt="" /> Hoạt động sinh viên
            </button>
          </div>

          {/* Hiển thị nội dung theo tab */}
          <div className='text-left text-md transition-all duration-500 ease-out px-10 mt-7'>
            {activeTab === 'tab1' && (
              <>
                <p>Trở thành sinh viên của khoa, các bạn có một môi trường giáo dục tốt: Có các phòng học, phòng thí nghiệm, và trang thiết bị tối ưu để hỗ trợ việc giảng dạy và nghiên cứu trong lĩnh vực Công nghệ thông tin; Có các giảng viên giàu kinh nghiệm, có trình độ chuyên môn cao và đam mê trong lĩnh vực Công nghệ thông tin. Các giảng viên cung cấp kiến thức mới nhất, hướng dẫn và hỗ trợ sinh viên trong quá trình học tập; Có chương trình học phong phú và đa dạng, bao gồm cả các môn học lý thuyết và thực hành. Chương trình đáp ứng nhu cầu của ngành Công nghệ thông tin và cập nhật với các xu hướng công nghệ mới; Tạo cơ hội cho sinh viên thực hành và thực tập trong các doanh nghiệp, tổ chức hoặc dự án thực tế; Khuyến khích sự sáng tạo và tư duy độc lập của sinh viên. Cung cấp các hoạt động ngoại khóa, dự án nghiên cứu, và sự hỗ trợ từ cộng đồng sinh viên và giảng viên để thúc đẩy sự phát triển cá nhân và tạo ra những ý tưởng mới; Có mối quan hệ chặt chẽ với các doanh nghiệp trong ngành Công nghệ thông tin, tạo cơ hội cho sinh viên tiếp cận với thực tế công việc, nhận được thông tin về xu hướng công nghệ.</p>
                <a href="/gioi-thieu/tong-quan-ve-khoa" className="flex justify-end items-center text-[#C10629] font-bold hover:underline transition-all duration-500 ease-out gap-2">
                  Tổng quan về khoa
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17631 0.178483C8.28881 0.0641944 8.44132 0 8.60032 0C8.75933 0 8.91184 0.0641944 9.02434 0.178483L13.8245 5.06085C13.9369 5.17528 14 5.33039 14 5.49212C14 5.65385 13.9369 5.80896 13.8245 5.9234L9.02434 10.8058C8.96941 10.8657 8.90317 10.9138 8.82956 10.9472C8.75596 10.9805 8.67651 10.9985 8.59594 10.9999C8.51538 11.0014 8.43535 10.9863 8.36064 10.9556C8.28592 10.9249 8.21805 10.8792 8.16108 10.8212C8.1041 10.7633 8.05918 10.6943 8.029 10.6183C7.99883 10.5423 7.98401 10.4609 7.98543 10.3789C7.98685 10.297 8.00448 10.2162 8.03728 10.1413C8.07007 10.0665 8.11736 9.99908 8.17631 9.94321L11.9525 6.10242H0.600023C0.440887 6.10242 0.288269 6.03812 0.175742 5.92366C0.0632164 5.80921 0 5.65398 0 5.49212C0 5.33026 0.0632164 5.17503 0.175742 5.06058C0.288269 4.94612 0.440887 4.88183 0.600023 4.88183H11.9525L8.17631 1.04103C8.06394 0.926603 8.00083 0.771487 8.00083 0.609758C8.00083 0.448029 8.06394 0.292913 8.17631 0.178483Z" fill="#C10629"/>
                  </svg>
                </a>
              </>
            )}
            {activeTab === 'tab2' && (
              <>
                <p>Chương trình đào tạo các ngành thuộc nhóm ngành CNTT của khoa có các đặc điểm sau: Có một nền tảng kiến thức rộng về các lĩnh vực liên quan đến Công nghệ thông tin, bao gồm các học phần cơ bản như lập trình, cơ sở dữ liệu, mạng máy tính, hệ điều hành, thuật toán, và công nghệ phần mềm; Có tính thực tiễn và ứng dụng, đảm bảo sinh viên được tiếp cận với các công nghệ và công cụ thực tế trong lĩnh vực Công nghệ thông tin. Thông qua các dự án thực hành, thực tập, và các hoạt động ngoại khóa, sinh viên có cơ hội áp dụng kiến thức vào thực tế, rèn kỹ năng thực hành và tìm hiểu về các xu hướng mới nhất trong ngành; Không chỉ trang bị kiến thức cơ bản và lý thuyết, mà chương trình còn giúp sinh viên có cơ hội áp dụng những kiến thức đó vào các dự án thực tế và bài tập thực hành; Và có mối liên kết mạnh mẽ với doanh nghiệp và ngành nghề.</p>
                <a href="/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin" className="flex justify-end items-center text-[#C10629] font-bold hover:underline transition-all duration-500 ease-out gap-2">
                  Chương trình đào tạo
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17631 0.178483C8.28881 0.0641944 8.44132 0 8.60032 0C8.75933 0 8.91184 0.0641944 9.02434 0.178483L13.8245 5.06085C13.9369 5.17528 14 5.33039 14 5.49212C14 5.65385 13.9369 5.80896 13.8245 5.9234L9.02434 10.8058C8.96941 10.8657 8.90317 10.9138 8.82956 10.9472C8.75596 10.9805 8.67651 10.9985 8.59594 10.9999C8.51538 11.0014 8.43535 10.9863 8.36064 10.9556C8.28592 10.9249 8.21805 10.8792 8.16108 10.8212C8.1041 10.7633 8.05918 10.6943 8.029 10.6183C7.99883 10.5423 7.98401 10.4609 7.98543 10.3789C7.98685 10.297 8.00448 10.2162 8.03728 10.1413C8.07007 10.0665 8.11736 9.99908 8.17631 9.94321L11.9525 6.10242H0.600023C0.440887 6.10242 0.288269 6.03812 0.175742 5.92366C0.0632164 5.80921 0 5.65398 0 5.49212C0 5.33026 0.0632164 5.17503 0.175742 5.06058C0.288269 4.94612 0.440887 4.88183 0.600023 4.88183H11.9525L8.17631 1.04103C8.06394 0.926603 8.00083 0.771487 8.00083 0.609758C8.00083 0.448029 8.06394 0.292913 8.17631 0.178483Z" fill="#C10629"/>
                  </svg>
                </a>
              </>
            )}
            {activeTab === 'tab3' && (
              <>
                <p>Hoạt động sinh viên đóng vai trò quan trọng trong việc phát triển và làm giàu cho trải nghiệm học tập của các sinh viên. Các hoạt động này không chỉ giúp các sinh viên rèn luyện kỹ năng cá nhân, mở rộng kiến thức, mà còn tạo ra những cơ hội giao lưu, hợp tác và xây dựng mạng lưới quan hệ trong cộng đồng sinh viên và xã hội. Đối với hoạt động NCKH, sinh viên có thể tham gia vào các dự án nghiên cứu, làm việc cùng với giảng viên và các nhóm nghiên cứu, khám phá và đóng góp vào lĩnh vực chuyên ngành của mình. Bên cạnh đó, các cuộc thi Olympic được tổ chức hàng năm là cơ hội để sinh viên thể hiện khả năng và tài năng của mình trong các lĩnh vực cụ thể. Ngoài ra, Khoa và Nhà trường tạo điều kiện để sinh viên tham gia các hoạt động cộng đồng như tổ chức các chương trình xã hội, tình nguyện, văn hóa và giáo dục cộng đồng, cùng với các hoạt động nhằm xây dựng tinh thần đoàn kết và tạo ra sân chơi vui tươi cho sinh viên. Sinh viên có thể tham gia các câu lạc bộ học tập, văn nghệ, thể thao trường học hoặc tham gia các cuộc thi về CNTT, cuộc thi văn nghệ, các giải thể thao được Khoa và Nhà trường thường xuyên tổ chức.</p>
                <a href="/nghien-cuu/sinh-vien-nckh" className="flex justify-end items-center text-[#C10629] font-bold hover:underline transition-all duration-500 ease-out gap-2">
                  NCKH sinh viên
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17631 0.178483C8.28881 0.0641944 8.44132 0 8.60032 0C8.75933 0 8.91184 0.0641944 9.02434 0.178483L13.8245 5.06085C13.9369 5.17528 14 5.33039 14 5.49212C14 5.65385 13.9369 5.80896 13.8245 5.9234L9.02434 10.8058C8.96941 10.8657 8.90317 10.9138 8.82956 10.9472C8.75596 10.9805 8.67651 10.9985 8.59594 10.9999C8.51538 11.0014 8.43535 10.9863 8.36064 10.9556C8.28592 10.9249 8.21805 10.8792 8.16108 10.8212C8.1041 10.7633 8.05918 10.6943 8.029 10.6183C7.99883 10.5423 7.98401 10.4609 7.98543 10.3789C7.98685 10.297 8.00448 10.2162 8.03728 10.1413C8.07007 10.0665 8.11736 9.99908 8.17631 9.94321L11.9525 6.10242H0.600023C0.440887 6.10242 0.288269 6.03812 0.175742 5.92366C0.0632164 5.80921 0 5.65398 0 5.49212C0 5.33026 0.0632164 5.17503 0.175742 5.06058C0.288269 4.94612 0.440887 4.88183 0.600023 4.88183H11.9525L8.17631 1.04103C8.06394 0.926603 8.00083 0.771487 8.00083 0.609758C8.00083 0.448029 8.06394 0.292913 8.17631 0.178483Z" fill="#C10629"/>
                  </svg>
                </a>
              </>
            )}
          </div>
        </div>

        <div className='w-[1300px] mx-auto mb-20 mt-20'>
          <HighlightHeader title="THÔNG BÁO" />
          <SeeAll link="/thong-bao" />
          <div className='flex flex-row space-x-10'>
            <ArticleMainPage title="Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy" time="01/01/2025 | 09:25:01AM" />
            <ArticleMainPage title="Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy" time="01/01/2025 | 09:25:01AM" />
            <ArticleMainPage title="Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy" time="01/01/2025 | 09:25:01AM" />
          </div>
        </div>

        <div className='w-[1300px] mx-auto mb-20'>
          <HighlightHeader title="TIN TỨC" />
          <SeeAll link="/tin-tuc" />
          <div className='flex flex-row space-x-10'>
            <ArticleMainPage title="Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy" time="01/01/2025 | 09:25:01AM" />
            <ArticleMainPage title="Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy" time="01/01/2025 | 09:25:01AM" />
            <ArticleMainPage title="Anh nói hơi bị nhiều so với một người không có bảo hiểm y tế đấy" time="01/01/2025 | 09:25:01AM" />
          </div>
        </div>

        <div className='w-[1300px] mx-auto mb-20'>
          <HighlightHeader title="ĐỐI TÁC" />
          <SeeAll link="/doanh-nghiep/danh-sach-doi-tac" />
          <PartnerImageSlider />
        </div>

        <Footer />
    </div>
  )
}

export default Main