import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function LecturerRecruitment() {
  const sidebarData = [
    { label: "Tuyển dụng sinh viên", link: "/tuyen-dung/tuyen-dung-sinh-vien" },
    { label: "Tuyển dụng giảng viên", link: "/tuyen-dung/tuyen-dung-giang-vien", marker: true },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Tuyển dụng", href: "" },
      { label: "Tuyển dụng giảng viên", href: "" },
    ],
  };

  return (
    <div>
      <NavBar />

      <div>
        <div className="px-55 mx-auto mb-10 mt-30">
          <SmallNavBar navigationLinks={sampleData.navigationLinks} />

          <div className="flex gap-x-30">
            <div>
              <Sidebar title="Tuyển dụng" items={sidebarData} />
            </div>

            <div>
                <p className='text-[#192E58] font-bold text-3xl pb-10'>Tuyển dụng giảng viên khoa CNTT năm 2025</p>
                <div className="space-y-3">
                    <p><b>Mô tả công việc</b></p>
                    <p>- <b>Nhiệm vụ giảng dạy:</b> Tham gia giảng dạy các học phần thuộc 1 trong các nhóm sau:</p>
                    <p>+ <b>Nhóm 1:</b> Lập trình C, C+, C#, Python, Java, Web, Mobile, CSDL, Hệ QTCSDL, Công nghệ phần mềm, Triển khai phần mềm</p>
                    <p>+ <b>Nhóm 2:</b> Cấu trúc dữ liệu và giải thuật, Toán rời rạc, AI và Học máy, Khai phá dữ liệu</p>
                    <p>+ <b>Nhóm 3:</b> Mạng máy tính, Hệ Điều hành, Kiến trúc máy tính, Cloud, An toàn bảo mật thông tin</p>
                    <p>- <b>Thực hiện nhiệm vụ nghiên cứu khoa học</b> theo quy định của nhà trường</p>
                    <p>- <b>Tham gia các hoạt động phát triển chuyên môn khác:</b> Xây dựng, chỉnh sửa đề cương học phần, cố vấn học tập, hướng dẫn sinh viên, coi thi, chấm thi, tham gia quảng bá tuyển sinh cho khoa,…</p>

                    <br />

                    <p><b>Yêu cầu công việc</b></p>
                    <p>- <b>Bằng cấp:</b> Tốt nghiệp Thạc sĩ trở lên các chuyên ngành Công nghệ thông tin, Khoa học máy tính, Kỹ thuật phần mềm, Hệ thống thông tin, Trí tuệ nhân tạo, Toán ứng dụng hoặc các chuyên ngành tương đương. Ưu tiên người tốt nghiệp ĐH, ThS, TS ở các nước tiên tiến.</p>
                    <p>- <b>Kinh nghiệm:</b></p>
                    <p>+ Ưu tiên ứng viên có kinh nghiệm giảng dạy đại học các môn trong các nhóm học phần trên.</p>
                    <p>+ Có kinh nghiệm làm việc thực chiến trong lĩnh vực về Công nghệ thông tin và Khoa học máy tính.</p>
                    <p>- <b>Kỹ năng:</b></p>
                    <p>+ Có khả năng ứng dụng công nghệ thông tin trong giảng dạy, nghiên cứu</p>
                    <p>+ Có khả năng đọc và nghiên cứu tài liệu bằng tiếng Anh. Có khả năng giao tiếp, giảng dạy bằng tiếng Anh là một lợi thế.</p>
                    <p>+ Có khả năng giao tiếp, kết nối tốt</p>
                    <p>+ Có định hướng phát triển lâu dài trong ngành giáo dục.</p>
                    <p>- <b>Kỹ năng khác:</b></p>
                    <p>+ Có phẩm chất đạo đức nghề nghiệp, có ý thức chấp hành pháp luật.</p>
                    <p>+ Tác phong sư phạm, trung thực, khả năng chịu áp lực công việc cao</p>
                    <p>+ Có khả năng sáng tạo và tư duy độc lập</p>

                    <br />

                    <p><b>Quyền lợi:</b></p>
                    <p>- Mức thu nhập cạnh tranh (theo năng lực và hiệu quả công việc)</p>
                    <p>- Gói thu nhập năm hấp dẫn theo cơ chế tập đoàn CMC và thưởng KPIs hàng năm ít nhất 01 tháng lương.</p>
                    <p>- Hỗ trợ các gói thưởng nghiên cứu, bài báo khoa học hàng năm đối với Giảng viên.</p>
                    <p>- Cơ hội tham gia các khóa đào tạo của Trường và Tập đoàn, hỗ trợ đào tạo về các chứng chỉ để nâng cao nghiệp vụ sư phạm, các lớp đào tạo phát triển nghiệp vụ chuyên môn.</p>
                    <p>- Cơ hội được tham gia đào tạo, học hỏi, hướng dẫn trực tiếp đối với Giảng viên tập sự/ít kinh nghiệm bởi các Giảng viên giàu kinh nghiệm.</p>
                    <p>- Thời gian làm việc linh hoạt đối với Giảng viên</p>
                    <p>- Các chế độ dành cho người lao động theo như quy định pháp luật hiện hành (BHXH, BHYT, BHTN…).</p>
                    <p>- Hưởng gói BHSK PJICO dành riêng cho CBNV, Giảng viên của Trường và khám sức khỏe định kì hàng năm.</p>
                    <p>- Nhận gói đãi ngộ lên tới 25tr/năm cho các dịp Lễ, Tết Dương lịch, Tết Âm lịch, sinh nhật Tập đoàn, 02/09, 08/03, 20/10, 20/11, hiếu hỉ, chăm sóc sức khỏe hàng năm,…</p>

                    <br />

                    <p><b>Nộp đơn đăng kí tại: <a href="https://www.vietnamworks.com/?utm_source_navi=header&utm_medium_navi=vnwlogo" className="underline hover:text-[#C10629] transition-all duration-500 ease-out" target="_blank">https://www.vietnamworks.com/?utm_source_navi=header&utm_medium_navi=vnwlogo</a></b></p>
                </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LecturerRecruitment;
