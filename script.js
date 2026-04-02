// Khởi tạo Swiper (Vertical Slider ấn tượng)
const swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true, // Xoay chuột là đổi slide
    speed: 800, // Tốc độ mượt mà
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// ==================================
// 1. TÍNH NĂNG COLOR THEME PICKER 
// ==================================
const themeBtns = document.querySelectorAll('.color-btn');
const root = document.documentElement;

// Lấy theme cũ từ LocalStorage (nếu người dùng đã chọn trước đó)
const savedTheme = localStorage.getItem('myPortfolioTheme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
}

// Bắt sự kiện người dùng bấm chọn màu
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        root.setAttribute('data-theme', color);
        localStorage.setItem('myPortfolioTheme', color); // Lưu lại màu
    });
});

// ==================================
// 2. TÍNH NĂNG UPLOAD LƯU LIVE AVATAR 
// ==================================
const openUploadBtn = document.getElementById('openUpload');
const avatarInput = document.getElementById('avatarUpload');
const profileImage = document.getElementById('profileImage');

// Lấy avatar cũ từ LocalStorage (nếu người dùng đã tải lên đổi ảnh máy họ)
const savedAvatar = localStorage.getItem('myPortfolioAvatar');
if (savedAvatar) {
    profileImage.src = savedAvatar;
}

// Khi bấm nút camera -> Kích hoạt thẻ input hidden
openUploadBtn.addEventListener('click', () => {
    avatarInput.click();
});

// Khi một file (hình ảnh) được chọn
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        // Khi đọc file xong
        reader.onload = function(event) {
            const imageDataUrl = event.target.result;
            // Thay đổi src của ảnh trên giao diện ngay lập tức
            profileImage.src = imageDataUrl;
            
            // Lưu thông tin bức ảnh vừa tải vào LocalStorage để nhớ lần sau tải lại trang
            try {
                localStorage.setItem('myPortfolioAvatar', imageDataUrl);
            } catch (e) {
                console.warn("Dung lượng ảnh quá lớn để lưu vào LocalStorage.");
            }
        };
        
        // Đọc dữ liệu thành dạng URL gốc base64 để hiển thị
        reader.readAsDataURL(file);
    }
});
