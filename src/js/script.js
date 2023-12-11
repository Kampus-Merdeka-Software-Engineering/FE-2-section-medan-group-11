function goToKota() {
    window.location.href = "./page/kota.html";
    return false;
}

function goToKos() {
    window.location.href = "jakarta.html";
    return false;
}

function goToHome() {
    window.location.href = "../index.html";
    return false;
}

function goToKosPage() {
    window.location.href = "./kos.html";
    return false;
}

function goToAbout() {
    window.location.href = "./page/about.html";
    return false;
}

function goToKosInfo() {
    window.location.href = "information.html";
    return false;
}

function goToHasil() {
    window.location.href = "/page/hasil.html";
    return false;
}

document.getElementById('pesanButton').addEventListener('click', function () {
    window.location.href = 'booked.html'; 
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const targetOffset = targetSection.offsetTop - document.querySelector('header').offsetHeight;
                const initialPosition = window.scrollY;
                const duration = 800; 
                let startTime;

                function scrollAnimation(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const progress = currentTime - startTime;

                    window.scrollTo(0, easeInOutCubic(progress, initialPosition, targetOffset, duration));

                    if (progress < duration) {
                        requestAnimationFrame(scrollAnimation);
                    }
                }

                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }

                requestAnimationFrame(scrollAnimation);
            }
        });
    });

    const teamCarousel = document.querySelector(".team-carousel");
    const arrowLeft = document.querySelector(".fa-arrow-left");
    const arrowRight = document.querySelector(".fa-arrow-right");

    let translateValue = 0;
    const itemWidth = document.querySelector(".team-item").offsetWidth + 15; // Adjust the value based on your design

    arrowLeft.addEventListener("click", function () {
        translateValue += itemWidth;
        updateCarousel();
    });

    arrowRight.addEventListener("click", function () {
        translateValue -= itemWidth;
        updateCarousel();
    });

    function updateCarousel() {
        const maxTranslate = (teamCarousel.children.length - 5) * itemWidth; // Adjust the value based on the number of visible items
        if (translateValue > 0) {
            translateValue = -maxTranslate;
        } else if (translateValue < -maxTranslate) {
            translateValue = 0;
        }
        teamCarousel.style.transform = `translateX(${translateValue}px)`;
    }

    // Owl Carousel initialization for ".team-carousel"
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Owl Carousel initialization for ".testimonial-carousel"
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
});

async function inputBooking(nama,email,telp, tgl_pesan, rcn_pesan, jumlah, tipe){
    let data = {
        nama : nama,
        email : email,
        telp : telp,
        tgl_pesan : tgl_pesan,
        rcn_pesan : rcn_pesan,
        jumlah : jumlah,
        tipe : tipe
    }

    let response = await fetch("https://kind-jade-wasp-wig.cyclic.app/booking", {
        method : "POST",
        body : JSON.stringify(data),
        headers : {'Content-type': 'application/json; charset=UTF-8',}
    })
    let result = await response.json()
    console.log(result);
    alert("Data Anda Sudah Kami Terima");
}

function submitBooking() {
    const namaInput = document.getElementById("nama").value;
    const emailInput = document.getElementById("email").value;
    const teleponInput = document.getElementById("telp").value;
    const tgl_pesanInput = document.getElementById("tanggal_checkin").value;
    const rcn_pesanInput = document.getElementById("time").value;
    const jumlahInput = document.getElementById("jumlah_orang").value;
    const tipeInput = document.getElementById("tipe_kamar").v
    inputBooking(namaInput, emailInput, teleponInput, tgl_pesanInput, rcn_pesanInput, jumlahInput,tipeInput);
  }
  const inputButton = document.getElementById("input");
  inputButton.addEventListener("click", submitBooking);