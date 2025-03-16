import React from 'react'
import NavBar from '../../../layouts/NavBar'
import Footer from '../../../layouts/Footer'
import SmallNavBar from '../../../layouts/SmallNavBar'
import Sidebar from '../../../layouts/Sidebar';

function NetworkSecurity() {
  const sidebarData1 = [
    { label: "Ngành Công nghệ thông tin", link: "/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin" },
    { label: "Ngành Kỹ thuật phần mềm", link: "/dao-tao/dao-tao-dai-hoc/nganh-ky-thuat-phan-mem"},
    { label: "Ngành Hệ thống thông tin", link: "/dao-tao/dao-tao-dai-hoc/nganh-he-thong-thong-tin" },
    { label: "Ngành Trí tuệ nhân tạo", link: "/dao-tao/dao-tao-dai-hoc/nganh-tri-tue-nhan-tao" },
    { label: "Ngành An ninh mạng", link: "/dao-tao/dao-tao-dai-hoc/nganh-an-ninh-mang", marker: true },
  ];
  const sidebarData2 = [
    { label: "Chương trình Thạc sĩ", link: "" },
    { label: "Chương trình Tiến sĩ", link: "" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Đào tạo", href: "" },
      { label: "Đào tạo Đại học", href: "" },
      { label: "Ngành An ninh mạng", href: "" },
    ],
  };
  return (
    <div>
      <NavBar />
      <div>
        <div className='w-[92.5rem] px-5 mx-auto mb-10 mt-30'>
          <SmallNavBar navigationLinks={sampleData.navigationLinks} />
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-4'>
              <Sidebar title='Đào tạo Đại học' items={sidebarData1} />
              <Sidebar title='Đào tạo Sau đại học' items={sidebarData2} />
            </div>
            <div className='col-span-6'>
              <h2 className="text-4xl font-bold text-[#060A52] mb-9">Ngành An ninh mạng</h2>
              <p className='my-4'>An ninh mạng là ngành đào tạo cử nhân có phẩm chất chính trị, tư tưởng và thái độ sống đúng mực. Sinh viên theo học ngành này được trang bị nền tảng kiến thức chuyên môn vững vàng về an ninh mạng, cùng khả năng nghiên cứu và học tập suốt đời.</p>
              <p>Cử nhân An ninh mạng có kỹ năng thực hành chuyên sâu, có thể phân tích, đánh giá, xây dựng và bảo vệ các hệ thống thông tin. Họ cũng được trang bị các kỹ năng xã hội cần thiết để đáp ứng yêu cầu trong lĩnh vực xây dựng, bảo vệ và phát triển đất nước trong thời kỳ hội nhập quốc tế.</p>
              <p className='my-4 font-bold'>MỤC TIÊU ĐÀO TẠO </p>
              <ul className='my-4'>
                <p className='pb-2'>Sau khi tốt nghiệp ngành An ninh mạng, sinh viên sẽ đạt được những yêu cầu sau:</p>
                <li>&bull;  <span className='font-semibold'>Kiến thức: </span>Có kiến thức cơ sở và chuyên môn sâu rộng, vững chắc; có khả năng phân tích, giải quyết vấn đề, nghiên cứu, thiết kế, sáng tạo trong lĩnh vực an ninh mạng.</li>
                <li>&bull;  <span className='font-semibold'>Kỹ năng: </span>Sử dụng thành thạo một số ngôn ngữ lập trình và các công cụ phần mềm hỗ trợ; có kỹ năng quản lý dự án, xác định và cụ thể hóa các giải pháp kỹ thuật, triển khai các quy trình phát triển hệ thống an ninh mạng; có kỹ năng kiểm thử, bảo trì phần mềm, đánh giá chất lượng phần mềm, định giá các sản phẩm phần mềm.</li>
                <li>&bull;  <span className='font-semibold'>Phẩm chất đạo đức: </span>Có phẩm chất chính trị, đạo đức; kỹ năng giao tiếp, làm việc độc lập và theo nhóm đáp ứng yêu cầu của xã hội và hội nhập quốc tế.</li>
              </ul>
              <p className='my-4 font-bold'>SỰ NGHIỆP TƯƠNG LAI </p>
              <ul className='my-4'>
                <p className='pb-2'>Cử nhân tốt nghiệp ngành An ninh mạng có thể làm các công việc:</p>
                <li>&bull;  Phân tích, thiết kế, lập trình, kiểm thử, vận hành và bảo trì các hệ thống an ninh mạng cho doanh nghiệp và xã hội.</li>
                <li>&bull;  Quản lý dự án an ninh mạng, đảm bảo chất lượng và hiệu quả của sản phẩm.</li>
                <li>&bull;  Phát triển và chuyển giao công nghệ, áp dụng các thuật toán thông minh để xây dựng hệ thống an ninh mạng.</li>
                <li>&bull;  Nghiên cứu, giảng dạy trong lĩnh vực an ninh mạng tại các cơ sở đào tạo và viện nghiên cứu.</li>
              </ul>
              <a href="https://cse.tlu.edu.vn/Uploads/Images/DaoTao/B%E1%BA%A3n%20m%C3%B4%20t%E1%BA%A3%20CTDT%20ng%C3%A0nh%20ANM-2022.pdf" className='text-[#C10629] font-bold hover:underline' target="_blank" rel="noopener noreferrer">Chi tiết xem tại đây 👈</a>
            </div>

            <div className='col-span-2 text-right text-[#192E58]'>
              <p class="font-bold border-b pb-2 mb-2 text-[14px]">Mã ngành: <span class="font-bold text-[#C10629] text-2xl"></span></p>
              <p className='font-bold my-5 text-[14px]'>Thời gian học: <span class="font-extrabold">4 năm</span></p>
              <p className='font-bold text-[14px]'>Tổ hợp môn thi: A00, A01, <p>D01, D07</p></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
    </div>
  )
}

export default NetworkSecurity