# Mục Tin tức (/tin-tuc)

Mỗi bài viết là một file `<slug>.md` trong thư mục này. Tên file chỉ gồm chữ
thường không dấu, số và dấu gạch ngang; nó trở thành đường dẫn
`/tin-tuc/<slug>`. Định dạng frontmatter: xem `src/lib/posts.ts`.

Bài viết thường do agent viết bài (`writer_agent`) tạo qua Pull Request. Trước
khi merge, kiểm tra: `node scripts/check-article.mjs content/tin-tuc/<slug>.md`
(chạy trong thư mục `frontend/`).
