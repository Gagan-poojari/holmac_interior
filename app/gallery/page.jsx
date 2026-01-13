"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft, Home, Building2, Warehouse, Sparkles,
    Play, X, Filter, ArrowUpRight, Search,
    ChevronRight, Phone, Mail, MapPin, Layers
} from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function MainGallery() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isVisible, setIsVisible] = useState({});
    const [scrollY, setScrollY] = useState(0);
    const observerRefs = useRef([]);

    // --- ASSET CONFIGURATION ---
    const featuredVideos = [
        { id: 'v1', title: '', thumbnail: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119201/contemporary2_iaeenq.jpg', videoUrl: 'https://res.cloudinary.com/djfxdsmvk/video/upload/v1768142044/video5_l6oov6.mp4' },
        { id: 'v2', title: '', thumbnail: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119124/contemporary3_qy5wk4.jpg', videoUrl: 'https://res.cloudinary.com/djfxdsmvk/video/upload/v1768142083/video3_nrcaar.mp4' },
        { id: 'v3', title: '', thumbnail: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119212/contemporary16_sklwfn.jpg', videoUrl: 'https://res.cloudinary.com/djfxdsmvk/video/upload/v1768142129/video2_x76vqv.mp4' },
        { id: 'v4', title: '', thumbnail: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119204/contemporary10_ubsk31.jpg', videoUrl: 'https://res.cloudinary.com/djfxdsmvk/video/upload/v1768142133/video_wec4hs.mp4' },
        { id: 'v5', title: '', thumbnail: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119424/farm1_ubv4hh.jpg', videoUrl: 'https://res.cloudinary.com/djfxdsmvk/video/upload/v1768142195/video4_vk8jnh.mp4' },
        { id: 'v6', title: '', thumbnail: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119784/indepented7_gadfqo.jpg', videoUrl: 'https://res.cloudinary.com/djfxdsmvk/video/upload/v1768142334/video6_vqi0jl.mp4' },
    ];

    const allProjects = [
        { id: 1, category: 'Independent House', title: 'Independent House Interior', image: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119784/indepented7_gadfqo.jpg', link: '/gallery/independenthouse' },
        { id: 3, category: 'Farm House', title: 'Farm House Interior', image: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119430/farm7_njzxpi.jpg', link: '/gallery/farmhouse' },
        { id: 4, category: 'Contemporary', title: 'Contemporary Interior', image: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118655/apartment7_la0gus.jpg', link: '/gallery/contemporary' },
        { id: 2, category: 'Apartment', title: 'Apartment Interior', image: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768119212/contemporary16_sklwfn.jpg', link: '/gallery/apartment' },
    ];

    const categories = ['All', 'Independent House', 'Apartment', 'Farm House', 'Contemporary'];

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            });
        }, { threshold: 0.1 });

        observerRefs.current.forEach(ref => ref && observer.observe(ref));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const filteredProjects = activeFilter === 'All'
        ? allProjects
        : allProjects.filter(p => p.category === activeFilter);

    return (
        <div className="min-h-screen bg-plaster">
            {/* Signature Navbar */}
            <nav className="fixed top-0 w-full z-50 transition-all duration-500"
                style={{
                    background: scrollY > 50 ? 'rgba(250, 250, 248, 0.85)' : 'rgba(250, 250, 248, 0.6)',
                    backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
                    borderBottom: scrollY > 50 ? '1px solid rgba(212, 175, 55, 0.1)' : 'none'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 text-[#4a4237] hover:text-[#d4af37] transition-all duration-300 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-light tracking-wider hidden sm:inline">Return Home</span>
                    </a>

                    <div className="flex items-center gap-3">
                        <img src="/holmac_circle.png" alt="Holmac" className="h-11 w-11" />
                        <div className="hidden sm:block">
                            <h1 className="logofont text-base font-medium text-[#2d2416] tracking-wide uppercase">HOLMAC</h1>
                            <p className="logofont text-xs tracking-widest text-[#b59016] font-light">INTERIOR</p>
                        </div>
                    </div>

                    <div className="hidden md:flex gap-8">
                        <a href="#projects" className="text-xs tracking-widest text-[#2d2416] hover:text-[#d4af37] font-medium transition-colors">PROJECTS</a>
                        <a href="#video-tour" className="text-xs tracking-widest text-[#2d2416] hover:text-[#d4af37] font-medium transition-colors">VIDEO TOUR</a>
                    </div>
                </div>
            </nav>

            {/* Gallery Hero */}
            <section className="pt-40 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div id="video-tour" className="grid lg:grid-cols-12 gap-12 items-end mb-20">
                        <div className="lg:col-span-7">
                            <span className="text-[#d4af37] text-xs tracking-[0.4em] font-bold uppercase block mb-4">Master Portfolio</span>
                            <h2 className="text-5xl md:text-7xl font-extralight tracking-tight text-[#2d2416] leading-none mb-6">
                                Design <br /> <span className="italic text-[#d4af37] font-light">Chronicles</span>
                            </h2>
                            <p className="text-[#6b6257] max-w-md font-light leading-relaxed">
                                A comprehensive showcase of textures, light, and architectural innovation across our premium residential projects.
                            </p>
                        </div>
                        <div className="lg:col-span-5 flex gap-4 overflow-x-auto pb-4 elegant-scroll">
                            {featuredVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="relative shrink-0 w-64 h-40 rounded-sm overflow-hidden group cursor-pointer border border-[#d4af37]/10"
                                    onClick={() => setSelectedVideo(video.videoUrl)}
                                >
                                    <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                    <div className="absolute inset-0 bg-[#2d2416]/40 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#d4af37] transition-all">
                                            <Play className="w-4 h-4 text-white fill-current" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <p className="text-white text-[9px] tracking-[0.2em] uppercase font-medium">{video.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highly Functional Filter Bar */}
                    <div id="projects" className="sticky top-20 z-40 bg-plaster/90 backdrop-blur-md py-6 border-y border-[#d4af37]/10 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex gap-4 md:gap-10 overflow-x-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`text-[10px] tracking-[0.3em] uppercase whitespace-nowrap pb-2 transition-all relative font-bold ${activeFilter === cat ? 'text-[#d4af37]' : 'text-[#6b6257] hover:text-[#2d2416]'
                                        }`}
                                >
                                    {cat}
                                    {activeFilter === cat && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37] transform origin-left transition-transform scale-x-100" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mt-16">
                        {filteredProjects.map((project) => (
                            <a
                                key={project.id}
                                href={project.link}
                                className="group block"
                            >
                                <div className="relative aspect-4/5 overflow-hidden mb-6 bg-[#f0f0f0] border border-[#d4af37]/5">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                                            <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-px bg-[#d4af37]" />
                                        <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-bold">{project.category}</span>
                                    </div>
                                    <h3 className="text-2xl font-extralight tracking-wide text-[#2d2416] group-hover:text-[#d4af37] transition-colors">{project.title}</h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Signature Footer */}
            <footer className="bg-[#2d2416] pt-24 pb-12 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 skew-x-12 translate-x-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 mb-20">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-3 mb-8">
                                <img src="/holmac_circle.png" alt="Holmac" className="h-12 w-12 brightness-110" />
                                <div>
                                    <h2 className="text-xl font-medium text-white tracking-widest uppercase">HOLMAC</h2>
                                    <p className="text-xs tracking-[0.4em] text-[#d4af37] font-light">INTERIOR</p>
                                </div>
                            </div>
                            <p className="text-[#c9b896] font-light leading-relaxed mb-8 max-w-sm">
                                Elevating residential and commercial spaces through specialized textures, mineral finishes, and avant-garde interior solutions.
                            </p>
                            <div className="flex gap-4">
                                {[
                                    { Icon: FaInstagram, link: 'https://www.instagram.com/holmac_interior/' },
                                    { Icon: FaWhatsapp, link: 'https://wa.me/919916511351' },
                                    { Icon: FaFacebookF, link: 'https://www.facebook.com/share/17rxkvn9qh/' }
                                ].map(({ Icon, link }, i) => (
                                    <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2d2416] transition-all duration-300"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-white text-xs tracking-[0.3em] font-bold mb-8 uppercase">Contact Details</h4>
                                <div className="space-y-6">
                                    <a 
                            href="tel:+919164315156" 
                            aria-label="Call +91 9164315156"
                                className="space-y-2">
                                <Phone className="w-4 h-4 text-[#d4af37] mx-auto mb-3" />

                                <p className="text-[#c9b896] text-sm font-light">+91 9164315156</p>
                            </a>
                                    <a href="mailto:holmac135@gmail.com" className="flex items-center gap-4 group">
                                        <Mail className="w-4 h-4 text-[#d4af37]" />
                                        <span className="text-[#c9b896] font-light group-hover:text-white transition-colors">holmac135@gmail.com</span>
                                    </a>
                                    <a href='https://maps.app.goo.gl/occaCGDPHobXw62ZA' className="flex items-center gap-4">
                                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                                        <span className="text-[#c9b896] font-light">Udupi / Mangaluru / Bengaluru</span>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white text-xs tracking-[0.3em] font-bold mb-8 uppercase">Gallery Categories</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {categories.filter(c => c !== 'All').map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setActiveFilter(cat);
                                                window.scrollTo({ top: 500, behavior: 'smooth' });
                                            }}
                                            className="text-[#c9b896] text-left font-light hover:text-[#d4af37] transition-colors flex items-center gap-2 group"
                                        >
                                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[#c9b896]/40 text-[10px] tracking-widest uppercase">
                            © 2026 HOLMAC INTERIOR. CREATING TIMELESS SPACES.
                        </p>
                        {/* <div className="flex gap-8">
                            <a href="#" className="text-[#c9b896]/40 text-[10px] tracking-widest uppercase hover:text-[#d4af37]">Privacy Policy</a>
                            <a href="#" className="text-[#c9b896]/40 text-[10px] tracking-widest uppercase hover:text-[#d4af37]">Terms of Service</a>
                        </div> */}
                    </div>
                </div>
            </footer>

            {/* Video Modal remains the same */}
            {selectedVideo && (
                <div className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center p-4 modal-fade">
                    <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 text-white hover:text-[#d4af37] transition-colors"><X className="w-8 h-8" /></button>
                    <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl"><video controls autoPlay className="w-full h-full"><source src={selectedVideo} type="video/mp4" /></video></div>
                </div>
            )}
        </div>
    );
}