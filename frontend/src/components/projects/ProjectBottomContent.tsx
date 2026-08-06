"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectBottomContentProps {
  slug: string;
  accentColor?: string;
  bgRelated?: string;
  bgSeo?: string;
  borderColor?: string;
}

export function ProjectBottomContent({
  slug,
  accentColor = "#C8A96E",
  bgRelated = "bg-[#f9f9f9]",
  bgSeo = "bg-white",
  borderColor = "border-[#E8E2D9]",
}: ProjectBottomContentProps) {
  // Lấy tất cả dự án liên quan (khác dự án hiện tại)
  const relatedProjects = projects.filter((p) => p.slug !== slug);

  // Nội dung Text SEO cuối trang (sửa ở đây để apply cho toàn bộ các trang)
  const renderSeoText = () => {
    switch (slug) {
      case "camellia":
        return (
          <>
            <h2 className="text-xl font-bold text-[#4a3829] mb-4">
              Về Dự Án Căn Hộ The Camellia Sơn Trà Đà Nẵng
            </h2>
            <p className="text-sm leading-relaxed text-[#4e453e]/80">
              <strong>The Camellia Sơn Trà</strong> là biểu tượng{" "}
              <strong>căn hộ biển Đà Nẵng</strong> hạng sang được phát triển bởi
              MBLand Holding và Thành Lâm. Dự án sở hữu pháp lý{" "}
              <strong>sở hữu lâu dài</strong> hiếm có tại quỹ đất ven biển, kết
              nối hoàn hảo giữa bán đảo Sơn Trà hoang sơ và nhịp sống sôi động
              của trung tâm Đà Nẵng. Với định vị Luxury Urban Nature Residence,
              The Camellia kiến tạo một không gian sống Wellness chuẩn quốc tế,
              hứa hẹn tiềm năng sinh lời vượt trội cho các nhà đầu tư.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
              Khám phá thêm{" "}
              <Link
                href="/projects"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                các dự án bất động sản Đà Nẵng
              </Link>{" "}
              nổi bật khác, hoặc{" "}
              <Link
                href="/contact-us"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                liên hệ với chúng tôi
              </Link>{" "}
              ngay hôm nay để nhận thông tin tư vấn và bảng giá nội bộ đợt 1.
            </p>
          </>
        );

      case "s-light-tower":
        return (
          <>
            <h2 className="text-xl font-bold text-[#4a3829] mb-4">
              Về Dự Án Căn Hộ S-Light Tower Đà Nẵng
            </h2>
            <p className="text-sm leading-relaxed text-[#4e453e]/80">
              <strong>S-Light Tower</strong> là biểu tượng{" "}
              <strong>căn hộ cao cấp Đà Nẵng</strong> nằm trong đại đô thị Sun
              NeO City (Nam Đà Nẵng), do Sun Property (thành viên Sun Group)
              phát triển. Với thiết kế tháp đôi 22 tầng, dự án mang đến tầm nhìn
              270 độ view sông Hàn, biển và sân khấu pháo hoa DIFF. Sở hữu pháp
              lý lâu dài cùng tiện ích đẳng cấp, S-Light Tower là kênh đầu tư
              sinh lời và chốn an cư lý tưởng.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
              Xem thêm danh sách{" "}
              <Link
                href="/projects"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                các dự án bất động sản Đà Nẵng
              </Link>{" "}
              khác để có sự so sánh tổng quan nhất, hoặc{" "}
              <Link
                href="/contact-us"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                liên hệ tư vấn miễn phí
              </Link>{" "}
              ngay hôm nay để nhận thông tin booking nội bộ đợt 1.
            </p>
          </>
        );

      case "sun-fours-tower":
        return (
          <>
            <h2 className="text-xl font-bold text-[#4a3829] mb-4">
              Về Dự Án Căn Hộ Sun FourS Tower Đà Nẵng
            </h2>
            <p className="text-sm leading-relaxed text-[#4e453e]/80">
              <strong>Sun FourS Tower</strong> là biểu tượng{" "}
              <strong>căn hộ cao cấp Nam Đà Nẵng</strong> tọa lạc tại tâm điểm
              giao thương Minh Mạng - Nguyễn Phước Lan, do chủ đầu tư uy tín Sun
              Group (Sun Property) kiến tạo. Sở hữu pháp lý lâu dài, hệ sinh
              thái &quot;All-in-Tower&quot; cùng kết nối hoàn hảo đến biển Mỹ
              Khê và khu đô thị Sunneva Island, dự án hứa hẹn mang lại không
              gian sống đẳng cấp và cơ hội đầu tư sinh lời bền vững.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
              Hãy khám phá thêm{" "}
              <Link
                href="/projects"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                các dự án bất động sản Đà Nẵng
              </Link>{" "}
              khác để đa dạng hóa danh mục đầu tư của bạn, hoặc{" "}
              <Link
                href="/contact-us"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                liên hệ tư vấn miễn phí
              </Link>{" "}
              ngay hôm nay để nhận thông tin booking nội bộ đợt 1 với chính sách
              Sun Early Key tốt nhất.
            </p>
          </>
        );

      case "symphony5":
        return (
          <>
            <h2 className="text-xl font-bold text-[#4a3829] mb-4">
              Về Dự Án Căn Hộ Sun Symphony Residence Đà Nẵng
            </h2>
            <p className="text-sm leading-relaxed text-[#4e453e]/80">
              <strong>Sun Symphony Residence Đà Nẵng</strong> (Symphony 5) là tổ
              hợp <strong>căn hộ cao cấp mặt sông Hàn</strong>, được phát triển
              bởi Sun Property. Sở hữu vị trí đắc địa ven sông Hàn, dự án mang
              đến tầm nhìn tuyệt mỹ bao trọn cảnh quan thành phố, những nhịp cầu
              biểu tượng và những màn trình diễn pháo hoa quốc tế DIFF. Với hệ
              tiện ích độc bản, đây không chỉ là nơi an cư lý tưởng mà còn là
              kênh đầu tư sinh lời vượt trội.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
              Hãy khám phá thêm{" "}
              <Link
                href="/projects"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                các dự án bất động sản Đà Nẵng
              </Link>{" "}
              khác để đa dạng hóa danh mục đầu tư của bạn, hoặc{" "}
              <Link
                href="/contact-us"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                liên hệ tư vấn miễn phí
              </Link>{" "}
              ngay hôm nay để nhận thông tin chi tiết nhất về dự án.
            </p>
          </>
        );

      case "the-legend-danang":
        return (
          <>
            <h2 className="text-xl font-bold text-[#4a3829] mb-4">
              Về Tổ Hợp Căn Hộ Cao Cấp The Legend Đà Nẵng
            </h2>
            <p className="text-sm leading-relaxed text-[#4e453e]/80">
              <strong>The Legend Đà Nẵng</strong> (ROX Signature) là dự án{" "}
              <strong>căn hộ cao cấp mặt tiền Cầu Rồng</strong> độc bản tại quỹ
              đất vàng A20 Võ Văn Kiệt. Điểm nổi bật nhất của dự án là sự kết
              hợp hoàn hảo giữa khối khách sạn 5 sao mang thương hiệu Hyde Hotels
              (vận hành bởi tập đoàn Accor) và khối căn hộ cao cấp (được tư vấn
              vận hành bởi CBRE). Với tầm nhìn trực diện Sông Hàn và bãi biển
              Mỹ Khê, The Legend mở ra không gian sống tiện nghi, sang trọng
              mang phong cách sống đỉnh cao.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#4e453e]/80">
              Nếu bạn mong muốn sở hữu một tài sản truyền đời danh giá ngay lõi
              trung tâm Đà Nẵng, hãy{" "}
              <Link
                href="/contact-us"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                liên hệ tư vấn
              </Link>{" "}
              cùng đội ngũ chuyên gia của chúng tôi. Bạn cũng có thể xem thêm{" "}
              <Link
                href="/projects"
                style={{ color: accentColor }}
                className="font-medium hover:underline"
              >
                các dự án bất động sản Đà Nẵng
              </Link>{" "}
              để so sánh và đưa ra quyết định đầu tư thông minh nhất.
            </p>
          </>
        );

      default:
        return (
          <>
            <h2 className="text-xl font-bold text-[#4a3829] mb-4">
              Về Các Dự Án Bất Động Sản Đà Nẵng
            </h2>
            <p className="text-sm leading-relaxed text-[#4e453e]/80">
              Khám phá các tổ hợp căn hộ, nghỉ dưỡng cao cấp tại Đà Nẵng với
              pháp lý chuẩn chỉnh và tiềm năng sinh lời bền vững.
            </p>
          </>
        );
    }
  };

  return (
    <>
      <style>{`
        .related-project-card:hover {
          border-color: var(--hover-accent-color) !important;
        }
        .related-project-title:hover {
          color: var(--hover-accent-color) !important;
        }
      `}</style>
      
      {/* DỰ ÁN LIÊN QUAN (Internal Link) */}
      <section className={cn("py-16 border-t", bgRelated, borderColor)}>
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="font-serif text-2xl font-bold text-[#4a3829] mb-8">
            Các Dự Án Bất Động Sản Cao Cấp Khác Tại Đà Nẵng
          </h2>
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            style={{ "--hover-accent-color": accentColor } as React.CSSProperties}
          >
            {relatedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={cn(
                  "related-project-card group rounded-sm border bg-white p-6 shadow-sm transition-all hover:shadow-md",
                  borderColor
                )}
              >
                <h3 className="related-project-title font-serif text-lg font-semibold text-[#4a3829] transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-[#4e453e]/70">Xem chi tiết →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TEXT SEO CUỐI TRANG */}
      <section className={cn("py-12 border-t", bgSeo, borderColor)}>
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          {renderSeoText()}
        </div>
      </section>
    </>
  );
}
