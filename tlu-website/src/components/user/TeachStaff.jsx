import React from 'react';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';
import HighlightHeader from '../layouts/HighlightHeader';
import SmallNavBar from '../layouts/SmallNavBar';

const sampleData = {
  navigationLinks: [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "" },
    { label: "Đội ngũ nhân sự", href: "" },
  ],
};

function TeachStaff() {
  return (
    <div className="w-full relative">
      <NavBar />

      <div className='mt-[120px]'>
        <div className='mx-50'>
          <SmallNavBar navigationLinks={sampleData.navigationLinks} />
        </div>
        <div>
          <div className=''>
            <div className="container mb-10 flex flex-col md:flex-row gap-50 pl-25 pr-10">
              {/* Đội ngũ nhân sự */}
              <div className="md:w-2/3 md:ml-[120px]">
                <HighlightHeader title="ĐỘI NGŨ NHÂN SỰ" />
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="mb-[50px] bg-gray-50 rounded-lg shadow"
                    style={{
                      backgroundImage: "url('/assets/lecturer_list/background.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3 overflow-hidden">
                        <img 
                          src="/assets/lecturer_list/avatar.jpg" 
                          alt="Lecturer" 
                          className="w-full h-full object-cover hover:scale-125 hover:opacity-85 transition ease-in-out"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <p className="font-normal text-[20px] text-[#E82323] mt-[32px]">Trưởng khoa</p>
                        <p className="font-bold text-[24px] text-black hover:text-[#35c56c] transition-colors mt-[15px]">Name</p>
                        <p className="font-normal text-[16px] mt-[15px]">Bộ môn Công nghệ phần mềm</p>
                        <div className='font-normal text-[16px] flex items-center gap-2 mt-[15px]'>
                          <img src="/assets/lecturer_list/email.png" alt="icon_email"/>
                          <a href="">nguyennam@tlu.edu.vn</a>
                        </div>
                        <div className='font-normal text-[16px] flex items-center gap-2 mt-[15px]'>
                          <img src="/assets/lecturer_list/phone.png" alt="icon_phone"/>
                          <a href="">0987654321</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chuyên gia hàng đầu */}
              <div className="md:w-1/3 border-2 border-gray-300 rounded-lg p-[30px]">
                <h2 className="text-2xl font-bold mb-6 border-b-[5px] border-[#E82323]">Chuyên gia hàng đầu</h2>
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="mb-[30px] bg-gray-50 rounded-lg shadow"
                    style={{
                      backgroundImage: "url('/assets/lecturer_list/background.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="flex flex-row gap-3">
                      <div className="w-1/4 overflow-hidden">
                        <img 
                          src="/assets/lecturer_list/avatar.jpg" 
                          alt="Expert" 
                          className="w-full h-auto object-cover hover:scale-110 transition ease-in-out" 
                        />
                      </div>
                      <div className="w-3/4">
                        <p className="font-bold text-[16px] text-black hover:text-[#35c56c] transition-colors mt-1">Name</p>
                        <p className="font-normal text-[14px] text-[#A3A3A3] mt-1">Trưởng khoa</p>
                        <p className="font-normal text-[14px] text-black mt-1">Bộ môn công nghệ phần mềm</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default TeachStaff;
