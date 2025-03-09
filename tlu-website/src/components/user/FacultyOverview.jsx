import React from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'
import SmallNavBar from '../layouts/SmallNavBar'

const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Giới thiệu", href: "" },
      { label: "Tổng quan về khoa", href: "" },
    ],
  };

function FacultyOverview() {
  return (
    <div className='w-full relative'>
        <NavBar />

        <div className='mt-[120px]'>
            <div className='mx-44'>
                <SmallNavBar navigationLinks={ sampleData.navigationLinks } />
            </div>

            <div className="flex justify-between mx-50 gap-x-30 mt-10">
                <div className="w-1/3">
                    <p className="inline-block text-3xl font-bold border-b-3 border-red-500">
                        Tổng quan về khoa
                    </p>
                </div>

                <div className="w-1/3">
                    <p className='text-[#736D6D]'>
                        Khoa Công nghệ thông tin (CNTT) được thành lập ngày 19/11/2001 từ việc sáp nhập Trung tâm tin học và Bộ môn Toán học của trường. Mục tiêu là đào tạo, cung cấp đội ngũ kỹ sư công nghệ thông tin đáp ứng các yêu cầu xã hội.
                    </p>
                </div>

                <div className="w-1/3">
                    <p className='text-[#736D6D]'>
                        Kể từ khi thành lập, Khoa CNTT đã không ngừng phát triển, trưởng thành. Các kết quả này được thể hiện như quy mô đào tạo, hợp tác doanh nghiệp và quốc tế, nghiên cứu khoa học, đội ngũ giảng viên. Mục tiêu của chúng tôi là nơi đào tạo nhóm ngành CNTT uy tín trong nước và khu vực.
                    </p>
                </div>
            </div>

            <div className='bg-[#122A58] w-full'>
                <div className='mx-50 mt-[100px] flex justify-between text-white gap-30'>
                    <div className='w-1/3  flex flex-col py-15 gap-y-5'>
                        <div>
                            <p className='font-bold'>Triết lý đào tạo</p>
                        </div>
                        <div>
                            <p>
                                Trên tinh thần lấy sinh viên và giảng viên làm trung tâm của quá trình phát triển
                            </p>
                        </div>
                    </div>

                    <div className='w-1/3  flex flex-col py-15 gap-y-5'>
                        <div>
                            <p className='font-bold'>Nguyên tắc đào tạo</p>
                        </div>
                        <div>
                            <p>
                                Nơi đào tạo uy tín với nền tảng cốt lõi về CNTT, phát triển phần mềm, hệ thống thông tin, trí tuệ nhân tạo và quản trị an ninh mạng
                            </p>
                        </div>
                    </div>

                    <div className='w-1/3  flex flex-col py-15 gap-y-5'>
                        <div>
                            <p className='font-bold'>Tiềm năng phát triển</p>
                        </div>
                        <div>
                            <p>
                                Khoa luôn mở rộng quy mô tuyển sinh cho cả đại học, sau đại học với trên 450 chỉ tiêu năm 2023 và tăng dần theo mỗi năm
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full mt-[50px]'>
                <div className='mx-50 flex flex-row items-center gap-20'>
                    <div className='w-2/5 flex flex-col gap-y-10 mx-10'>
                        <div>
                            <p className='font-bold text-4xl'>Về đội ngũ</p>
                        </div>
                        <div>
                            <p>Khoa có 06 giảng viên là Phó giáo sư, 36 giảng viên có học vị Tiến sĩ (TS), 27 giảng viên có trình độ Thạc sĩ, trong đó có nhiều giảng viên đang học nghiên cứu sinh. Phần lớn các Tiến sỹ của Khoa đều tu nghiệp tại nước ngoài có nền khoa học tiên tiến về CNTT.</p>
                            <br></br>
                            <p>Kính mời các quý vị truy cập và khám phá trang web của Khoa chúng tôi, tìm hiểu các chương trình đào tạo đại học và sau đại học, các thành tựu và hoạt động nghiên cứu của Khoa CNTT, trường Đại học Thủy lợi.</p>
                        </div>
                    </div>

                    <div className='w-3/5'>
                        <img src="/assets/faculty_overview/gv_1.png" alt="" />
                    </div>
                </div>

                <div className='mx-50 mt-[50px] flex flex-row items-center'>
                    <div className='w-3/5'>
                        <img src="/assets/faculty_overview/gv_2.png" alt="" />
                    </div>

                    <div className='w-2/5 flex flex-col gap-y-10'>
                        <div>
                            <p className='font-bold text-4xl'>Về đào tạo</p>
                        </div>
                        <div>
                            <p>
                                Hiện nay, khoa có 5 ngành đào tạo đại học (An ninh mạng, Công nghệ thông tin, Hệ thống thông tin, Kỹ thuật phần mềm, Trí tuệ nhân tạo và khoa học dữ liệu, ngành CNTT chất lượng cao - định hướng trí tuệ nhân tạo ứng dụng), ngành CNTT trình độ thạc sỹ, Tiến sĩ với hơn 4000 sinh viên, học viên cao học và nghiên cứu sinh. Các chương trình đào tạo được cập nhật thường xuyên để đáp ứng với nhu cầu thực tiễn của xã hội và quốc tế.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='mx-50 mt-[50px] flex flex-row items-center gap-20 mb-[50px]'>
                    <div className='w-2/5 flex flex-col gap-y-10 mx-10'>
                        <div>
                            <p className='font-bold text-4xl'>Về NCKH và hợp tác quốc tế</p>
                        </div>
                        <div>
                            <p>
                                Khoa đạt được nhiều thành tích cao, các giảng viên của khoa đã công bố hàng trăm bài báo khoa học, với nhiều công bố quốc tế thuộc danh mục SCI/SCIE. Các thầy cô trong Khoa chủ nhiệm và tham gia trên 10 đề tài cấp nhà nước, Nafosted, hàng chục đề tài nghiên cứu khoa học cấp Bộ và cấp cơ sở. Khoa đã có các hợp tác nghiên cứu, trao đổi sinh viên, giảng viên với nhiều trường quốc tế như các trường Đại học ở Mỹ (Delta University, Arkansas University, Colorado State University), Pháp (Paris 6, IRD, UMMISCO), Trung Quốc (ĐH Thâm Quyến, Viện công nghệ tiên tiến Thâm Quyến, ĐH Khoa học và công nghệ phương Nam), Nhật (JAIST, Nara Women's University), Úc (Griffith University, Deakin University, Monash University)
                            </p>
                        </div>
                    </div>

                    <div className='w-3/5'>
                        <img src="/assets/faculty_overview/gv_3.png" alt="" />
                    </div>
                </div>
            </div>

            <div className='bg-[#122A58] w-full flex items-center justify-between py-30 px-60'>
                <div className='w-1/2 flex justify-center'>
                    <img src="/assets/faculty_overview/cocautochuc.png" alt="" />
                </div>

                <div className='w-fit text-white font-bold text-3xl'>
                    <p>Cơ cấu tổ chức của khoa</p>
                    <p>Công nghệ thông tin - ĐH Thủy Lợi</p>
                </div>
            </div>

            <div className='bg-white w-full flex flex-col items-center justify-center py-30 px-60 space-y-25'>
                <div className='w-1/2 text-[#122A58] font-bold text-5xl flex justify-center'>
                    <p>Ban chủ nhiệm khoa</p>
                </div>

                <div className='w-fit text-white text-3xl flex flex-row space-x-30'>
                    <div className='flex flex-col items-center justify-center'>
                        <img src="/assets/faculty_overview/thayLeVanHung.png" alt="" className='rounded-xl' />
                        <div className='flex flex-col items-center justify-center pt-5 space-y-1'>
                            <p className='text-[#122A58] font-bold text-base'>PGS.TS Lê Văn Hưng</p>
                            <p className='text-[#737373] font-base text-base'>Trưởng khoa</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <img src="/assets/faculty_overview/thayTaQuangChieu.png" alt="" className='rounded-xl' />
                        <div className='flex flex-col items-center justify-center pt-5 space-y-1'>
                            <p className='text-[#122A58] font-bold text-base'>TS. Tạ Quang Chiểu</p>
                            <p className='text-[#737373] font-base text-base'>Phó trưởng khoa</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <img src="/assets/faculty_overview/thayDoLan.png" alt="" className='rounded-xl' />
                        <div className='flex flex-col items-center justify-center pt-5 space-y-1'>
                            <p className='text-[#122A58] font-bold text-base'>PGS.TS Đỗ Lân</p>
                            <p className='text-[#737373] font-base text-base'>Phó trưởng khoa</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-end px-47'>
                    <a href="/gioi-thieu/doi-ngu-nhan-su" className="flex justify-end items-center text-[#C10629] text-xl font-bold hover:underline transition-all duration-500 ease-out gap-2">
                    Đội ngũ nhân sự
                    <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.17631 0.178483C8.28881 0.0641944 8.44132 0 8.60032 0C8.75933 0 8.91184 0.0641944 9.02434 0.178483L13.8245 5.06085C13.9369 5.17528 14 5.33039 14 5.49212C14 5.65385 13.9369 5.80896 13.8245 5.9234L9.02434 10.8058C8.96941 10.8657 8.90317 10.9138 8.82956 10.9472C8.75596 10.9805 8.67651 10.9985 8.59594 10.9999C8.51538 11.0014 8.43535 10.9863 8.36064 10.9556C8.28592 10.9249 8.21805 10.8792 8.16108 10.8212C8.1041 10.7633 8.05918 10.6943 8.029 10.6183C7.99883 10.5423 7.98401 10.4609 7.98543 10.3789C7.98685 10.297 8.00448 10.2162 8.03728 10.1413C8.07007 10.0665 8.11736 9.99908 8.17631 9.94321L11.9525 6.10242H0.600023C0.440887 6.10242 0.288269 6.03812 0.175742 5.92366C0.0632164 5.80921 0 5.65398 0 5.49212C0 5.33026 0.0632164 5.17503 0.175742 5.06058C0.288269 4.94612 0.440887 4.88183 0.600023 4.88183H11.9525L8.17631 1.04103C8.06394 0.926603 8.00083 0.771487 8.00083 0.609758C8.00083 0.448029 8.06394 0.292913 8.17631 0.178483Z" fill="#C10629"/>
                    </svg>
                    </a>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default FacultyOverview