import React from 'react'
import NavBar from '../../layouts/NavBar'
import Footer from '../../layouts/Footer'
import SmallNavBar from '../../layouts/SmallNavBar'
import Sidebar from '../../layouts/Sidebar'

function AdmissionPost() {
    const sidebarData = [
        "Tuyển sinh Đại học",
        "Tuyển sinh Thạc sĩ",
        "Tuyển sinh Tiến sĩ",
      ];
    
      const sampleData = {
        navigationLinks: [
          { label: "Trang chủ", href: "/" },
          { label: "Tuyển sinh", href: "/tuyen-sinh" },
          { label: "Sinh viên ngành Công nghệ sinh học ...", href: "" },
        ],
      };

    return (
        <div>
            <NavBar />

            <div className='mt-[120px] px-55'>
                <SmallNavBar navigationLinks={ sampleData.navigationLinks }  />

                <div className='flex flex-row gap-15'>
                    <div>
                        <Sidebar title="Tuyển sinh" items={ sidebarData } />
                    </div>

                    <div className='pb-20'>
                        <p className='text-[#192E58] font-bold text-3xl'>Sinh viên ngành Công nghệ sinh học – Trường Đại học Thủy Lợi tham quan, thực tập tại Tập đoàn Đức Hạnh Marphavet BMG</p>
                        <p className='text-[#000000] opacity-60 text-sm pt-3'>01/01/2025 | 09:25:01 AM</p>
                        <div className='space-y-10'>
                            <p className='text-base pt-10'>Nhằm nâng cao kiến thức thực tế và kỹ năng nghề nghiệp cho sinh viên, Khoa Hóa và Môi trường - Trường Đại học Thủy lợi đã tổ chức chương trình tham quan, thực tập chuyên ngành dành cho sinh viên ngành Công nghệ sinh học tại Tập đoàn Đức Hạnh Marphavet BMG từ ngày 22/02/2025.</p>
                            <img src="/assets/admisson_post/image_1.png" alt="" className='mx-auto' />
                            <p className='text-base'>Tập đoàn Đức Hạnh Marphavet BMG là một trong những doanh nghiệp hàng đầu tại Việt Nam trong lĩnh vực sản xuất và phân phối thuốc thú y, chế phẩm sinh học và vaccine dùng trong chăn nuôi. Tập đoàn có 12 công ty thành viên, với hệ thống dây chuyền hiện đại đạt tiêu chuẩn GMP-WHO và đội ngũ chuyên gia giàu kinh nghiệm, Tập đoàn Đức Hạnh Marphavet BMG không chỉ tạo ra những sản phẩm chất lượng mà còn là môi trường học tập lý tưởng cho sinh viên ngành Công nghệ sinh học, chăn nuôi, thú y, kinh tế, quản trị kinh doanh.</p>
                            <img src="/assets/admisson_post/image_2.png" alt="" className='mx-auto' />
                            <p className='text-base'>Trong chương trình tham quan-thực tập, sinh viên ngành Công nghệ sinh học đã được giới thiệu về quy trình nghiên cứu, sản xuất vaccine, thuốc thú y và chế phẩm sinh học từ khâu nuôi cấy vi sinh vật, chiết tách, tinh chế đến kiểm nghiệm chất lượng sản phẩm. Đặc biệt, các bạn sinh viên đã có cơ hội trực tiếp quan sát các các dây chuyền công nghệ hiện đại trong sản xuất, cũng như tham gia giao lưu, đặt câu hỏi với các chuyên gia đầu ngành. Đồng thời, sinh viên được giám đốc sản xuất, giám đốc kinh doanh và bộ phận nhân sự chia sẻ về cơ hội nghề nghiệp trong lĩnh vực Công nghệ sinh học ứng dụng trong dược phẩm thú y, thông tin về nhu cầu tuyển dụng, các tiêu chí đánh giá ứng viên cũng như các chương trình thực tập và thực tập hưởng lương tại Tập đoàn.</p>
                            <img src="/assets/admisson_post/image_3.png" alt="" className='mx-auto' />
                            <p className='text-base border-b-2 border-[#D9D9D9] pb-10'>Đây là một trong những hoạt động thiết thực nhằm gắn kết lý thuyết với thực tiễn, giúp sinh viên có cái nhìn tổng quan và thực tế về vị trí việc làm của ngành công nghệ sinh học sau khi ra trường. Buổi tham quan thực tập không chỉ giúp sinh viên củng cố kiến thức, định hướng nghề nghiệp mà còn truyền động lực, niềm đam mê nghiên cứu và phát triển trong lĩnh vực Công nghệ sinh học, chuẩn bị kinh nghiệm thực tiễn trước khi tốt nghiệp.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AdmissionPost