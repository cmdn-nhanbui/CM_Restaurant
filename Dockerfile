# Bước 1: Dùng image Nginx chính thức
FROM nginx:stable-alpine

# Bước 2: Xóa cấu hình mặc định
RUN rm -rf /usr/share/nginx/html/*

# Bước 3: Copy file build vào thư mục Nginx
COPY dist /usr/share/nginx/html

# Bước 4: Copy file cấu hình Nginx tùy chỉnh (nếu có)
COPY nginx.conf /etc/nginx/nginx.conf

# Mặc định Nginx sẽ chạy khi container start
