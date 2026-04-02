// Khởi tạo Swiper (Vertical Slider ấn tượng)
const swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: {
        releaseOnEdges: true, // Nhả chuột tự động sang slide tiếp theo khi cuộn hết nội dung
    },
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

// ==================================
// 3. TÍNH NĂNG CUSTOM CURSOR
// ==================================
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Cập nhật vị trí chuột liên tục
window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline animate kéo thả nhẹ phía sau trỏ chuột gốc
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 400, fill: "forwards" });
});

// Sự kiện vòng sáng phình ra ngậm trọn đối tượng khi rê qua phím tắt
setTimeout(() => {
    const hoverElements = document.querySelectorAll('a, button, .color-btn, .camera-icon, .vinyl-record, .swiper-button-next, .swiper-button-prev');
    hoverElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.background = 'rgba(255,255,255,0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '35px';
            cursorOutline.style.height = '35px';
            cursorOutline.style.background = 'transparent';
        });
    });
}, 1000);

// ==================================
// 4. PARTICLES JS (MẠNG LƯỚI KHÔNG GIAN)
// ==================================
if (window.particlesJS) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.2, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 150, "line_linked": { "opacity": 0.8 } },
                "push": { "particles_nb": 2 }
            }
        },
        "retina_detect": true
    });
}

// ==================================
// 5. CAROUSEL DỰ ÁN & MUSIC PLAYER
// ==================================

// Khởi động kho chứa dự án vuốt trong Swiper nằm ngang
const projectSwiper = new Swiper(".projectSwiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 20,
    mousewheel: false, // Tắt kéo chuột cho list dọc
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        700: { slidesPerView: 2 }
    }
});

// Điều khiển Đĩa than Nhạc
const musicPlayer = document.getElementById('musicPlayer');
const bgMusic = document.getElementById('bgMusic');

musicPlayer.addEventListener('click', () => {
    if(bgMusic.paused) {
        bgMusic.play();
        musicPlayer.classList.add('playing');
        bgMusic.volume = 0.5; // Đặt loa vừa phải
    } else {
        bgMusic.pause();
        musicPlayer.classList.remove('playing');
    }
});

// ==================================
// 6. HIỆU ỨNG GÕ CHỮ (TYPING EFFECT)
// ==================================
const textArray = "Xin chào! Rất trùng hợp và may mắn khi chúng ta có duyên kết nối qua không gian này. Trong thế giới B2B, mọi cơ hội lớn đều bắt đầu từ một cuộc trò chuyện nhỏ. Nếu bạn đang tìm kiếm chiến lược mở rộng kênh phân phối, hay muốn chia sẻ ý tưởng kinh doanh, hãy để lại lời nhắn cho tôi ở hộp thư góc phải nhé. Tôi luôn sẵn sàng lắng nghe và kết nối!".split('');
const typedTextElement = document.getElementById('typedText');

if(typedTextElement) {
    let charIndex = 0;
    function typeEffect() {
        if (charIndex < textArray.length) {
            typedTextElement.textContent += textArray[charIndex];
            charIndex++;
            // Tốc độ gõ ngẫu nhiên 
            let typingSpeed = Math.floor(Math.random() * (50 - 20 + 1)) + 20; 
            if (textArray[charIndex - 1] === '.' || textArray[charIndex - 1] === ',') {
                typingSpeed += 400; // Nghỉ lấy hơi ở dấu chấm
            }
            setTimeout(typeEffect, typingSpeed);
        }
    }
    // Gõ sau 3.5 giây 
    setTimeout(typeEffect, 3500);
}

const typingBoxPanel = document.getElementById('typingBox');
const closeTypingIcon = document.getElementById('closeTypingIcon');
const closeTypingBtn = document.getElementById('closeTypingBtn');
if(typingBoxPanel && closeTypingIcon && closeTypingBtn) {
    closeTypingIcon.addEventListener('click', () => typingBoxPanel.style.display = 'none');
    closeTypingBtn.addEventListener('click', () => typingBoxPanel.style.display = 'none');
}

// ==================================
// 7. HỆ THỐNG CỬA SỔ LẤY DATA (FORMSUBMIT)
// ==================================
const chatToggleBtn = document.getElementById('chatToggle');
const closeChatBtn = document.getElementById('closeChat');
const chatBox = document.getElementById('chatBox');

if(chatToggleBtn && chatBox) {
    chatToggleBtn.addEventListener('click', () => {
        chatBox.classList.add('show');
        chatToggleBtn.style.display = 'none'; // Giấu cục tròn đi
        
        // Truyền URL của trang hiện tại để FormSubmit chuyển về đỡ bị lạc
        const formInputNext = document.querySelector('input[name="_next"]');
        if(formInputNext) {
            formInputNext.value = window.location.href;
        }
    });

    closeChatBtn.addEventListener('click', () => {
        chatBox.classList.remove('show');
        setTimeout(() => { chatToggleBtn.style.display = 'flex'; }, 300);
    });
}
