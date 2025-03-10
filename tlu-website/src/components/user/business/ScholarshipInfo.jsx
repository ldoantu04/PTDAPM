import React from 'react'
import NavBar from '../../layouts/NavBar'
import Footer from '../../layouts/Footer'
import SmallNavBar from '../../layouts/SmallNavBar'
import Sidebar from '../../layouts/Sidebar'

function AdmissionPost() {
    const sidebarData = [
        { label: "Danh sách đối tác", link: "/doanh-nghiep/danh-sach-doi-tac" },
        { label: "Chương trình hợp tác", link: "/doanh-nghiep/chuong-trinh-hop-tac" },
        { label: "Học bổng doanh nghiệp", link: "/doanh-nghiep/hoc-bong-doanh-nghiep", marker: true },
      ];
    
      const sampleData = {
        navigationLinks: [
          { label: "Trang chủ", href: "/" },
          { label: "Doanh nghiệp", href: "" },
          { label: "Học bổng doanh nghiệp", href: "/doanh-nghiep/hoc-bong-doanh-nghiep" },
          { label: "Chi tiết học bổng", href: "" },
        ],
      };

    return (
        <div>
            <NavBar />

            <div className='mt-[120px] px-55'>
                <SmallNavBar navigationLinks={ sampleData.navigationLinks }  />

                <div className='flex flex-row gap-15'>
                    <div>
                        <Sidebar title="Doanh nghiệp" items={ sidebarData } />
                    </div>

                    <div className='pb-20'>
                        <p className='text-[#192E58] font-bold text-3xl'>[VINASA] Thư mời tham gia VietFuture Award 2023</p>
                        <div className='space-y-5'>
                            <p className='pt-10'>Thân gửi các em sinh viên,</p>

                            <p>Khoa gửi đến các em thông tin từ Hiệp hội Phần mềm và Dịch vụ CNTT Việt Nam (VINASA) - một tổ chức uy tín nhiều năm kinh nghiệm trong lĩnh vực CNTT như sau:</p>

                            <p>Nhằm đồng hành cùng Chính phủ, Bộ Giáo dục và Đào tạo, Bộ Khoa học & Công nghệ, theo tinh thần của Quyết định số 1665/QĐ-Ttg ngày 30/06/2017 của Thủ tướng chính phủ về việc “Hỗ trợ học sinh, sinh viên khởi nghiệp đến năm 2025” và Quyết định 569/QĐ-Ttg ngày 11/05/2022 của Thủ tướng chính phủ về Chiến lược phát triển khoa học, công nghệ và đổi mới sáng tạo đến năm 2030; Với mong muốn thúc đẩy hợp tác giữa các doanh nghiệp và nhà trường trong khởi nghiệp đổi mới sáng tạo tại các trường đại học, VINASA tổ chức Giải thưởng <b>Sáng tạo tương lai – VietFuture Award</b>.</p>

                            <p><b>Giải thưởng Sáng tạo tương lai</b> là giải thưởng thường niên do VINASA tổ chức từ năm 2023, dành cho các dự án khởi nghiệp đổi mới sáng tạo của sinh viên các trường đại học, cao đẳng trên cả nước và các dự án theo đặt hàng từ doanh nghiệp. Giải thưởng sẽ là nơi kết nối hợp tác giữa các trường đại học và doanh nghiệp trong lĩnh vực khởi nghiệp đổi mới sáng tạo và nghiên cứu và phát triển, kết nối thương mại hoá các đề tài nghiên cứu và tuyển dụng, kết nối hợp tác giữa các trường đại học trong nước và quốc tế.</p>

                            <p><b>Giải thưởng sẽ được tổ chức 2 vòng:</b> Sơ tuyển tại các trường và Vòng Chung tuyển toàn quốc với các hoạt động thuyết trình, triển lãm, demo dự án trực tiếp, kết nối hợp tác, tuyển dụng thực hiện ngay tại địa điểm Vòng Chung tuyển toàn quốc của Giải thưởng. Năm 2023 Vòng Chung tuyển sẽ được tổ chức tại Tỉnh Thừa Thiên Huế trong khuôn khổ Tuần Chuyển đổi số Huế 2023 vào 27-28/10/2023.</p>

                            <p><b>Tham gia Giải thưởng VietFuture 2023, sinh viên sẽ có quyền lợi:</b></p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Được nhận Giấy chứng nhận Giải thưởng trong buổi Lễ chung kết và trao Giải thưởng Sáng tạo tương lai</li>
                                <li>Có các cơ hội được đầu tư dự án hoặc cơ hội việc làm tại các doanh nghiệp</li>
                                <li>Dự án xuất sắc có cơ hội được lựa chọn đi tham gia Giải thưởng APICTA tại Hong Kong vào tháng 12/2023</li>
                                <li>Được tham gia triển lãm và giới thiệu thiệu sản phẩm miễn phí tại Chung kết cuộc thi</li>
                                <li>Được công bố sản phẩm/ giải pháp đạt giải tại website của cuộc thi</li>
                                <li>Được hỗ trợ kết nối giới thiệu sản phẩm/ giải pháp tới các doanh nghiệp quan tâm, đầu tư</li>
                                <li>Được giới thiệu với các chuyên gia, quỹ đầu tư, nhà đầu tư để tiếp tục hoàn thiện dự án triển khai thực tế.</li>
                            </ul>

                            <p><b>Các em quan tâm tham dự xem chi tiết tại link: <a href="https://info.vinasa.org.vn/vietfutureaward2023" className='underline hover:text-[#C10629] transition-all duration-500 ease-out'>https://info.vinasa.org.vn/vietfutureaward2023</a></b></p>

                            <p><b>Và đăng ký dự án sẽ thực hiện về VPK trước ngày 05/10/2023</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AdmissionPost