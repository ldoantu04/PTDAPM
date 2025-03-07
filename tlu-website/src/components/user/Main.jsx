import React, { useState } from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'
import ImageSlider from '../layouts/ImageSlider';

function Main() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className='w-full relative'>
        <NavBar />

        <ImageSlider />

        {/* Intro Card */}
        <div className='w-[1200px] h-auto mx-auto rounded-xl relative -mt-12 bg-white shadow-lg p-6 pb-10'>
          {/* Button chọn nội dung */}
          <div className='flex justify-center gap-15 mb-4'>
            <button
              className={`text-[#192E58] text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 ${
                activeTab === 'tab1' ? 'bg-gray-200' : 'bg-white'
              }`}
              onClick={() => setActiveTab('tab1')}
            >
              <img src="/assets/intro_card/icon-2.png" alt="" /> Môi trường giáo dục
            </button>
            <button
              className={`text-[#192E58] text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 ${
                activeTab === 'tab2' ? 'bg-gray-200' : 'bg-white'
              }`}
              onClick={() => setActiveTab('tab2')}
            >
              <img src="/assets/intro_card/icon-1.png" alt="" /> Chương trình đào tạo
            </button>
            <button
              className={`text-[#192E58] text-lg font-semibold px-8 py-3 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 ${
                activeTab === 'tab3' ? 'bg-gray-200' : 'bg-white'
              }`}
              onClick={() => setActiveTab('tab3')}
            >
              <img src="/assets/intro_card/icon.png" alt="" /> Hoạt động sinh viên
            </button>
          </div>

          {/* Hiển thị nội dung theo tab */}
          <div className='text-left text-md transition-all duration-500 ease-out px-10'>
            {activeTab === 'tab1' && <p>Trở thành sinh viên của khoa, các bạn có một môi trường giáo dục tốt: Có các phòng học, phòng thí nghiệm, và trang thiết bị tối ưu để hỗ trợ việc giảng dạy và nghiên cứu trong lĩnh vực Công nghệ thông tin; Có các giảng viên giàu kinh nghiệm, có trình độ chuyên môn cao và đam mê trong lĩnh vực Công nghệ thông tin. Các giảng viên cung cấp kiến thức mới nhất, hướng dẫn và hỗ trợ sinh viên trong quá trình học tập; Có chương trình học phong phú và đa dạng, bao gồm cả các môn học lý thuyết và thực hành. Chương trình đáp ứng nhu cầu của ngành Công nghệ thông tin và cập nhật với các xu hướng công nghệ mới; Tạo cơ hội cho sinh viên thực hành và thực tập trong các doanh nghiệp, tổ chức hoặc dự án thực tế; Khuyến khích sự sáng tạo và tư duy độc lập của sinh viên. Cung cấp các hoạt động ngoại khóa, dự án nghiên cứu, và sự hỗ trợ từ cộng đồng sinh viên và giảng viên để thúc đẩy sự phát triển cá nhân và tạo ra những ý tưởng mới; Có mối quan hệ chặt chẽ với các doanh nghiệp trong ngành Công nghệ thông tin, tạo cơ hội cho sinh viên tiếp cận với thực tế công việc, nhận được thông tin về xu hướng công nghệ.</p>}
            {activeTab === 'tab2' && <p>Chương trình đào tạo các ngành thuộc nhóm ngành CNTT của khoa có các đặc điểm sau: Có một nền tảng kiến thức rộng về các lĩnh vực liên quan đến Công nghệ thông tin, bao gồm các học phần cơ bản như lập trình, cơ sở dữ liệu, mạng máy tính, hệ điều hành, thuật toán, và công nghệ phần mềm; Có tính thực tiễn và ứng dụng, đảm bảo sinh viên được tiếp cận với các công nghệ và công cụ thực tế trong lĩnh vực Công nghệ thông tin. Thông qua các dự án thực hành, thực tập, và các hoạt động ngoại khóa, sinh viên có cơ hội áp dụng kiến thức vào thực tế, rèn kỹ năng thực hành và tìm hiểu về các xu hướng mới nhất trong ngành; Không chỉ trang bị kiến thức cơ bản và lý thuyết, mà chương trình còn giúp sinh viên có cơ hội áp dụng những kiến thức đó vào các dự án thực tế và bài tập thực hành; Và có mối liên kết mạnh mẽ với doanh nghiệp và ngành nghề.</p>}
            {activeTab === 'tab3' && <p>Hoạt động sinh viên đóng vai trò quan trọng trong việc phát triển và làm giàu cho trải nghiệm học tập của các sinh viên. Các hoạt động này không chỉ giúp các sinh viên rèn luyện kỹ năng cá nhân, mở rộng kiến thức, mà còn tạo ra những cơ hội giao lưu, hợp tác và xây dựng mạng lưới quan hệ trong cộng đồng sinh viên và xã hội. Đối với hoạt động NCKH, sinh viên có thể tham gia vào các dự án nghiên cứu, làm việc cùng với giảng viên và các nhóm nghiên cứu, khám phá và đóng góp vào lĩnh vực chuyên ngành của mình. Bên cạnh đó, các cuộc thi Olympic được tổ chức hàng năm là cơ hội để sinh viên thể hiện khả năng và tài năng của mình trong các lĩnh vực cụ thể. Ngoài ra, Khoa và Nhà trường tạo điều kiện để sinh viên tham gia các hoạt động cộng đồng như tổ chức các chương trình xã hội, tình nguyện, văn hóa và giáo dục cộng đồng, cùng với các hoạt động nhằm xây dựng tinh thần đoàn kết và tạo ra sân chơi vui tươi cho sinh viên. Sinh viên có thể tham gia các câu lạc bộ học tập, văn nghệ, thể thao trường học hoặc tham gia các cuộc thi về CNTT, cuộc thi văn nghệ, các giải thể thao được Khoa và Nhà trường thường xuyên tổ chức.</p>}
          </div>
        </div>

        

        <Footer />
    </div>
  )
}

export default Main