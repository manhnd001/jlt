# Ứng dụng Luyện Nghe Tiếng Nhật (Frontend)

Giao diện Next.js + MUI + Redux giúp tương tác với backend Express/Prisma để quản lý các bài luyện nghe.

## Tính năng mẫu

- Hiển thị danh sách audio lấy từ API `/audio`.
- Form tạo nhanh bài luyện nghe mới gồm tiêu đề, script tiếng Nhật, bản dịch và đường dẫn file.
- Redux Toolkit quản lý trạng thái tải dữ liệu, thông báo lỗi/thành công khi gửi form.
- MUI Theme cơ bản để sẵn sàng mở rộng giao diện.

## Chuẩn bị môi trường

1. Cài đặt dependencies

   ```bash
   cd frontend
   npm install
   ```

2. Tạo file `.env.local` (hoặc export biến môi trường) để cấu hình URL backend nếu không dùng mặc định `http://localhost:4000`:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

3. Chạy ứng dụng

   ```bash
   npm run dev
   ```

Sau khi backend chạy ở cổng 4000, mở [http://localhost:3000](http://localhost:3000) để thử form và danh sách bài nghe.
