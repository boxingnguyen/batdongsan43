'use client'; 

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AnimateInView from '@/components/shared/AnimateInView';
import { Playfair_Display } from 'next/font/google'; 
import { Button } from '@/components/ui/button'; 
import Link from 'next/link';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['700'],
});

// --- DỮ LIỆU 41 TIN TỨC ---
const allNewsData = [
  { id: 1, title: "ĐIỀU KIỆN SỬ DỤNG THE SOLEIL ĐÀ NẴNG", date: "08/10/2025", imageSrc: "/images/news/news-20.jpg", href: "/news/1" },
  { id: 2, title: "Gosun Group ký kết hợp tác chiến lược dự án The Soleil Da Nang", date: "12/09/2025", imageSrc: "/images/news/new2.png", href: "/news/2" },
  { id: 3, title: "KHÁM PHÁ VẺ ĐẸP TỰ NHIÊN CỦA THÀNH PHỐ ĐÀ NẴNG – WYNDHAM SOLEIL DANANG", date: "03/09/2025", imageSrc: "/images/news/new3.png", href: "/news/3" },
  { id: 4, title: "Sự kiện văn hóa – nghệ thuật chào mừng đại lễ Quốc khánh 2/9 tại Đà Nẵng", date: "29/08/2025", imageSrc: "/images/news/new4.jpg", href: "/news/4" },
  { id: 5, title: "Hòa cùng không khí Quốc khánh 2/9 tại Wyndham Soleil Danang", date: "27/08/2025", imageSrc: "/images/news/news-5.jpeg", href: "/news/5" },
  { id: 6, title: "4 Địa Điểm Không Thể Bỏ Qua Tại Đà Nẵng Vào Đại Lễ 2/9 Này – Wyndham Soleil Danang", date: "22/08/2025", imageSrc: "/images/news/news-6.jpg", href: "/news/6" },
  { id: 7, title: "Đà Nẵng trên hành trình trở thành trung tâm tài chính quốc tế – Cơ hội vàng cho thị trường căn hộ.", date: "20/08/2025", imageSrc: "/images/news/news-7.png", href: "/news/7" },
  { id: 8, title: "Cập nhật tiến độ dự án Wyndham Soleil Danang – Tháng 8/2025", date: "15/08/2025", imageSrc: "/images/news/news-8.jpeg", href: "/news/8" },
  { id: 9, title: "Du lịch Đà Nẵng: Cẩm nang chi tiết- Wyndham Soleil Danang", date: "13/08/2025", imageSrc: "/images/news/news-9.png", href: "/news/9" },
  { id: 10, title: "Những lợi ích khi mua căn hộ tại Wyndham Soleil Danang", date: "08/08/2025", imageSrc: "/images/news/news-10.jpg", href: "/news/10" },
  { id: 11, title: "Định vị dự án & vị trí trục Võ Nguyên Giáp – Wyndham Soleil Danang", date: "06/08/2025", imageSrc: "/images/news/news-11.jpg", href: "/news/11" },
  { id: 12, title: "HÀNH TRÌNH TRI ÂN CÙNG WYNDHAM SOLEIL DANANG – NGUỒN CẢM HỨNG CHO NHỮNG CÔNG TRÌNH MANG TẦM VÓC", date: "31/07/2025", imageSrc: "/images/news/news-12.png", href: "/news/12" },
  { id: 13, title: "Đầu tư căn hộ ven biển 2025: Xu hướng bền vững giữa biến động kinh tế – Wyndham Soleil Danang", date: "21/07/2025", imageSrc: "/images/news/news-13.png", href: "/news/13" },
  { id: 14, title: "ĐÀ NẴNG RỰC RỠ ĐÊM CHUNG KẾT PHÁO HOA 12/7 – WYNDHAM SOLEIL DANANG", date: "11/07/2025", imageSrc: "/images/news/news-14.jpg", href: "/news/14" },
  { id: 15, title: "TẠI SAO CĂN HỘ VEN BIỂN ĐÀ NẴNG ĐANG LÀ LỰA CHỌN CỦA GIỚI ĐẦU TƯ 2025?", date: "30/06/2025", imageSrc: "/images/news/news-15.png", href: "/news/15" },
  { id: 16, title: "CHÚC MỪNG VÀ CẢM ƠN QUÝ KHÁCH HÀNG ĐÃ LỰA CHỌN WYNDHAM SOLEIL DANANG LÀM TỔ ẤM CỦA MÌNH", date: "13/06/2025", imageSrc: "/images/news/news-16.jpg", href: "/news/16" },
  { id: 17, title: "WYNDHAM SOLEIL DANANG BẮT ĐẦU BÀN GIAO TỪ THÁNG 5/2025", date: "12/05/2025", imageSrc: "/images/news/news-17.jpg", href: "/news/17" },
  { id: 18, title: "Tiến độ dự án Wyndham Soleil Danang tháng 7/2021", date: "12/07/2021", imageSrc: "/images/news/news-18.jpg", href: "/news/18" },
  { id: 19, title: "PPC An Thịnh Đà Nẵng chung tay cùng Bắc Giang chống dịch Covid-19", date: "29/05/2021", imageSrc: "/images/news/news-19.jpg", href: "/news/19" },
  { id: 20, title: "Tiến độ dự án Wyndham Soleil Danang ngày 21/5/2021", date: "21/05/2021", imageSrc: "/images/news/news-20.jpg", href: "/news/20" },
  { id: 21, title: "Nhà đầu tư vững tâm trước tiến độ xây dựng thần tốc của Soleil Ánh Dương Đà Nẵng", date: "31/03/2021", imageSrc: "/images/news/news-21.jpg", href: "/news/21" },
  { id: 22, title: "(Xây dựng) Đà Nẵng: Du lịch khởi sắc – Cơ hội cho bất động sản nghỉ dưỡng", date: "31/03/2021", imageSrc: "/images/news/news-22.jpeg", href: "/news/22" },
  { id: 23, title: "Tiến độ dự án Wyndham Soleil Danang tháng 3/2021", date: "31/03/2021", imageSrc: "/images/news/news-23.jpg", href: "/news/23" },
  { id: 24, title: "Sức hút mạnh mẽ của Wyndham Soleil Danang tại Sunset Cocktail", date: "10/06/2020", imageSrc: "/images/news/news-24.png", href: "/news/24" },
  { id: 25, title: "Pháp lý tòa Nimbus", date: "18/12/2019", imageSrc: "/images/news/news-25.jpg", href: "/news/25" },
  { id: 26, title: "Dịch vụ chất lượng cao và bất động sản nghỉ dưỡng: mũi nhọn để phát triển du lịch Đà Nẵng", date: "14/06/2019", imageSrc: "/images/news/news-26.jpg", href: "/news/26" },
  { id: 27, title: "Đầu tư bất động sản nghỉ dưỡng: Cửa vẫn sáng", date: "14/06/2019", imageSrc: "/images/news/news-27.jpg", href: "/news/27" },
  { id: 28, title: "Cập nhật tiến độ toà D – Tháng 6/ 2019", date: "07/06/2019", imageSrc: "/images/news/news-28.png", href: "/news/28" },
  { id: 29, title: "Cập nhật tiến độ toà D – Tháng 3/ 2019", date: "04/03/2019", imageSrc: "/images/news/news-29.jpg", href: "/news/29" },
  { id: 30, title: "Tiệc Sunset Cocktail", date: "13/03/2019", imageSrc: "/images/news/news-30.jpg", href: "/news/30" },
  { id: 31, title: "Báo cáo tiến độ thi công Toà D – Tháng 1/2019", date: "15/01/2019", imageSrc: "/images/news/news-31.jpg", href: "/news/31" },
  { id: 32, title: "TIẾN ĐỘ DỰ ÁN WYNDHAM SOLEIL ĐÀ NẴNG – TOÀ D T9/2018", date: "08/11/2018", imageSrc: "/images/news/news-31.jpg", href: "/news/32" },
  { id: 33, title: "TOP 10 THÀNH PHỐ ĐÁNG SỐNG NHẤT TRÊN THẾ GIỚI", date: "07/11/2018", imageSrc: "/images/news/news-33.jpg", href: "/news/33" },
  { id: 34, title: "WYNDHAM SOLEIL DA NANG – BẢN GIAO HƯỞNG ÁNH DƯƠNG", date: "30/10/2018", imageSrc: "/images/news/news-34.jpg", href: "/news/34" },
  { id: 35, title: "Wyndham Soleil Danang đón nhận Kỷ lục: TOÀ NHÀ CÓ NHIỀU THANG MÁY NHẤT VIỆT NAM", date: "30/10/2018", imageSrc: "/images/news/news-35.jpg", href: "/news/35" },
  { id: 36, title: "CẬP NHẬT TẦNG MẪU DỰ ÁN SOLEIL DA NANG CUỐI THÁNG 1/2018", date: "09/08/2018", imageSrc: "/images/news/news-36.png", href: "/news/36" },
  { id: 37, title: "CẬP NHẬT CĂN HỘ MẪU SOLEIL ĐÀ NẴNG (THÁNG 01/2018)", date: "09/08/2018", imageSrc: "/images/news/news-37.jpg", href: "/news/37" },
  { id: 38, title: "PPCAT NHẬN QUYẾT ĐỊNH CHỦ TRƯƠNG ĐẦU TƯ DÀNH CHO DỰ ÁN ÁNH DƯƠNG-SOLEIL.", date: "09/08/2018", imageSrc: "/images/news/news-38.jpg", href: "/news/38" },
  { id: 39, title: "BỂ BƠI VÔ CỰC – SỰ XA HOA “ĐẲNG CẤP”", date: "09/08/2018", imageSrc: "/images/news/news-39.jpg", href: "/news/39" },
  { id: 40, title: "PPC AN THỊNH GIÀNH GIẢI THƯỞNG BẤT ĐỘNG SẢN QUỐC TẾ", date: "08/08/2018", imageSrc: "/images/news/news-40.png", href: "/news/40" },
  { id: 41, title: "PPC AN THỊNH “BẮT TAY” CHIẾN LƯỢC VỚI WYNDHAM", date: "08/08/2018", imageSrc: "/images/news/news-41.jpg", href: "/news/41" },
];


const POSTS_PER_PAGE = 9; 

const NewsPage = () => {
  const t = useTranslations('News');
  const [currentPage, setCurrentPage] = React.useState(1);

  // Logic phân trang
  const totalPages = Math.ceil(allNewsData.length / POSTS_PER_PAGE); 
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allNewsData.slice(startIndex, endIndex);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section/Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
            src="/images/home/tintuc1.png " 
            alt={t('hero_title')}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className={`
            text-4xl md:text-6xl text-white uppercase text-center max-w-4xl px-4 
            ${playfair.className} 
            leading-relaxed tracking-wide
          `}>
            {t('hero_title')}
          </h1>
        </div>
      </div>

      {/* 2. Main Content Sections */}
      <div className="relative isolate py-16 md:py-24"> 
        <Image
            src="/images/home/background.png" 
            alt="Background"
            fill
            className="-z-10 object-cover opacity-20"
            sizes="100vw"
        />
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Lưới 3 cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {currentPosts.map((news, index) => (
              <AnimateInView 
                key={news.id} 
                delay={index * 100} 
                className="group relative h-80 w-full rounded-lg overflow-hidden shadow-xl"
              >
                <Link href={news.href} className="block h-full w-full">
                  {/* Ảnh nền */}
                  <Image
                    src={news.imageSrc}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Lớp phủ Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Vùng chứa nội dung */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs font-semibold uppercase text-gray-300 mb-2">{news.date}</p>
                    <h3 className="text-lg font-bold leading-tight transition-colors duration-300 group-hover:text-primary-400">
                      {news.title}
                    </h3>
                  </div>
                </Link>
              </AnimateInView>
            ))}
          </div>

          {/* Thanh Phân Trang (Pagination) */}
          <div className="flex items-center justify-center gap-4 mt-16">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {t('pagination_prev')}
            </Button>
            
            <span className="text-gray-700 font-medium">
              {t('pagination_page')} {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {t('pagination_next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;