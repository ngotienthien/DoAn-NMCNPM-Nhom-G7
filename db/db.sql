-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 26, 2021 lúc 01:21 PM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `newspaperdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article`
--

CREATE TABLE `article` (
  `IDArticle` int(11) NOT NULL,
  `Title` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Avatar` varchar(100) NOT NULL,
  `BigAvatar` varchar(100) NOT NULL,
  `IsPremium` tinyint(1) NOT NULL,
  `Abstract` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Writter` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `Views` int(11) DEFAULT 0,
  `Ranks` int(11) DEFAULT 0,
  `TimePublish` datetime DEFAULT NULL,
  `IDCate` int(11) NOT NULL,
  `IDSubCategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

--
-- Đang đổ dữ liệu cho bảng `article`
--

INSERT INTO `article` (`IDArticle`, `Title`, `Content`, `Avatar`, `BigAvatar`, `IsPremium`, `Abstract`, `Writter`, `Status`, `Views`, `Ranks`, `TimePublish`, `IDCate`, `IDSubCategory`) VALUES
(1, 'Tour địa đạo Củ Chi', 'Nằm cách thành phố Hồ Chí Minh 60km, Củ Chi được trao biệt danh \"đất thép thành đồng\" do những chiến công nhân dân và lực lượng vũ trang Củ Chi lập nên trong chiến tranh chống Mỹ. Bạn có biết, địa đạo Củ Chi, với hệ thống đường hầm đồ sộ dài đến 220km, là địa điểm thu hút nhiều khách du lịch trong và ngoài nước. Thế thì còn chờ gì nữa? Cùng khám phá địa đạo Củ Chi nào!\r\n\r\nĐến đây, bạn sẽ được biết thêm lịch sử cũng như những nhọc nhằn vùng đất này trải qua trong chiến tranh. Sau đó, bạn sẽ được khám phá hệ thống đường hầm địa đạo, bao gồm khu ở và khu vực quân sự. Khi đi đã đời, hãy nghỉ chân với một cốc trà và khoai mì, lương thực chủ yếu của lính du kích Việt Nam trước đây. Nếu bạn muốn, bạn còn có thể tham quan trường bắn súng đấy. Đảm bảo bạn sẽ có một trải nghiệm khó quên.\r\n\r\n\r\nKhám phá hệ thống đường hầm đồ sộ tại Củ Chi\r\n\r\n\r\nTìm hiểu về một giai đoạn lịch sử quan trọng của Việt Nam một cách thú vị\r\n\r\n\r\nThưởng thức khoai mì, lương thực chính của lính du kích Việt Nam thời chiến', '', '', 0, 'Tìm hiểu lịch sử của Củ Chi và những nhọc nhằn vùng đất này trải qua trong chiến tranh chống Mỹ qua phim giới thiệuKhám phá hệ thống đường hầm của địa đạo bao gồm khu ở và khu vực quân sựThưởng thức trà và khoai mì, lương thực chính của lính du kích Việt Nam thời chiến, và tận tay bắn súng thật nếu bạn muốnCó tour sáng và tour chiều cho bạn lựa chọn', 2, 3, 0, 0, '2021-02-25 00:00:00', 17, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `article_tag`
--

CREATE TABLE `article_tag` (
  `IDArticle` int(11) NOT NULL,
  `IDTag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cate`
--

CREATE TABLE `cate` (
  `IDCategory` int(11) NOT NULL,
  `CategoryName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

--
-- Đang đổ dữ liệu cho bảng `cate`
--

INSERT INTO `cate` (`IDCategory`, `CategoryName`, `Status`) VALUES
(1, 'An Giang', 1),
(2, 'Bà Rịa - Vũng Tàu\r\n', 1),
(3, 'Bạc Liêu', 1),
(4, 'Bắc Giang', 1),
(5, 'Bắc Kạn', 1),
(6, 'Bắc Ninh', 1),
(7, 'Bến Tre', 1),
(8, 'Bình Dương', 1),
(9, 'Bình Định', 1),
(10, 'Bình Phước', 1),
(11, 'Bình Thuận', 1),
(12, 'Cà Mau', 1),
(13, 'Cao Bằng', 1),
(14, 'Cần Thơ', 1),
(15, 'Đà Nẵng', 1),
(16, 'Đắk Lắk', 1),
(17, 'Đắk Nông', 1),
(18, 'Điện Biên', 1),
(19, 'Đồng Nai', 1),
(20, 'Đồng Tháp', 1),
(21, 'Gia Lai', 1),
(22, 'Hà Giang', 1),
(23, 'Hà Nam', 1),
(24, 'Hà Nội', 1),
(25, 'Hà Tĩnh', 1),
(26, 'Hải Dương', 1),
(27, 'Hải Phòng', 1),
(28, 'Hậu Giang', 1),
(29, 'Hòa Bình', 1),
(30, 'Thành phố Hồ Chí Minh', 1),
(31, 'Hưng Yên', 1),
(32, 'Khánh Hòa', 1),
(33, 'Kiên Giang', 1),
(34, 'Kon Tum', 1),
(35, 'Lai Châu', 1),
(36, 'Lạng Sơn', 1),
(37, 'Lào Cai', 1),
(38, 'Lâm Đồng', 1),
(39, 'Long An', 1),
(40, 'Nam Định', 1),
(41, 'Nghệ An', 1),
(42, 'Ninh Bình', 1),
(43, 'Ninh Thuận', 1),
(44, 'Phú Thọ', 1),
(45, 'Phú Yên', 1),
(46, 'Quảng Bình', 1),
(47, 'Quảng Nam', 1),
(48, 'Quảng Ngãi', 1),
(49, 'Quảng Ninh', 1),
(50, 'Quảng Trị', 1),
(51, 'Sóc Trăng', 1),
(52, 'Sơn La', 1),
(53, 'Tây Ninh', 1),
(54, 'Thái Bình', 1),
(55, 'Thái Nguyên', 1),
(56, 'Thanh Hóa', 1),
(57, 'Thừa Thiên Huế', 1),
(58, 'Tiền Giang', 1),
(59, 'Trà Vinh', 1),
(60, 'Tuyên Quang', 1),
(61, 'Vĩnh Long', 1),
(62, 'Vĩnh Phúc', 1),
(63, 'Yên Bái', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `censorship`
--

CREATE TABLE `censorship` (
  `IDArticle` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `IDStatus` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Reason` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `IDArticle` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Comment` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `IDToken` int(11) NOT NULL,
  `IDUser` int(11) NOT NULL,
  `Token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status`
--

CREATE TABLE `status` (
  `IDStatus` int(11) NOT NULL,
  `StatusName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

--
-- Đang đổ dữ liệu cho bảng `status`
--

INSERT INTO `status` (`IDStatus`, `StatusName`) VALUES
(1, 'alive'),
(2, 'deleted'),
(3, 'published'),
(4, 'denied'),
(5, 'draft');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sub_categories`
--

CREATE TABLE `sub_categories` (
  `IDSubCategory` int(11) NOT NULL,
  `IDCategory` int(11) NOT NULL,
  `SubCategoryName` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `sub_categories`
--

INSERT INTO `sub_categories` (`IDSubCategory`, `IDCategory`, `SubCategoryName`, `Status`) VALUES
(1, 30, 'Địa đạo Củ Chi', 1),
(2, 30, 'Dinh độc lập', 1),
(3, 42, 'Quần thể danh thắng Tràng An', 1),
(4, 42, 'Tam Cốc', 1),
(5, 47, 'Thánh địa Mỹ Sơn', 1),
(6, 37, 'Sapa', 1),
(7, 13, 'Thác Bản Giốc', 1),
(8, 24, 'Hồ Hoàn Kiếm', 1),
(9, 57, 'Cố đô Huế', 1),
(10, 57, 'Chùa Thiên Mụ', 1),
(11, 19, 'Suối Mơ', 1),
(12, 60, 'Khu di tích Tân Trào', 1),
(13, 15, 'Bãi biển Mỹ Khê', 1),
(14, 15, 'Ngũ Hành Sơn', 1),
(15, 47, 'Phố cổ Hội An', 1),
(16, 46, 'Phong Nha Kẻ Bàng', 1),
(17, 49, 'Vịnh Hạ Long', 1),
(18, 32, 'Tháp Chàm Po Nagar', 1),
(19, 38, 'Đà Lạt', 1),
(20, 2, 'Côn Đảo', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tags`
--

CREATE TABLE `tags` (
  `IDTag` int(11) NOT NULL,
  `TagName` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `typeofuser`
--

CREATE TABLE `typeofuser` (
  `IDType` int(11) NOT NULL,
  `TypeName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

--
-- Đang đổ dữ liệu cho bảng `typeofuser`
--

INSERT INTO `typeofuser` (`IDType`, `TypeName`) VALUES
(1, 'subscriber'),
(2, 'writer'),
(3, 'adminitrator');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `IDUser` int(11) NOT NULL,
  `FullName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Phone` varchar(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `DOB` date NOT NULL,
  `NickName` varchar(200) NOT NULL,
  `UserName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(200) NOT NULL,
  `TypeOfUser` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `idFacebook` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=armscii8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`IDUser`, `FullName`, `Avatar`, `Phone`, `Email`, `Address`, `DOB`, `NickName`, `UserName`, `Password`, `TypeOfUser`, `Status`, `idFacebook`) VALUES
(1, 'Hồ Văn Sơn', '', '0909090909', 'hovanson1841999@gmail.com', '135B Trần Hưng Đạo, Quận 1, TP HCM', '1999-01-01', 'SonDepTrai', 'SonDepTrai', '******', 3, 1, ''),
(2, 'Ngô Tiến Thiện', '', '0909090909', 'thiennt@gmail.com', 'Bình Thạnh', '1999-02-01', 'C?ng ch?a ??ng b?ng', 'hahahaha', '123', 2, 1, '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_premium`
--

CREATE TABLE `user_premium` (
  `IDUser` int(11) NOT NULL,
  `DateEnd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`IDArticle`),
  ADD KEY `FK_A_U` (`Writter`),
  ADD KEY `FK_A_S` (`Status`),
  ADD KEY `FK_A_C` (`IDCate`),
  ADD KEY `FK_A_SC` (`IDSubCategory`);
ALTER TABLE `article` ADD FULLTEXT KEY `Title` (`Title`,`Abstract`,`Content`);

--
-- Chỉ mục cho bảng `article_tag`
--
ALTER TABLE `article_tag`
  ADD PRIMARY KEY (`IDArticle`,`IDTag`),
  ADD KEY `FK_AT_T` (`IDTag`);

--
-- Chỉ mục cho bảng `cate`
--
ALTER TABLE `cate`
  ADD PRIMARY KEY (`IDCategory`);

--
-- Chỉ mục cho bảng `censorship`
--
ALTER TABLE `censorship`
  ADD PRIMARY KEY (`IDArticle`,`IDUser`,`IDStatus`,`Date`),
  ADD KEY `FK_CEN_S` (`IDStatus`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`IDArticle`,`IDUser`,`Date`),
  ADD KEY `FK_COM_U` (`IDUser`);

--
-- Chỉ mục cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`IDToken`),
  ADD KEY `USER_TOKEN` (`IDUser`);

--
-- Chỉ mục cho bảng `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`IDStatus`);

--
-- Chỉ mục cho bảng `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`IDSubCategory`,`IDCategory`),
  ADD KEY `FK_SC_C` (`IDCategory`);

--
-- Chỉ mục cho bảng `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`IDTag`);

--
-- Chỉ mục cho bảng `typeofuser`
--
ALTER TABLE `typeofuser`
  ADD PRIMARY KEY (`IDType`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`IDUser`),
  ADD KEY `FK_U_TOU` (`TypeOfUser`),
  ADD KEY `FK_U_S` (`Status`);

--
-- Chỉ mục cho bảng `user_premium`
--
ALTER TABLE `user_premium`
  ADD PRIMARY KEY (`IDUser`,`DateEnd`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `article`
--
ALTER TABLE `article`
  MODIFY `IDArticle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `cate`
--
ALTER TABLE `cate`
  MODIFY `IDCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `IDToken` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `status`
--
ALTER TABLE `status`
  MODIFY `IDStatus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `IDSubCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `tags`
--
ALTER TABLE `tags`
  MODIFY `IDTag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `typeofuser`
--
ALTER TABLE `typeofuser`
  MODIFY `IDType` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `IDUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `FK_A_S` FOREIGN KEY (`Status`) REFERENCES `status` (`IDStatus`),
  ADD CONSTRAINT `FK_A_SC` FOREIGN KEY (`IDSubCategory`) REFERENCES `sub_categories` (`IDSubCategory`),
  ADD CONSTRAINT `FK_A_U` FOREIGN KEY (`Writter`) REFERENCES `users` (`IDUser`);

--
-- Các ràng buộc cho bảng `article_tag`
--
ALTER TABLE `article_tag`
  ADD CONSTRAINT `FK_AT_A` FOREIGN KEY (`IDArticle`) REFERENCES `article` (`IDArticle`),
  ADD CONSTRAINT `FK_AT_T` FOREIGN KEY (`IDTag`) REFERENCES `tags` (`IDTag`);

--
-- Các ràng buộc cho bảng `censorship`
--
ALTER TABLE `censorship`
  ADD CONSTRAINT `FK_CEN_A` FOREIGN KEY (`IDArticle`) REFERENCES `article` (`IDArticle`),
  ADD CONSTRAINT `FK_CEN_S` FOREIGN KEY (`IDStatus`) REFERENCES `status` (`IDStatus`);

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_COM_A` FOREIGN KEY (`IDArticle`) REFERENCES `article` (`IDArticle`),
  ADD CONSTRAINT `FK_COM_U` FOREIGN KEY (`IDUser`) REFERENCES `users` (`IDUser`);

--
-- Các ràng buộc cho bảng `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `USER_TOKEN` FOREIGN KEY (`IDUser`) REFERENCES `users` (`IDUser`);

--
-- Các ràng buộc cho bảng `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `FK_SC_C` FOREIGN KEY (`IDCategory`) REFERENCES `cate` (`IDCategory`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_U_S` FOREIGN KEY (`Status`) REFERENCES `status` (`IDStatus`),
  ADD CONSTRAINT `FK_U_TOU` FOREIGN KEY (`TypeOfUser`) REFERENCES `typeofuser` (`IDType`);

--
-- Các ràng buộc cho bảng `user_premium`
--
ALTER TABLE `user_premium`
  ADD CONSTRAINT `FK_UP_U` FOREIGN KEY (`IDUser`) REFERENCES `users` (`IDUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
