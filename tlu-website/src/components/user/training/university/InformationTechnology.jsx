import React from 'react'
import NavBar from '../../../layouts/NavBar'
import Footer from '../../../layouts/Footer'
import SmallNavBar from '../../../layouts/SmallNavBar'
import Sidebar from '../../../layouts/Sidebar';

function InformationTechnology() {
  const sidebarData1 = [
    { label: "Ngành Công nghệ thông tin", link: "", marker: true },
    { label: "Ngành Kỹ thuật phần mềm", link: "" },
    { label: "Ngành Hệ thống thông tin", link: "" },
    { label: "Ngành Trí tuệ nhân tạo", link: "" },
    { label: "Ngành An ninh mạng", link: "" },
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
        <div className='px-55 mx-auto mb-10 mt-30'>
          <SmallNavBar navigationLinks={sampleData.navigationLinks} />
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-4'>
              <Sidebar title='Đào tạo Đại học' items={sidebarData1} />
              <Sidebar title='Đào tạo Sau đại học' items={sidebarData2} />
            </div>
            <div className='col-span-6'>
              <h2 className="text-4xl font-bold text-[#060A52] mb-9">Ngành Công nghệ thông tin</h2>
              <p className='my-4'>Công nghệ thông tin là ngành đào tạo các kỹ sư – cử nhân đảm nhận nhiệm vụ xây dựng và duy trì hệ thống công nghệ thông tin cho các tổ chức, doanh nghiệp, cơ quan chính phủ v.v. </p>
              <p>Cử nhân công nghệ thông tin có khả năng thiết kế, triển khai và duy trì các hạ tầng công nghệ thông tin cho tổ chức hoặc doanh nghiệp. Nhiệm vụ quan trọng của họ là cài đặt mạng máy tính, đảm bảo an toàn và ổn định hoạt động của mạng. Họ cũng có khả năng lựa chọn và triển khai các giải pháp hệ thống, bao gồm việc lập trình, mua sắm và tích hợp các thành phần hệ thống. </p>
              <p className='my-4 font-bold'>MỤC TIÊU ĐÀO TẠO </p>
              <ul className='my-4'>
                <p>Sau khi tốt nghiệp ngành Khoa học máy tính, sinh viên sẽ đạt được những yêu cầu sau: </p>
                <li>&bull;  Đào tạo các cử nhân có kiến thức rộng và cập nhật về công nghệ thông tin, bao gồm phần cứng, phần mềm, quản lý dự án CNTT. Có khả năng giải quyết vấn đề và chọn lựa giải pháp công nghệ.</li>
                <li>&bull;  Cử nhân CNTT là người có năng lực làm việc với các đối tượng khác nhau trong tổ chức, có kỹ năng giao tiếp và thuyết phục, để thực hiện thành công các dự án</li>
                <li>&bull;  Cử nhân CNTT cần nắm vững một số ngôn ngữ lập trình và khả năng xây dựng phần mềm để phục vụ các yêu cầu cụ thể của công việc.</li>
              </ul>
              <p className='my-4 font-bold'>SỰ NGHIỆP TƯƠNG LAI </p>
              <ul className='my-4'>
                <p> Cử nhân tốt nghiệp ngành Công nghệ thông tin có thể làm các công việc: </p>
                <li>&bull;  Phân tích, thiết kế và cài đặt các hệ thống công nghệ thông tin (mạng máy tính, phần cứng, phần mềm, dịch vụ) cho một tổ chức. </li>
                <li>&bull;  Quản lý hệ thống thông tin. Duy trì sự làm việc an toàn và hiệu quả của hệ thống. Chuyên viên cấp cao về Công nghệ thông tin, giám đốc công nghệ (CTO) của tổ chức. </li>
                <li>&bull;  Lập trình, đảm bảo an ninh mạng, quản lý dự án Công nghệ thông tin. </li>
              </ul>
              <p className='text-[#C10629] font-bold'>Chi tiết xem tại đây 👈</p>
            </div>
              <div className='col-span-2 text-right text-[#192E58]'>
              <p class="border-b-3 pb-2 mb-2"><strong>Mã ngành:</strong> <span class="font-bold text-2xl text-[#C10629]">7480201</span></p>
                <p className='my-5'><strong>Thời gian học: 4 năm</strong></p>
                <p><strong>Tổ hợp môn thi: A00, A01</strong></p>
              </div>
          </div>
        </div>
      </div>
      <Footer />
      
    </div>
  )
}

export default InformationTechnology