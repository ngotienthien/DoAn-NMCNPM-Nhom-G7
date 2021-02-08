-------------------layout show-------------------
* phân hệ đọc giả vãng lai(guest)
	- trang chủ(show/home). (1)
	- trang xem danh sách bài viết theo chuyên mục(show/articles/byCat/<idCategories>). (2)
	- trang xem danh sách bài viết theo tag(show/articles/byTag/<idTag>). (2)
	- trang xem chi tiết bài viết(show/articles/detail/<idArticle>). (3)
	- trang kết quả tìm kiếm bài viết(show/articles/bySearch/<keyword_search>). (2)

* subscriber( sử dụng các trang của đọc giả vãng lai)
	- trang đăng kí tài khoản cho đọc giả(show/subscriber/register). (4)
	- trang đăng kí premium(show/subscriber/registerPremium).(5)

------------------layout manage--------------------

* writer
	- trang viết bài viết dành cho phóng viên(manage/articles/writeArticle). (8)
	- trang xem danh sách bài viết do phóng viên viết(manage/articles/byWriter). (6)
	- trang xem chi tiết bài viết do phong viên viết(manage/articles/detailArticle/byWriter). (7)
	- trang chỉnh sửa bài viết cho phóng viên(manage/articles/editArticle/byWriter). (9)

* editor
	- trang xem danh sách bài viết của phong viên đăng vào chuyên mục do mình quản lý dành cho biên tập viên(manage/articles/byEditor). (6)
	- trang xem chi tiết bài viết của phóng viên đăng vào chuyên mục do mình quản lý dành cho biên tập viên(manage/articles/detailArticle/byEditor).(7)
	- trang từ chối bài viết(manage/articles/refuse/<idArticle>).(10)
	- trang duyệt bài viết(manage/articles/approve/<idArticle>).(11)


* administrator
- Quản lý chuyên mục
	+ xem danh sách chuyên mục(manage/categories/listCategories).(14)
	+ thêm chuyên mục(manage/categories/addCategories).(15)
	+ xóa chuyên mục(manage/categories/deleteCategories). (16)
	+ cập nhật chuyên mục(manage/categories/editCategories). (17)
- Quản lý nhãn (tag)
	+ xem danh sách tag(manage/tags/listTags).(18)
	+ thêm tag(manage/tags/addTags).(19)
	+ xóa tag(manage/tags/deleteTags).(20)
	+ cập nhật tag(manage/tags/editTags).(21)
- Quản lý bài viết
	+ xem danh sách bài viết(manage/articles//byAdministrator). (6)
	+ xem chi tiết bài viết(manage/articles/detailArticle/byAdministrator).(7)
	+ thêm bài viết(manage/articles/addArticle/byAdministrator).(12)
	+ xóa bài viết(manage/articles/deleteArticle/byAdministrator).(13)
	+ cập nhật bài viết(manage/articles/editArticle/byAdministrator). (9)
- Quản lý danh sách người dùng
	+ xem danh sách người dùng(manage/users/listUser).(22)
	+ thêm người dùng(manage/users/addUser).(23)
	+ xóa người dùng(manage/users/deleteUser).(24)
	+ cập nhật người dùng(manage/users/editUser).(25)
	+ xem chi tiết người dùng(manage/users/detailUser).(26)
	+ trang phân công chuyên mục cho biên tập viên(manage/users/assignEditor).(27)
	+ trang gia hạn tài khoản cho đọc giả(manage/users/extensionPremium).(28)
-----------------------------------------share-------------------------------------------------------------------
* các trang chung cho các phân hệ (không dùng layout)
	- trang hiển thị thông tin cá nhân(share/showProfile).(29)	
	- trang cập nhật thông tin cá nhân(share/updateProfile).(30)
	- trang đăng nhập (share/login).(31)
	- trang đổi mật khẩu (share/updatePassword).(32)
	- trang quên mật khẩu (share/forgottenPassword).(33)
	- trang hiển thị lỗi khi có lỗi xảy ra (/error).(34)

--------------------------------------------------------------------------------------------------------
--------tạo view folder----

- vwShow
	+ 1) home.hbs: render(trang chủ)
	+ vwArticles
		2) listArticle.hbs: render(xem danh sách bài viết theo chuyên mục, xem danh sách bài viếttheo tag, kết qua tìm kiếm bài viết)
		3) detailArticle.hbs: render(xem chi tiết bài viết)
	+ vwSubscriber
		4) register.hbs: render(trang đăng kí tài khoản cho đọc giả)
		5) registerPremium.hbs: render ( trang đăng kí premium cho đọc giả)

- vwManage
	+ vwArticle
		6) listArticles.hbs: render(trang xem danh sách bài viết do phóng viên viết, xem danh sách bài viết cho administrator
				 trang xem danh sách bài viết của phong viên đăng vào chuyên mục do mình quản lý dành cho biên tập viên)
		7) detailArticle.hbs: render(trang xem chi tiết bài viết do phong viên viết, xem chi tiết bài viết administrator
				   trang xem chi tiết bài viết của phóng viên đăng vào chuyên mục do mình quản lý dành cho biên tập viên)
		8) writeArticle.hbs: render(trang viết bài viết dành cho phóng viên)
		9) editArticle.hbs: render(trang chỉnh sửa bài viết cho phóng viên, administrator)
		10) refuseArticle.hbs: render(trang từ chối bài viết)
		11) approveArticle.hbs: render( trang duyệt bài viết)
		12) addArticle.hbs: render(thêm bài viết)
		13) deleteArticle.hbs: render(xóa bài viết)	
	+ vwCategories
		14) listCategories.hbs: render(xem danh sách chuyên mục)
		15) addCategories.hbs: render(thêm chuyên mục)
		16) deleteCategories.hbs: render(xóa chuyên mục)
		17) editCategories.hbs: render(chỉnh sửa chuyên mục)
	+ vwTags
		18) listTags.hbs: render(xem danh sách Tags)
		19) addTags.hbs: render(thêm Tags)
		20) deleteTags.hbs: render(xóa Tags)
		21) editTags.hbs: render(chỉnh sửa Tags)

	+ vwUsers
		22) listUsers.hbs: render(xem danh sách User)
		23) addUsers.hbs: render(thêm User)
		24) deleteUsers.hbs: render(xóa User)
		25) editUsers.hbs: render(chỉnh sửa User)
		26) detailUser.hbs: render(chi tiết User)
		27) assignEditer.hbs: render(trang phân công chuyên mục cho biên tập viên)
		28) extensionPremium.hbs: render(trang gia hạn tài khoản premium cho đọc giả)
-vwShare	
	+ 29) showProfile.hbs: render(trang hiển thị thông tin cá nhân)
	+ 30) updateProfile.hbs: render(trang cập nhật thông tin cá nhân)
	+ 31) login.hbs: render(trang đăng nhập)
	+ 32) changePassword.hbs: render(trang thay đổi password)
	+ 33) forgottenPassword.hbs: render( trang quên password)
	+ 34) 404.hbs, 500.hbs: render( trang hiển thị lỗi)
		

---------------Tạo routers---------------


- manage.route.js: quản lý router trong file vwManager
	+ folder routes-manage: 
				+ article.route.js quản lý router trong file vwManage/vwAricles
				+ category.route.js quản lý router trong file vwManage/vwCategories
				+ tag.route.js quản lý router trong file vwManage/vwTags
				+ user.route.js quản lý router trong file vwManage/vwUsers
- show.route.js: quản lý router trong file vwShow
	+ folder routes-show:
			+ article.route.js quản lý router trong file vwShow/vwArticle
			+ subscriber.route.js quản lý router trong file vwShow/vwSubscriber
- share.route.js: quản lý router trong file vwShare


--------------Tao models-------------------
- dữ liệu thao tác
	+ chuyên mục(categories)
	+ bài viết(articles)
	+ comment
	+ tags
	+ users
	+ kiểm duyệt(censorship)
	+ phân công chuyên mục cho editor(editor_categories)
- danh sách các file model
	+ category.model.js
	+ article.model.js
	+ comment.model.js
	+ tag.model.js
	+ user.model.js
	+ censorship.model.js
	+ editor_category.model.js
				
		
