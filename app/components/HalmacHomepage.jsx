'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Phone, Mail, MapPin, ChevronDown, Instagram, Facebook, Linkedin, ArrowRight, Sparkles, Award, Users, Heart, Warehouse, Home, Building2 } from 'lucide-react';
import WhatsAppWidget from './WatsappWidget';
import PhoneNavbar from './PhoneNavbar';
import CalculatorWidget from './CalculatorWidget';
import emailjs from "@emailjs/browser";
import Link from 'next/link';


export default function HolmacHomepage() {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const observerRefs = useRef([]);
    const form = useRef(); 

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !observerRefs.current.includes(el)) {
            observerRefs.current.push(el);
        }
    };

    const navItems = [
        { id: 'gallery', label: 'GALLERY' },
        { id: 'about', label: 'ABOUT' },
        { id: 'products', label: 'PRODUCTS' },
        { id: 'contact', label: 'CONTACT' }
    ];
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        // Send email
        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
            .then(
                (result) => {
                    console.log('SUCCESS!', result.text);
                    alert('Thank you! We will contact you soon. ✅');
                    setFormData({ name: '', email: '', phone: '', message: '' });
                },
                (error) => {
                    console.error('FAILED...', error.text);
                    alert('Failed to send message. Please try again. ❌');
                }
            );
    };

    return (
        <div className="min-h-screen bg-[#f8f6f1]">
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-in { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-left { animation: fadeInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-right { animation: fadeInRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-scale { animation: scaleIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `
            }} />

            {/* Navigation */}
            <nav className="block fixed top-0 w-full z-50 transition-all duration-500"
                style={{
                    background: scrollY > 50
                        ? 'rgba(248, 246, 241, 0.98)'
                        : 'rgba(0, 0, 0, 0.2)',
                    // : 'transparent',
                    backdropFilter: scrollY > 50 ? 'blur(12px)' : 'none',
                    boxShadow: scrollY > 50 ? '0 4px 30px rgba(212, 175, 55, 0.08)' : 'none'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="flex logo items-center gap-3">
                        <img src="/holmac_circle.png" alt="Holmac" className="h-14 w-14" />
                        <div>
                            <h1 className={`md:text-2xl logofont font-semibold ${scrollY > 50 ? 'text-[#b59016] text-xl' : 'text-[#ffffff]'}`}>{scrollY > 50 ? 'HOLMAC' : 'HOLMAC INTERIOR'}</h1>
                            <p className={`md:text-sm  logofont tracking-[0.2em] ${scrollY > 50 ? 'text-[#b59016]  text-sm' : 'text-[#fbfbfb] text-[8px]'}`}>{scrollY > 50 ? 'INTERIOR' : 'INNOVATIVE IDEAS, STYLISH DESIGNS'}</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item, index) => {
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="relative flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl focus:outline-none cursor-pointer"
                                    style={{
                                        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        transitionDelay: `${index * 0.05}s`
                                    }}
                                >
                                    <span
                                        className={`
                      transition-all duration-400
                      ${scrollY > 50 ? 'text-[#2d2416]' : 'text-[#ffffff]'} 
                      relative befaft smooth hover:text-[#967c26] transition-all duration-300 text-sm tracking-wider font-light
                    `}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            )
                        })}
                        {/* <a href="#about" className={`${scrollY > 50 ? 'text-[#2d2416]' : 'text-[#ffffff]'} relative befaft smooth hover:text-[#967c26] transition-all duration-300 text-sm tracking-wider font-light`}>About</a>
                        <a href="#products" className={`${scrollY > 50 ? 'text-[#2d2416]' : 'text-[#ffffff]'} relative befaft smooth hover:text-[#967c26] transition-all duration-300 text-sm tracking-wider font-light`}>Products</a>
                        <a href="#gallery" className={`${scrollY > 50 ? 'text-[#2d2416]' : 'text-[#ffffff]'} relative befaft smooth hover:text-[#967c26] transition-all duration-300 text-sm tracking-wider font-light`}>Gallery</a>
                        <a href="#contact" className={`${scrollY > 50 ? 'text-[#2d2416]' : 'text-[#ffffff]'} relative befaft smooth px-8 py-3 bg-[#967c26] text-sm tracking-wider font-medium hover:bg-[#e6c255] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}>
                            Get in Touch
                        </a> */}
                    </div>
                </div>
            </nav>

            {/* Mobile Phone Navbar (visible on small screens) */}
            <div className="md:hidden">
                <PhoneNavbar />
            </div>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                    style={{
                        // backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90)',
                        backgroundImage: 'url(/assets/herobg.webp)',
                        transform: `scale(${1 + scrollY * 0.0003})`,
                        filter: 'brightness(0.7)'
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/60" />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <div className="overflow-hidden">
                        <h1 className="text-4xl md:text-8xl font-light text-white mb-6 tracking-wider animate-in"
                            style={{ animationDelay: '0.2s', opacity: 0 }}>
                            Contemporary Interior Design
                        </h1>
                    </div>
                    <div className="md:mt-0 mt-10 overflow-hidden">
                        <button className="px-10 py-4 bg-[#967c26] text-white text-sm tracking-widest animate-in"
                            style={{ animationDelay: '0.6s', opacity: 0 }}>
                            EXPLORE OUR WORK BELOW
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-white/60" />
                </div>
            </section>

            {/* Gallery Section - Service Categories */}
            <section
                id="gallery"
                ref={addToRefs}
                className="relative md:py-40 py-10 px-6 bg-plaster"
            >

                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center md:mb-24 mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#967c26]/10 rounded-full mb-6">
                            <Users className="w-4 h-4 text-[#967c26]" />
                            <span className="text-[#967c26] text-xs tracking-[0.2em] font-medium">OUR EXPERTISE</span>
                        </div>

                        <h2 className="md:text-6xl text-5xl font-extralight text-[#2d2416] mb-6">
                            Design <span className="text-[#967c26] italic">Solutions</span>
                        </h2>
                        <p className="text-[#5a4e3c] max-w-2xl mx-auto text-lg">
                            Transforming spaces with our signature blend of elegance and functionality
                        </p>
                    </div>

                    {/* Service Categories Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Independent House */}
                        <a
                            href="/gallery/independenthouse"
                            className={`group relative overflow-hidden rounded-sm cursor-pointer ${isVisible['gallery'] ? 'animate-scale' : 'opacity-0'}`}
                            style={{ animationDelay: '0s' }}
                        >
                            <div className="relative h-100 md:h-125 overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119784/indepented7_gadfqo.jpg"
                                    alt="Independent House Interior Design"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#2d2416] via-[#2d2416]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="px-4 py-2 bg-[#967c26] rounded-full">
                                        <Home className="w-5 h-5 text-[#ffffff] inline-block mr-2" />
                                        <span className="text-[#ffffff] text-xs tracking-wider font-medium">INDEPENDENT HOUSE</span>
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white text-3xl md:text-4xl font-light mb-3 tracking-wide">
                                        Independent House
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                                        Complete home transformations with custom lime plaster and natural finishes
                                    </p>
                                    <div className="flex items-center gap-3 text-[#967c26] text-sm font-medium tracking-wider">
                                        <span>EXPLORE DESIGNS</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </a>



                        {/* Farm House */}
                        <a
                            href="/gallery/farmhouse"
                            className={`group relative overflow-hidden rounded-sm cursor-pointer ${isVisible['gallery'] ? 'animate-scale' : 'opacity-0'}`}
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="relative h-100 md:h-125 overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119430/farm7_njzxpi.jpg"
                                    alt="Farm House Interior Design"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#2d2416] via-[#2d2416]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="px-4 py-2 bg-[#967c26] rounded-full">
                                        <Warehouse className="w-5 h-5 text-[#ffffff] inline-block mr-2" />
                                        <span className="text-[#ffffff] text-xs tracking-wider font-medium">FARM HOUSE</span>
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white text-3xl md:text-4xl font-light mb-3 tracking-wide">
                                        Farm House
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                                        Rustic elegance meets modern luxury with eco-friendly natural materials
                                    </p>
                                    <div className="flex items-center gap-3 text-[#967c26] text-sm font-medium tracking-wider">
                                        <span>EXPLORE DESIGNS</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </a>

                        {/* Apartment Interior */}
                        <a
                            href="/gallery/apartment"
                            className={`group relative overflow-hidden rounded-sm cursor-pointer ${isVisible['gallery'] ? 'animate-scale' : 'opacity-0'}`}
                            style={{ animationDelay: '0.1s' }}
                        >
                            <div className="relative h-100 md:h-125 overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118655/apartment7_la0gus.jpg"
                                    alt="Apartment Interior Design"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#2d2416] via-[#2d2416]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="px-4 py-2 bg-[#967c26] rounded-full">
                                        <Building2 className="w-5 h-5 text-[#ffffff] inline-block mr-2" />
                                        <span className="text-[#ffffff] text-xs tracking-wider font-medium">APARTMENT</span>
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white text-3xl md:text-4xl font-light mb-3 tracking-wide">
                                        Apartment Interior
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                                        Maximizing space with elegant lime-based coatings and textured finishes
                                    </p>
                                    <div className="flex items-center gap-3 text-[#967c26] text-sm font-medium tracking-wider">
                                        <span>EXPLORE DESIGNS</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </a>

                        {/* Contemporary Interior */}
                        <a
                            href="/gallery/contemporary"
                            className={`group relative overflow-hidden rounded-sm cursor-pointer ${isVisible['gallery'] ? 'animate-scale' : 'opacity-0'}`}
                            style={{ animationDelay: '0.3s' }}
                        >
                            <div className="relative h-100 md:h-125 overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119212/contemporary16_sklwfn.jpg"
                                    alt="Contemporary Interior Design"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#2d2416] via-[#2d2416]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="px-4 py-2 bg-[#967c26] rounded-full">
                                        <Sparkles className="w-5 h-5 text-[#ffffff] inline-block mr-2" />
                                        <span className="text-[#ffffff] text-xs tracking-wider font-medium">CONTEMPORARY</span>
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white text-3xl md:text-4xl font-light mb-3 tracking-wide">
                                        Contemporary Design
                                    </h3>
                                    <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                                        Sleek, modern aesthetics with premium plaster and mineral pigments
                                    </p>
                                    <div className="flex items-center gap-3 text-[#967c26] text-sm font-medium tracking-wider">
                                        <span>EXPLORE DESIGNS</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-16">
                        <p className="text-[#5a4e3c] mb-6 text-lg">
                            Can't find what you're looking for?
                        </p>
                        <Link href="/gallery" className="px-12 py-4 border-2 border-[#967c26] text-[#967c26] hover:bg-[#967c26] hover:text-white transition-all duration-300 tracking-widest text-sm font-medium rounded-sm hover:shadow-xl hover:-translate-y-1">
                            VIEW ALL PROJECTS
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section - Redesigned */}
            <section id="about" ref={addToRefs} className="relative md:py-40 py-10 px-6 bg-linear-to-br from-[#fdfcf9] via-[#f8f6f1] to-[#f5f2ea] bg-plaster overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#967c26]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#c9a552]/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left: Content */}
                        <div className={`${isVisible['about'] ? 'animate-left' : 'opacity-0'} order-last lg:order-first`}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#967c26]/10 rounded-full mb-6">
                                <Sparkles className="w-4 h-4 text-[#967c26]" />
                                <span className="text-[#967c26] text-xs tracking-[0.2em] font-medium">WHO WE ARE</span>
                            </div>

                            <h2 className="md:text-6xl text-4xl font-extralight text-[#2d2416] mb-8 leading-[1.1]">
                                Crafting<br />
                                <span className="text-[#967c26] font-light italic">Timeless</span> Elegance
                            </h2>

                            <div className="md:space-y-6 space-y-3 text-[#5a4e3c] leading-relaxed mb-10">
                                <p className="md:text-lg text-md">
                                    We specialize in <span className="text-[#967c26] font-medium">premium natural wall finishes</span> inspired by traditional lime plaster and lime-based coatings.
                                </p>
                                <p className="md:text-md text-sm">
                                    Our products are crafted from natural raw materials including finely crushed clay, premium lime, and mineral pigments to create rich, durable, and eco-friendly wall surfaces.
                                </p>
                                <p className="md:text-md text-sm">
                                    Every project is a masterpiece, with <span className="font-medium text-[#2d2416]">custom color tones</span> ensuring seamless integration with your architecture and ambiance.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8">
                                {[
                                    { num: '15+', label: 'Years Experience' },
                                    { num: '500+', label: 'Projects Done' },
                                    { num: '100%', label: 'Natural Materials' }
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-4xl font-light text-[#967c26] mb-2">{stat.num}</div>
                                        <div className="text-xs text-[#5a4e3c] tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Images Grid */}
                        <div className={`${isVisible['about'] ? 'animate-right' : 'opacity-0'} order-first lg:order-last`} style={{ animationDelay: '0.2s' }}>
                            <div className="relative">
                                {/* Main large image */}
                                <div className="relative overflow-hidden rounded-sm shadow-2xl">
                                    <img
                                        src="https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119789/indepented8_r0llrd.jpg"
                                        alt="lime Plaster"
                                        className="w-full md:h-137.5 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#2d2416]/40 to-transparent" />
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-8 md:-left-8 -left-4 bg-[#967c26] text-[#2d2416] p-3 md:p-10 rounded-sm shadow-2xl transform md:hover:scale-105 transition-transform duration-300">
                                    <Award className="md:w-12 md:h-12 w-8 h-8 mb-3" />
                                    <div className="md:text-5xl text-3xl font-extralight mb-1">15+</div>
                                    <div className="md:text-sm text-xs tracking-wider opacity-90">Years of Excellence</div>
                                </div>

                                {/* Small floating image */}
                                <div className="absolute -top-6 -right-6 md:w-48 md:h-48 w-34 h-34 overflow-hidden rounded-sm shadow-xl border-4 border-white">
                                    <img
                                        src="https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118653/apartment5_eaxtbh.jpg"
                                        alt="Detail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section - Refined */}
            <section id="products" ref={addToRefs} className="relative md:py-40 py-10 px-6 bg-[#2d2416] overflow-hidden">
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #967c26 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />

                <div className="max-w-7xl mx-auto relative">
                    {/* Header */}
                    <div className="text-center md:mb-24 mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#967c26]/10 rounded-full mb-6">
                            <Heart className="w-4 h-4 text-[#967c26]" />
                            <span className="text-[#967c26] text-xs tracking-[0.2em] font-medium">OUR SPECIALTIES</span>
                        </div>

                        <h2 className="md:text-6xl text-4xl font-extralight text-white mb-6 leading-tight">
                            Natural Wall <span className="text-[#967c26] italic">Artistry</span>
                        </h2>
                        <p className="text-[#b8985f] max-w-2xl mx-auto md:text-lg">
                            Each finish is a testament to traditional craftsmanship meets modern innovation
                        </p>
                    </div>

                    {/* Products Cards */}
                    <div className="grid lg:grid-cols-3 md:gap-8 gap-6">
                        {[
                            {
                                title: 'Lime Plaster',
                                desc: 'Authentic Italian technique with luxurious marble-like finish that adds depth and sophistication to any space.',
                                img: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768303656/lime_plaster_ncxusr.jpg',
                                features: ['Marble Effect', 'Luxurious Finish', 'Timeless Beauty'],
                                link: '/products/venetian'
                            },
                            {
                                title: 'Lime-Based Coating',
                                desc: 'Breathable, eco-friendly finish perfect for modern spaces with natural texture and sustainable properties.',
                                img: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768303654/limebased_fyxspw.jpg',
                                features: ['Eco-Friendly', 'Breathable', 'Natural Texture'],
                                link: '/products/limebased'
                            },
                            {
                                title: 'Textured Finishes',
                                desc: 'Custom textures using natural clay and mineral pigments for unique character and artistic expression.',
                                img: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768303654/textured_zumyvh.jpg',
                                features: ['Custom Design', 'Mineral Pigments', 'Unique Patterns'],
                                link: '/products/textured'
                            }
                        ].map((product, idx) => (
                            <a
                                key={idx}
                                href={product.link}
                                className={`group block ${isVisible['products'] ? 'animate-scale' : 'opacity-0'}`}
                                style={{ animationDelay: `${idx * 0.15}s` }}
                                onMouseEnter={() => setHoveredProduct(idx)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className="relative bg-[#3a2f1f] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#967c26]/10 h-full flex flex-col" style={{ borderRadius: '2px' }}>
                                    {/* Image Container - Fixed Height */}
                                    <div className="relative h-72 overflow-hidden">
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#2d2416] via-[#2d2416]/20 to-transparent opacity-70" />

                                        {/* Hover overlay with shimmer effect */}
                                        <div className={`absolute inset-0 bg-linear-to-br from-[#967c26]/30 via-[#967c26]/10 to-transparent transition-all duration-700 ${hoveredProduct === idx ? 'opacity-100' : 'opacity-0'}`} />

                                        {/* Hover border glow */}
                                        <div className={`absolute inset-0 border-2 border-[#967c26] transition-opacity duration-500 ${hoveredProduct === idx ? 'opacity-30' : 'opacity-0'}`} style={{ borderRadius: '2px' }} />
                                    </div>

                                    {/* Content Container - Flexible Height */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="text-2xl md:text-3xl font-light text-white mb-4 group-hover:text-[#967c26] transition-colors duration-300 tracking-wide">
                                            {product.title}
                                        </h3>
                                        <p className="text-[#b8985f] leading-relaxed mb-6 flex-1 text-sm md:text-base">
                                            {product.desc}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {product.features.map((feature, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-[#967c26]/10 text-[#967c26] text-xs tracking-wider group-hover:bg-[#967c26]/20 transition-colors duration-300"
                                                    style={{ borderRadius: '2px' }}
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Button */}
                                        <div className="flex items-center gap-2 text-[#967c26] text-sm tracking-wider font-light group-hover:gap-4 transition-all duration-300">
                                            <span className="group-hover:tracking-widest transition-all duration-300">Learn More</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Bottom accent line that grows on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#967c26] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="relative md:py-40 py-10 px-6 bg-[#f5f2ea] overflow-hidden bg-plaster">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="md:text-6xl text-5xl font-extralight text-[#2d2416] mb-4">
                            Why <span className="text-[#967c26] italic">Choose</span> Us?
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            {
                                icon: <Sparkles className="w-8 h-8" />,
                                title: 'Eco-Friendly',
                                desc: 'Natural & sustainable materials sourced responsibly'
                            },
                            {
                                icon: <Heart className="w-8 h-8" />,
                                title: 'Custom Colors',
                                desc: 'Infinite possibilities tailored to your exact vision'
                            },
                            {
                                icon: <Award className="w-8 h-8" />,
                                title: 'Expert Craftsmanship',
                                desc: '15+ years of traditional techniques perfected'
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: 'Lasting Beauty',
                                desc: 'Durable finishes that stand the test of time'
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="group text-center">
                                <div className="md:w-20 md:h-20 w-12 h-12 mx-auto mb-6 border-2 border-[#967c26] rounded-sm flex items-center justify-center text-[#967c26] group-hover:bg-[#967c26] group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                    {feature.icon}
                                </div>
                                <h3 className="md:text-2xl text-lg md:font-light font-semibold text-[#2d2416] mb-4 tracking-wide">
                                    {feature.title}
                                </h3>
                                <p className="text-[#5a4e3c] md:text-md text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section - Premium Design */}
            <section id="contact" ref={addToRefs} className="relative md:py-40 py-10 px-6 bg-[#2d2416] overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-125 h-125 bg-[#967c26]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-150 h-150 bg-[#c9a552]/5 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 md:gap-20 gap-10">

                        {/* Left: Info */}
                        <div className={isVisible['contact'] ? 'animate-left' : 'opacity-0'}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#967c26]/10 rounded-full mb-6">
                                <Mail className="w-4 h-4 text-[#967c26]" />
                                <span className="text-[#967c26] text-xs tracking-[0.2em] font-medium">GET IN TOUCH</span>
                            </div>

                            <h2 className="md:text-6xl text-4xl font-extralight text-white md:mb-8 mb-4 leading-[1.1]">
                                Let's Create<br />
                                Something <span className="text-[#967c26] italic">Beautiful</span>
                            </h2>

                            <p className="text-[#b8985f] leading-relaxed md:text-lg md:mb-16 mb-10">
                                Ready to transform your space? Contact us for a consultation and discover how our natural wall finishes can elevate your interiors.
                            </p>

                            {/* Contact Cards */}
                            <div className="md:space-y-6 space-y-4">
                                <div className="flex items-start gap-5 md:p-6 p-4 bg-[#3a2f1f] rounded-sm hover:bg-[#44352a] transition-colors duration-300">
                                    <div className="w-14 h-14 bg-[#967c26]/10 rounded-sm flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-[#967c26]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-2 tracking-wide">Call Us</p>
                                        <a href="tel:+919916511351" aria-label="Call +91 9916511351" className="text-[#b8985f] mb-1 inline-block">+91 9916511351</a>
                                        <a href="tel:+919164315156" aria-label="Call +91 9164315156" className="text-[#b8985f] inline-block">+91 9164315156</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 p-6 bg-[#3a2f1f] rounded-sm hover:bg-[#44352a] transition-colors duration-300">
                                    <div className="w-14 h-14 bg-[#967c26]/10 rounded-sm flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-[#967c26]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-2 tracking-wide">Email</p>
                                        <a href="mailto:holmac135@gmail.com" aria-label="Email holmac135@gmail.com" className="text-[#b8985f]">holmac135@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 p-6 bg-[#3a2f1f] rounded-sm hover:bg-[#44352a] transition-colors duration-300">
                                    <div className="w-14 h-14 bg-[#967c26]/10 rounded-sm flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-[#967c26]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-2 tracking-wide">Location</p>
                                        <a
                                            href="https://maps.app.goo.gl/occaCGDPHobXw62ZA"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#b8985f]"
                                        >
                                            Udupi / Mangaluru, Karnataka
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className={isVisible['contact'] ? 'animate-right' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
                            <div className="bg-[#3a2f1f] md:p-10 p-4 rounded-sm">
                                <h3 className="text-2xl font-light text-white mb-8 tracking-wide">Send us a message</h3>

                                <div className="space-y-6">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-6 py-4 bg-[#2d2416] text-white placeholder-[#b8985f]/50 border border-[#967c26]/20 focus:border-[#967c26] outline-none transition-all duration-300 rounded-sm"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-6 py-4 bg-[#2d2416] text-white placeholder-[#b8985f]/50 border border-[#967c26]/20 focus:border-[#967c26] outline-none transition-all duration-300 rounded-sm"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-6 py-4 bg-[#2d2416] text-white placeholder-[#b8985f]/50 border border-[#967c26]/20 focus:border-[#967c26] outline-none transition-all duration-300 rounded-sm"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Tell us about your project"
                                            rows="5"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-6 py-4 bg-[#2d2416] text-white placeholder-[#b8985f]/50 border border-[#967c26]/20 focus:border-[#967c26] outline-none transition-all duration-300 resize-none rounded-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-4 bg-[#967c26] text-[#2d2416] tracking-widest font-medium hover:bg-[#e6c255] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 rounded-sm flex items-center justify-center gap-2 group">
                                        SEND MESSAGE
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CalculatorWidget
                onClick={() => console.log('Calculator clicked')}
                label="GET FREE ESTIMATE"
                buttonText="EMI"
            />
            <WhatsAppWidget
                phoneNumber="919916511351"
                message="Hi Holmac team, I saw your website and would like to get a quote for my project."
            />
            {/* Footer */}
            <footer className="bg-[#1a1410] text-white md:py-20 py-8 px-6 border-t border-[#967c26]/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 md:gap-16 gap-10 md:mb-16 mb-6">

                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <img src="/holmac_circle.png" alt="Holmac" className="h-12 w-12" />
                                <div>
                                    <h3 className="text-xl font-light tracking-[0.2em]">HOLMAC</h3>
                                    <p className="text-xs text-[#b8985f] tracking-[0.3em]">INTERIOR</p>
                                </div>
                            </div>
                            <p className="text-[#b8985f] text-sm leading-relaxed mb-6">
                                Premium natural wall finishes for timeless elegance and sustainable beauty.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                <a href="https://www.instagram.com/holmac_interior" className="w-10 h-10 border border-[#967c26]/30 hover:border-[#967c26] hover:bg-[#967c26]/10 flex items-center justify-center transition-all duration-300 rounded-sm group">
                                    <Instagram className="w-5 h-5 text-[#b8985f] group-hover:text-[#967c26] transition-colors" />
                                </a>
                                <a href="https://www.facebook.com/share/17rxkvn9qh/" className="w-10 h-10 border border-[#967c26]/30 hover:border-[#967c26] hover:bg-[#967c26]/10 flex items-center justify-center transition-all duration-300 rounded-sm group">
                                    <Facebook className="w-5 h-5 text-[#b8985f] group-hover:text-[#967c26] transition-colors" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        {/* <div>
                            <h4 className="text-sm tracking-[0.2em] md:mb-6 mb-2 text-[#967c26] font-medium">QUICK LINKS</h4>
                            <ul className="md:space-y-3 space-y-2">
                                <li><a href="#about" className="text-[#b8985f] hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">About Us</a></li>
                                <li><a href="#products" className="text-[#b8985f] hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">Our Products</a></li>
                                <li><a href="#gallery" className="text-[#b8985f] hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">Portfolio</a></li>
                                <li><a href="#contact" className="text-[#b8985f] hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-300">Contact Us</a></li>
                            </ul>
                        </div> */}

                        {/* Services */}
                        <div>
                            <h4 className="text-sm tracking-[0.2em] mb-6 text-[#967c26] font-medium">OUR SERVICES</h4>
                            <ul className="space-y-3 text-sm text-[#b8985f]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#967c26] mt-1">•</span>
                                    Lime Plaster
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#967c26] mt-1">•</span>
                                    Lime-Based Coatings
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#967c26] mt-1">•</span>
                                    Textured Finishes
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#967c26] mt-1">•</span>
                                    Color Consultation
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#967c26] mt-1">•</span>
                                    Custom Projects
                                </li>
                            </ul>
                        </div>
                        {/* Contact Info */}
                        <div>
                            <h4 className="text-sm tracking-[0.2em] mb-6 text-[#967c26] font-medium">REACH US</h4>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-[#967c26] mt-1 shrink-0" />
                                    <div className="text-[#b8985f]">
                                        <a href="tel:+919916511351" aria-label="Call +91 9916511351">+91 9916511351</a>
                                        <br />
                                        <a href="tel:+919164315156" aria-label="Call +91 9164315156">+91 9164315156</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-[#967c26] mt-1 shrink-0" />
                                    <a href="mailto:holmac135@gmail.com" className="text-[#b8985f]">holmac135@gmail.com</a>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-[#967c26] mt-1 shrink-0" />
                                    <a
                                        href="https://maps.app.goo.gl/occaCGDPHobXw62ZA"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#b8985f]"
                                    >
                                        Udupi / Mangaluru<br />Karnataka, India
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-[#967c26]/10 pt-8 md:mb-0 mb-20 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[#b8985f] text-sm">
                            © {new Date().getFullYear()} Holmac Interior. All rights reserved.
                        </p>
                        {/* <div className="flex gap-6 text-sm text-[#b8985f]">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div> */}
                    </div>
                </div>
            </footer>
        </div>
    );
}