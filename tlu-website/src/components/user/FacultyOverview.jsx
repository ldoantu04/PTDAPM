import React from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'

function FacultyOverview() {
  return (
    <div className='w-full relative'>
        <NavBar />

        <div className='mt-[200px] flex justify-between mx-50'>
            <div className='border-b-3 border-red-500'>
                <p className='text-3xl font-bold'>Tổng quan về khoa</p>
            </div>

            <div>
                <p>
                Khoa Công nghệ thông tin (CNTT) được thành lập ngày 19/11/2001 từ việc sáp nhập Trung tâm tin học và Bộ môn Toán học của trường. Mục tiêu là đào tạo, cung cấp đội ngũ kỹ sư công nghệ thông tin đáp ứng các yêu cầu xã hội
                </p>
            </div>

            <div>
                <p>
                Kể từ khi thành lập, Khoa CNTT đã không ngừng phát triển, trưởng thành. Các kết quả này được thể hiện như quy môn đào tạo, hợp tác doanh nghiệp và quốc tế, nghiên cứu khoa học, đội ngũ giảng viên. Mục tiêu của chúng tôi là nơi đào tạo nhóm ngành CNTT uy tín trong nước và khu vực.
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

        <Footer />
    </div>
  )
}

export default FacultyOverview