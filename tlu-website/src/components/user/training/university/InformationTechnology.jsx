import React from 'react'
import NavBar from '../../../layouts/NavBar'
import Footer from '../../../layouts/Footer'
import SmallNavBar from '../../../layouts/SmallNavBar'
import Sidebar from '../../../layouts/Sidebar';

function InformationTechnology() {
  const sidebarData1 = [
    { label: "Ngành Công nghệ thông tin", link: "/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin", marker: true },
    { label: "Ngành Kỹ thuật phần mềm", link: "/dao-tao/dao-tao-dai-hoc/nganh-ky-thuat-phan-mem" },
    { label: "Ngành Hệ thống thông tin", link: "/dao-tao/dao-tao-dai-hoc/nganh-he-thong-thong-tin" },
    { label: "Ngành Trí tuệ nhân tạo", link: "/dao-tao/dao-tao-dai-hoc/nganh-tri-tue-nhan-tao" },
    { label: "Ngành An ninh mạng", link: "/dao-tao/dao-tao-dai-hoc/nganh-an-ninh-mang" },
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
      { label: "Ngành Công nghệ thông tin", href: "" },
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
              <h2 className="text-4xl font-bold text-[#060A52] mb-9">Ngành Công nghệ thông tin</h2>
              <p className='my-4'>Công nghệ thông tin là ngành đào tạo cử nhân có khả năng tạo ra tri thức và sản phẩm mới, đáp ứng nhu cầu phát triển kinh tế - xã hội, đảm bảo quốc phòng an ninh và hội nhập quốc tế. </p>
              <p>Cử nhân Công nghệ thông tin có khả năng phân tích, thiết kế, triển khai và điều hành các hoạt động công nghệ thông tin. Họ có thể thực hiện các công việc đa dạng như phân tích thiết kế hệ thống thông tin cho doanh nghiệp, lập trình xây dựng hệ thống phần mềm, áp dụng và phát triển thuật toán thông minh để xây dựng hệ thống thông tin thông minh, vận hành các hệ thống công nghệ thông tin, phát triển và chuyển giao công nghệ. </p>
              <p className='my-4 font-bold'>MỤC TIÊU ĐÀO TẠO </p>
              <ul className='my-4'>
                <p className='pb-2'>Sau khi tốt nghiệp ngành Công nghệ thông tin, sinh viên sẽ đạt được những yêu cầu sau: </p>
                <li>&bull;  <span className='font-semibold'>Kiến thức: </span>Có kiến thức cơ sở và chuyên môn sâu rộng, vững chắc; có khả năng phân tích, giải quyết vấn đề, nghiên cứu, thiết kế, sáng tạo trong lĩnh vực công nghệ thông tin.</li>
                <li>&bull;  <span className='font-semibold'>Kỹ năng: </span>Sử dụng thành thạo một số ngôn ngữ lập trình và các công cụ phần mềm hỗ trợ; có kỹ năng quản lý dự án, xác định và cụ thể hóa các giải pháp kỹ thuật, triển khai các quy trình phát triển phần mềm; có kỹ năng kiểm thử, bảo trì phần mềm, đánh giá chất lượng phần mềm, định giá các sản phẩm phần mềm.</li>
                <li>&bull;  <span className='font-semibold'>Phẩm chất đạo đức: </span>Có phẩm chất chính trị, đạo đức; kỹ năng giao tiếp, làm việc độc lập và theo nhóm đáp ứng yêu cầu của xã hội và hội nhập quốc tế.</li>
              </ul>
              <p className='my-4 font-bold'>SỰ NGHIỆP TƯƠNG LAI </p>
              <ul className='my-4'>
                <p className='pb-2'> Cử nhân tốt nghiệp ngành Công nghệ thông tin có thể làm các công việc: </p>
                <li>&bull;  Phân tích, thiết kế, lập trình, kiểm thử, vận hành và bảo trì các hệ thống phần mềm cho doanh nghiệp và xã hội.</li>
                <li>&bull;  Quản lý dự án phần mềm, đảm bảo chất lượng và hiệu quả của sản phẩm phần mềm.</li>
                <li>&bull;  Phát triển và chuyển giao công nghệ, áp dụng các thuật toán thông minh để xây dựng hệ thống phần mềm thông minh.</li>
                <li>&bull;  Nghiên cứu, giảng dạy trong lĩnh vực công nghệ thông tin tại các cơ sở đào tạo và viện nghiên cứu.</li>
              </ul>
              <a href="https://cse.tlu.edu.vn/Uploads/Images/DaoTao/B%E1%BA%A3n%20m%C3%B4%20t%E1%BA%A3%20CTDT%20ng%C3%A0nh%20CNTT-2022.pdf" className='text-[#C10629] font-bold hover:underline' target="_blank" rel="noopener noreferrer">Chi tiết xem tại đây 👈</a>
            </div>

            <div className='col-span-2 text-right text-[#192E58]'>
              <p class="font-bold border-b pb-2 mb-2 text-[14px]">Mã ngành: <span class="font-bold text-[#C10629] text-2xl">7480201</span></p>
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

export default InformationTechnology