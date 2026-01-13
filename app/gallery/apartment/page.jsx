"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Building2, Phone, Mail, MapPin, ArrowRight, Award, Heart, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactFooter from '../components/ContactFooter';

export default function ApartmentGallery() {
    const [isVisible, setIsVisible] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const observerRefs = useRef([]);

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

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const galleryImages = [
        { id: 1, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118646/apartment1_mz1sxb.jpg', title: '', description: '', span: 'row-span-2' },
        { id: 2, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118650/apartment3_fvvo0w.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 3, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118653/apartment5_eaxtbh.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 4, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118655/apartment7_la0gus.jpg', title: '', description: '', span: 'row-span-2' },
        { id: 5, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118655/apartment4_nuuamf.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 6, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118656/apartment6_iytkkq.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 7, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118660/apartment12_sfvbrh.jpg', title: '', description: '', span: 'row-span-2' },
        { id: 8, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118659/apartment11_ma3xbt.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 9, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118664/apartment15_ujlipx.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 10, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118672/apartment19_slrolk.jpg', title: '', description: '', span: 'row-span-2' },
        { id: 11, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118665/apartment16_zur0yn.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 12, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118667/apartment17_vyo6mp.jpg', title: '', description: '', span: 'row-span-1' },

        { id: 13, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118658/apartment8_pkvgpb.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 14, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118661/apartment14_jexq29.jpg', title: '', description: '', span: 'row-span-2' },
        { id: 15, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118668/apartment18_vhgwof.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 16, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118692/apartment2_eggop4.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 17, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118705/apartment9_bj6r1w.jpg', title: '', description: '', span: 'row-span-2' },
        { id: 18, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118713/apartment10_wib4hw.jpg', title: '', description: '', span: 'row-span-1' },
        { id: 19, url: 'https://res.cloudinary.com/djfxdsmvk/image/upload/v1768118716/apartment13_usl5j1.jpg', title: '', description: '', span: 'row-span-1' },
    ];

    const openModal = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
        setIsZoomed(false);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsZoomed(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        const nextIndex = (currentImageIndex + 1) % galleryImages.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(galleryImages[nextIndex]);
        setIsZoomed(false);
    };

    const prevImage = () => {
        const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(galleryImages[prevIndex]);
        setIsZoomed(false);
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedImage) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedImage, currentImageIndex]);

    return (
        <div className="min-h-screen bg-plaster">
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeInLeft {
                        from { opacity: 0; transform: translateX(-40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes fadeInRight {
                        from { opacity: 0; transform: translateX(40px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes scaleIn {
                        from { opacity: 0; transform: scale(0.96); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    @keyframes modalFade {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-in { animation: fadeInUp 0.7s ease-out forwards; }
                    .animate-left { animation: fadeInLeft 0.7s ease-out forwards; }
                    .animate-right { animation: fadeInRight 0.7s ease-out forwards; }
                    .animate-scale { animation: scaleIn 0.6s ease-out forwards; }
                    .modal-fade { animation: modalFade 0.3s ease-out; }
                    .modal-slide { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                `
            }} />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-40 transition-all duration-500"
                style={{
                    background: scrollY > 50 ? 'rgba(250, 250, 248, 0.85)' : 'rgba(250, 250, 248, 0.6)',
                    backdropFilter: scrollY > 50 ? 'blur(20px)' : 'blur(10px)',
                    borderBottom: scrollY > 50 ? '1px solid rgba(212, 175, 55, 0.1)' : 'none'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 text-[#4a4237] hover:text-[#d4af37] transition-all duration-300 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm font-light tracking-wider hidden sm:inline">Back to Home</span>
                    </a>

                    <div className="flex items-center gap-3">
                        <img src="/holmac_circle.png" alt="Holmac" className="h-11 w-11 opacity-90" />
                        <div className="hidden sm:block">
                            <h1 className="logofont text-base font-medium text-[#2d2416] tracking-wide">HOLMAC</h1>
                            <p className="logofont text-xs tracking-widest text-[#b59016] font-light">INTERIOR</p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-36 md:pt-40 pb-20 md:pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex items-center gap-2.5 text-xs text-[#6b6257] font-light tracking-wide">
                        <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
                        <span className="text-[#d4af37]">•</span>
                        <a href="#" className="hover:text-[#d4af37] transition-colors">Gallery</a>
                        <span className="text-[#d4af37]">•</span>
                        <span className="text-[#d4af37]">Apartment Interior</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                        <div className="lg:col-span-7 animate-left">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-linear-to-br from-[#d4af37]/5 via-transparent to-[#c9a552]/5 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative overflow-hidden" style={{ borderRadius: '2px' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=1400&q=90"
                                        alt="Apartment Interior"
                                        className="w-full h-112.5 md:h-150 object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-8 left-8">
                                        <div className="px-6 py-3 bg-white/90 backdrop-blur-md shadow-lg" style={{ borderRadius: '2px' }}>
                                            <Building2 className="w-4 h-4 text-[#d4af37] inline-block mr-2.5 mb-0.5" />
                                            <span className="text-[#2d2416] text-xs font-medium tracking-widest">APARTMENT INTERIOR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col justify-center animate-right" style={{ animationDelay: '0.2s' }}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-[#2d2416] mb-8 leading-[1.1] tracking-tight">
                                Apartment<br />
                                <span className="italic text-[#d4af37] font-light">Living</span>
                            </h1>

                            <div className="w-12 h-px bg-linear-to-r from-[#d4af37] to-transparent mb-8"></div>

                            <div className="space-y-6 text-[#5a4e3c] mb-10">
                                <p className="text-lg md:text-xl font-light leading-relaxed tracking-wide">
                                    Smart, space-efficient interiors that deliver a "villa feel" within an urban floor plan.
                                </p>
                                <p className="leading-relaxed text-[#6b6257]">
                                    We specialize in <strong>fully integrated apartment fit-outs</strong>. This includes ergonomic modular kitchens with soft-close hardware, custom-built wardrobes, and intelligent storage solutions that maximize every square foot without compromising on style.
                                </p>
                                <p className="leading-relaxed text-[#6b6257]">
                                    Our team manages the entire process—from electrical and plumbing modifications to the final application of our signature Venetian plaster, giving you a move-in ready home that is sophisticated and functional.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="group">
                                    <div className="flex items-start gap-3">
                                        <div className="w-11 h-11 bg-linear-to-br from-[#d4af37]/10 to-transparent flex items-center justify-center shrink-0" style={{ borderRadius: '2px' }}>
                                            <Award className="w-5 h-5 text-[#d4af37]" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-[#2d2416] text-sm mb-1 tracking-wide">Smart Layouts</h3>
                                            <p className="text-xs text-[#6b6257] leading-relaxed">Space optimization expertise</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group">
                                    <div className="flex items-start gap-3">
                                        <div className="w-11 h-11 bg-linear-to-br from-[#d4af37]/10 to-transparent flex items-center justify-center shrink-0" style={{ borderRadius: '2px' }}>
                                            <Heart className="w-5 h-5 text-[#d4af37]" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-[#2d2416] text-sm mb-1 tracking-wide">Bright & Open</h3>
                                            <p className="text-xs text-[#6b6257] leading-relaxed">Light-enhancing finishes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={scrollToContact}
                                className="inline-flex items-center gap-3 px-10 py-4 bg-[#2d2416] text-white text-sm tracking-widest font-light hover:bg-[#3d3426] transition-all duration-300 group w-fit"
                                style={{ borderRadius: '2px' }}
                            >
                                Transform Your Apartment
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid Section */}
            <section id="gallery-grid" ref={addToRefs} className="py-24 md:py-32 px-6 bg-plaster">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-extralight text-[#2d2416] mb-4 tracking-tight">
                            Project Portfolio
                        </h2>
                        <div className="w-12 h-px bg-linear-to-r from-[#d4af37] to-transparent mb-6"></div>
                        <p className="text-[#6b6257] text-lg font-light leading-relaxed">
                            Discover how we transform compact spaces into elegant, functional homes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-5">
                        {galleryImages.map((image, index) => (
                            <div
                                key={image.id}
                                className={`${image.span} relative overflow-hidden group cursor-pointer ${isVisible['gallery-grid'] ? 'animate-scale' : 'opacity-0'}`}
                                style={{
                                    animationDelay: `${index * 0.04}s`,
                                    borderRadius: '2px'
                                }}
                                onClick={() => openModal(image, index)}
                            >
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                />
                                {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

                                <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <h3 className="text-white font-light text-base tracking-wide mb-1">{image.title}</h3>
                                    <p className="text-white/70 text-xs font-light tracking-wide">{image.description}</p>
                                </div>

                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius: '2px' }}>
                                    <ZoomIn className="w-4 h-4 text-[#2d2416]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact-section" className="py-24 md:py-32 px-6 bg-[#2d2416] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9a552] rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight leading-tight">
                            Elevate Your<br />Apartment Living
                        </h2>
                        <div className="w-12 h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8"></div>
                        <p className="text-[#c9b896] text-lg font-light max-w-2xl mx-auto leading-relaxed">
                            Ready to maximize your space with elegant design? Let's create your perfect apartment sanctuary.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
                        <a
                            href="tel:+919164315156"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-[#d4af37] text-[#2d2416] text-sm tracking-widest font-medium hover:bg-[#e6c255] transition-all duration-300 w-full sm:w-auto justify-center group"
                            style={{ borderRadius: '2px' }}
                        >
                            <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                            Call Now
                        </a>
                        <a
                            href="https://wa.me/919916511351"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-transparent border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2d2416] transition-all duration-300 text-sm tracking-widest font-medium w-full sm:w-auto justify-center group"
                            style={{ borderRadius: '2px' }}
                        >
                            <FaWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            Connect Now
                        </a>
                    </div>

                    <ContactFooter />
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center modal-fade"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
                    onClick={closeModal}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50 p-2 hover:bg-white/5 backdrop-blur-sm"
                        onClick={closeModal}
                        style={{ borderRadius: '2px' }}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-all z-50 p-3 hover:bg-white/5 backdrop-blur-sm group"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        style={{ borderRadius: '2px' }}
                    >
                        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-all z-50 p-3 hover:bg-white/5 backdrop-blur-sm group"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        style={{ borderRadius: '2px' }}
                    >
                        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="max-w-7xl w-full px-6 modal-slide" onClick={(e) => e.stopPropagation()}>
                        <div className="relative group">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className={`w-full h-auto max-h-[85vh] object-contain transition-transform duration-500 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                                onClick={() => setIsZoomed(!isZoomed)}
                                style={{ borderRadius: '2px' }}
                            />

                            <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/60 to-transparent p-8">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="text-white text-2xl md:text-3xl font-light tracking-wide mb-2">{selectedImage.title}</h3>
                                        <p className="text-white/70 text-sm md:text-base font-light tracking-wide">{selectedImage.description}</p>
                                    </div>
                                    <div className="text-white/50 text-sm font-light">
                                        {currentImageIndex + 1} / {galleryImages.length}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={img.id}
                                    className={`shrink-0 w-20 h-20 cursor-pointer transition-all duration-300 ${idx === currentImageIndex
                                        ? 'opacity-100 ring-2 ring-[#d4af37]'
                                        : 'opacity-40 hover:opacity-70'
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                        setSelectedImage(img);
                                        setIsZoomed(false);
                                    }}
                                    style={{ borderRadius: '2px' }}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.title}
                                        className="w-full h-full object-cover"
                                        style={{ borderRadius: '2px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs font-light tracking-wider">
                        Use arrow keys to navigate • ESC to close
                    </div>
                </div>
            )}
        </div>
    );
}