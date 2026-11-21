/* =========================================
   AURÉVIA - INTERACTIVE SCRIPTS
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Content Animation
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.hero-content p', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-btns', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-image', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
    }, '-=1');

    // 2. Section Title Animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // 3. Collection Cards Staggered Animation
    gsap.from('.collection-card', {
        scrollTrigger: {
            trigger: '.collections-grid',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // 4. Product Cards Reveal
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 80%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // 5. Experience Section Reveal
    gsap.from('.experience-img', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 70%'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.experience-content', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 70%'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    // 6. Gifting Boxes Stagger
    gsap.from('.gift-box', {
        scrollTrigger: {
            trigger: '.gifting-grid',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // 7. Testimonials Animation
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: 'top 80%'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });

    // 8. Sticky Navbar Effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'var(--shadow-soft)';
            return;
        }

        if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s ease';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = 'var(--shadow-card)';
        }
        lastScroll = currentScroll;
    });

    // 9. Simple Cart Interaction
    const cartBtns = document.querySelectorAll('.product-card .btn-primary');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    cartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            count++;
            cartCount.textContent = count;
            
            // Subtle button animation
            gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
            
            // Pop the cart icon
            gsap.to('.cart-icon', { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
        });
    });

    // 10. Mobile Menu Toggle (Simplified)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu feature coming soon - navigating in luxury takes time.');
        });
    }

    // 11. Shop Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.shop-grid .product-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                products.forEach(product => {
                    const productCat = product.getAttribute('data-category');
                    
                    if (category === 'all' || category === productCat) {
                        product.style.display = 'block';
                        gsap.to(product, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    } else {
                        gsap.to(product, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.3,
                            ease: 'power2.in',
                            onComplete: () => {
                                product.style.display = 'none';
                            }
                        });
                    }
                });
            });
        });
    }

    // 12. Shop Hero Animation
    if (document.querySelector('.shop-hero')) {
        gsap.from('.shop-hero h1', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // 13. Product Gallery Switcher
    const thumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('current-img');

    if (thumbs.length > 0) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                gsap.to(mainImg, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.2,
                    onComplete: () => {
                        mainImg.src = thumb.src;
                        gsap.to(mainImg, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        });
    }

    // 14. Product Quantity Logic
    const plusBtn = document.getElementById('plus');
    const minusBtn = document.getElementById('minus');
    const qtyInput = document.getElementById('qty-input');

    if (plusBtn && minusBtn) {
        plusBtn.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });

        minusBtn.addEventListener('click', () => {
            if (parseInt(qtyInput.value) > 1) {
                qtyInput.value = parseInt(qtyInput.value) - 1;
            }
        });
    }

    // 15. Tabs Logic
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const target = link.getAttribute('data-tab');

                tabLinks.forEach(l => l.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                link.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }

    // 16. Product Detail Reveal
    if (document.querySelector('.product-detail-flex')) {
        gsap.from('.product-gallery', {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        gsap.from('.product-info-panel > *', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }
});
