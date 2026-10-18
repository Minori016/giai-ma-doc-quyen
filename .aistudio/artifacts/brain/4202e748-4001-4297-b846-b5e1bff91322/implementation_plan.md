# Kế hoạch Thiết kế Toàn bộ Asset Không Nền (Transparent SVG & PNG) cho Giải Mã Độc Quyền

Kế hoạch tái tạo toàn diện hệ thống hình ảnh sang chuẩn đồ họa Vector SVG và PNG tách nền 100% trong suốt (Transparent Alpha), loại bỏ hoàn toàn các khung viền chữ nhật trắng đục, kết hợp nền bàn cờ công viên dịu mắt tôn vinh 32 ô cờ.

---

## Phản hồi Người dùng & Quyết định Then chốt

> [!IMPORTANT]
> - **Định dạng asset**: Sử dụng 100% đồ họa Vector SVG sắc nét cao cấp kết hợp PNG trong suốt có kênh Alpha, không chứa bất kỳ khung viền hay nền trắng/nền đục hình hộp chữ nhật nào.
> - **Nền bàn cờ 32 ô**: Nền công viên sinh thái thông minh phối màu dịu mắt (soft park greenery, đường dạo bộ uốn lượn, quảng trường đài phun nước trung tâm), không dùng ảnh nền đục gây rối mắt, đảm bảo 32 ô cờ và quân cờ 6 nhóm nổi bật rõ ràng.
> - **Phong cách hình tượng**: Đồ họa 3D isometric đổ bóng mềm, tách nền hoàn toàn, hòa nhập tự nhiên vào giao diện kính mờ và màu sắc chủ đạo của từng đội.

---

## 1. Danh mục Toàn bộ Asset Không Nền Cần Triển Khai

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HỆ THỐNG ASSET ĐỒ HỌA TRONG SUỐT (NO BACKGROUND)          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. BIỂU TƯỢNG BẢN ĐỒ & QUÂN CỜ (100% TRANSPARENT SVG / PNG)                 │
│    • 6 Avatar nhân vật đại diện: Tách nền hoàn toàn, bo tròn sắc nét,       │
│      tông màu nhận diện riêng biệt cho từng đội (Xanh, Đỏ, Tím, Cam, Ngọc,  │
│      Vàng nâu).                                                             │
│    • Nút Gieo xúc xắc 3D: Nút bấm ngọc lục bảo 3D nổi khối với quân xúc xắc  │
│      lập phương bóng bẩy, hoạt ảnh xoay khi gieo.                           │
│    • 32 Biểu tượng ô bàn cờ: Cờ xuất phát 3D, đồng tiền tích tụ, tách cà phê │
│      giải lao, logo Apple mạ bạc, cân công lý, v.v. (tách nền hoàn toàn).   │
│                                                                             │
│ 2. NHÂN VẬT CHỌN ĐỘI TOÀN THÂN (TRANSPARENT ARTWORK)                        │
│    • Nhân vật 1: Nam sinh viên năng động đeo balo, cầm tablet số.          │
│    • Nhân vật 2: Nữ giám đốc bản lĩnh trong vest đỏ, túi xách thời trang.   │
│    • Nhân vật 3: Nữ nghiên cứu sinh suit tím đeo kính, tài liệu phân tích. │
│    • Nhân vật 4: Nam chiến lược gia trẻ trong áo hoodie cam thể thao.       │
│    • Nhân vật 5: Nữ chuyên gia công nghệ áo xanh ngọc cầm laptop bạc.       │
│    • Nhân vật 6: Nam chuyên gia kinh tế áo sơ mi trắng, gile vàng nâu.      │
│                                                                             │
│ 3. CÁC HUY HIỆU & HÌNH MINH HỌA SỰ KIỆN                                     │
│    • Cúp Chiến Thắng 3D: Cúp vàng vô địch có quai uốn lượn, vòng nguyệt quế  │
│      và ngôi sao lấp lánh (trong suốt, không nền).                          │
│    • Cúp Bảng Xếp Hạng: Huy hiệu cúp vàng 3D vinh danh bảng điểm.           │
│    • Minh họa Phòng chờ: Mô hình thành phố 3D tí hon có cúp quả cầu vàng.   │
│    • Tranh đấu Câu hỏi: Hai tòa cao ốc kính 3D xanh/đỏ với tia sét & VS.    │
│    • Đồng hồ Thua cuộc: Đồng hồ báo thức đỏ nứt vỡ kim loại 3D.             │
│                                                                             │
│ 4. BỘ 8 THẺ KIẾN THỨC ĐỘC QUYỀN MẠ VÀNG 3D (TRANSPARENT ICONS)              │
│    • Thẻ 01: Khu phức hợp nhà máy công nghiệp lớn 3D                        │
│    • Thẻ 02: Cặp tháp tài chính đôi vươn cao                                │
│    • Thẻ 03: Cái bắt tay đối tác vàng ánh kim 3D                            │
│    • Thẻ 04: Biểu đồ cột quy mô kỹ thuật công nghệ cao                      │
│    • Thẻ 05: Đôi găng tay boxing va chạm nảy lửa                            │
│    • Thẻ 06: Quân mã cờ vua kim loại đối kháng                              │
│    • Thẻ 07: Hai bong bóng đàm phán thương lượng                            │
│    • Thẻ 08: Cây sơ đồ tổ chức độc quyền phân cấp                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Thiết kế Giao diện Bàn cờ Dịu Mắt & Tương Phản Tối Ưu

### A. Bàn cờ 32 ô (`Board.tsx`)
- Thay thế ảnh JPEG tối bằng giao diện công viên hiện đại được dựng bằng SVG và CSS Gradient mềm:
  - Bãi cỏ xanh ngọc dịu mắt (`emerald-50/60` đến `sky-50/70`).
  - Đường dạo bộ lát sỏi bo cong kết nối 32 ô di chuyển.
  - Quảng trường trung tâm hình tròn với hồ nước viền đá hoa cương bao quanh nút Gieo xúc xắc 3D.
  - Các ô cờ có lớp nền trắng ngà mờ (`bg-white/95 backdrop-blur-md`), viền màu mảnh và đổ bóng nổi khối nhẹ giúp chữ và biểu tượng đạt độ sắc nét tuyệt đối.

### B. Quân cờ 6 Nhóm
- Không dùng ảnh nền vuông; mỗi quân cờ là một huy hiệu tròn nổi khối 3D với hình tượng nhân vật vẽ vector sắc nét, đường viền theo màu chủ đạo của nhóm và vòng phát sáng khi tới lượt.

---

## 3. Kiến trúc Kỹ thuật & Độ Tin cậy

- **Độ phân giải độc lập (Resolution-Independent)**: Sử dụng SVG cho toàn bộ biểu tượng và huy hiệu, đảm bảo hiển thị sắc nét 100% trên mọi kích thước màn hình từ điện thoại đến màn hình 4K, không bị nhòe vỡ hay nén méo.
- **Không phụ thuộc mạng ngoài**: Tích hợp trực tiếp vào component và thư mục assets nội bộ, loại bỏ nguy cơ ảnh bị lỗi kết nối hoặc chặn cross-origin.
- **Kiểm thử logic**: Bảo toàn 100% 12 bài test trong `logic.test.ts`.

---

## 4. Các Bước Triển Khai

1. **Bước 1**: Xây dựng bộ biểu tượng SVG 3D Isometric không nền hoàn chỉnh cho 8 thẻ kiến thức, 6 nhân vật đại diện, cúp vàng chiến thắng, tranh đấu câu hỏi, và phòng chờ trong `GameIcons.tsx`.
2. **Bước 2**: Tái thiết kế nền bàn cờ công viên dịu mắt và nút xúc xắc 3D không nền trong `Board.tsx`.
3. **Bước 3**: Cập nhật các Modal (`CharacterSelectModal`, `LobbyModal`, `QuestionModal`, `VictoryModal`, `LeaderboardModal`, `MyCardsModal`, `DiagramModal`, `Header`, `Footer`) để sử dụng hoàn toàn các asset không nền mới.
4. **Bước 4**: Kiểm thử biên dịch `compile_applet`, chạy `lint_applet` và `npm test`.
