/* ===================================
   دليل الفعاليات - ملف الجافاسكربت
   =================================== */

// =============================
// 1. functions فلترة الفعاليات
// =============================
const search = document.getElementById("search");
const category = document.getElementById("category");
const date = document.getElementById("date");

if (search) {
    search.addEventListener("keyup", filter);
    category.addEventListener("change", filter);
    date.addEventListener("change", filter);
}

function filter() {
    let value = search.value.toLowerCase();
    let cat = category.value;
    let selectedDate = date.value;

    document.querySelectorAll(".event").forEach(e => {
        let text = e.innerText.toLowerCase();
        let matchText = text.includes(value);
        let matchCat = cat === "" || e.dataset.category === cat;
        let matchDate = selectedDate === "" || e.dataset.date === selectedDate;

        e.style.display = (matchText && matchCat && matchDate) ? "block" : "none";
    });

    // حفظ تفضيلات البحث في localStorage
    if (cat) {
        localStorage.setItem("preferredCategory", cat);
    }
}

// استعادة تفضيلات التصنيف عند تحميل الصفحة
window.addEventListener("load", function() {
    const savedCategory = localStorage.getItem("preferredCategory");
    if (savedCategory && category) {
        category.value = savedCategory;
        filter();
    }
});

// =============================
// 2. Dark Mode Toggle
// =============================
function toggleDark() {
    document.body.classList.toggle("dark");
    
    // حفظ preference في localStorage
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
}

// استعادة Dark Mode عند تحميل الصفحة
window.addEventListener("load", function() {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
        document.body.classList.add("dark");
    }
});

// =============================
// 3. Scroll to Top Button
// =============================
const topBtn = document.getElementById("topBtn");

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// إظهار/إخفاء الزر عند التمرير
window.addEventListener("scroll", function() {
    if (topBtn) {
        if (window.scrollY > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
});

// =============================
// 4. Contact Form Validation
// =============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        const alertBox = document.getElementById("alertBox");
        
        let isValid = true;
        let errorMessage = "";

        // التحقق من الاسم
        if (name.value.length < 3) {
            name.classList.add("is-invalid");
            isValid = false;
            errorMessage = "الرجاء إدخال اسم صحيح (3 أحرف على الأقل)";
        } else {
            name.classList.remove("is-invalid");
        }

        // التحقق من البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add("is-invalid");
            isValid = false;
            errorMessage = "الرجاء إدخال بريد إلكتروني صحيح";
        } else {
            email.classList.remove("is-invalid");
        }

        // التحقق من الرسالة
        if (message.value.length < 10) {
            message.classList.add("is-invalid");
            isValid = false;
            errorMessage = "الرجاء إدخال رسالة (10 أحرف على الأقل)";
        } else {
            message.classList.remove("is-invalid");
        }

        // عرض رسالة النجاح أو الخطأ
        if (alertBox) {
            if (isValid) {
                alertBox.style.display = "block";
                alertBox.className = "alert alert-success mt-3";
                alertBox.innerHTML = "<strong>✓ تم!</strong> تم إرسال رسالتك بنجاح. سنرد عليك قريباً.";
                
                // مسح النموذج
                contactForm.reset();
                
                // إخفاء الرسالة بعد 5 ثوانٍ
                setTimeout(function() {
                    alertBox.style.display = "none";
                }, 5000);
            } else {
                alertBox.style.display = "block";
                alertBox.className = "alert alert-danger mt-3";
                alertBox.innerHTML = "<strong>✗ خطأ!</strong> " + errorMessage;
            }
        }
    });
}

// =============================
// 5. Responsive Navbar
// =============================
document.addEventListener("DOMContentLoaded", function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navMenu) {
        navbarToggler.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
});

// =============================
// 6. تابة Cards عند Hover
// =============================
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
