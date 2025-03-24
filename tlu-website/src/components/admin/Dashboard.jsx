import React from "react";
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="mt-24">
      <div className="flex flex-col items-center bg-[#192E58] p-5">
        <div className="flex justify-between w-full max-w-5xl text-white">
          <div>
            <a href="/admin/tong-quan">
              <div className="text-2xl mb-2 text-blue-600">
                <i className="fas fa-chart-bar"></i>
              </div>
              <div className="font-bold">Tổng quan</div>
            </a>
          </div>

          <div>
            <a href="/trolykhoa/quan-ly-bai-viet">
              <div className="text-2xl mb-2 text-blue-600">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="font-bold">Bài viết</div>
            </a>
          </div>

          <div>
            <a href="/admin/danh">
              <div className="text-2xl mb-2 text-blue-600">
                <i className="fas fa-folder"></i>
              </div>
              <div className="font-bold">Danh mục</div>
            </a>
          </div>

          <div>
            <Link to="/admin/nhan-su">
              <div className="text-2xl mb-2 text-blue-600">
                <i className="fas fa-users"></i>
              </div>
              <div className="font-bold">Nhân sự</div>
            </Link>
          </div>
          <div>
            <Link to="/admin/tai-khoan">
              <div className="text-2xl mb-2 text-blue-600">
                <i className="fas fa-users"></i>
              </div>
              <div className="font-bold">Tài khoản</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
