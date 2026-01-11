"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Layers, Leaf, Wind, Droplets, Clock, Award, Phone, ThermometerSun, Home, Sparkles, Shield } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function LimeBasedCoatingPage() {
    const [isVisible, setIsVisible] = useState({});
    const [scrollY, setScrollY] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
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

    const processSteps = [
        {
            title: 'Wall Assessment',
            description: 'We evaluate your walls for porosity, moisture levels, and structural integrity before application.',
            icon: <Home className="w-6 h-6" />
        },
        {
            title: 'Surface Preparation',
            description: 'Walls are cleaned, repaired, and dampened to ensure optimal lime absorption and bonding.',
            icon: <Layers className="w-6 h-6" />
        },
        {
            title: 'Lime Mixing',
            description: 'Natural hydraulic lime is mixed with water and mineral additives to perfect consistency.',
            icon: <Droplets className="w-6 h-6" />
        },
        {
            title: 'First Coat',
            description: 'A scratch coat is applied and scored to create texture for the next layer to grip.',
            icon: <Layers className="w-6 h-6" />
        },
        {
            title: 'Float Coat',
            description: 'The second layer is smoothed with a float tool, creating an even, breathable surface.',
            icon: <Wind className="w-6 h-6" />
        },
        {
            title: 'Natural Curing',
            description: 'The coating is misted regularly for 7-10 days, allowing it to carbonate and strengthen naturally.',
            icon: <Clock className="w-6 h-6" />
        }
    ];

    const advantages = [
        { icon: <Wind className="w-5 h-5" />, title: 'Breathable & Healthy', text: 'Allows moisture to pass through, preventing dampness and mold growth' },
        { icon: <Leaf className="w-5 h-5" />, title: 'Zero VOC', text: 'Completely natural and chemical-free, safe for children and sensitive individuals' },
        { icon: <ThermometerSun className="w-5 h-5" />, title: 'Temperature Regulation', text: 'Natural insulation properties help maintain comfortable indoor climate' },
        { icon: <Shield className="w-5 h-5" />, title: 'Antibacterial', text: 'High pH naturally inhibits bacterial and fungal growth on walls' },
        { icon: <Sparkles className="w-5 h-5" />, title: 'Self-Healing', text: 'Small cracks repair themselves through natural carbonation process' },
        { icon: <Award className="w-5 h-5" />, title: 'Ages Beautifully', text: 'Develops a unique patina over time, becoming more beautiful with age' }
    ];

    return (
        <div className="min-h-screen bg-[#fafaf8]">
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
                    .animate-in { animation: fadeInUp 0.7s ease-out forwards; }
                    .animate-left { animation: fadeInLeft 0.7s ease-out forwards; }
                    .animate-right { animation: fadeInRight 0.7s ease-out forwards; }
                    .animate-scale { animation: scaleIn 0.6s ease-out forwards; }
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
                            <h1 className="text-base font-medium text-[#2d2416] tracking-wide">HOLMAC</h1>
                            <p className="text-xs tracking-widest text-[#b59016] font-light">INTERIOR</p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-36 md:pt-40 pb-20 md:pb-28 px-6 bg-linear-to-b from-[#fdfcf9] to-[#fafaf8]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex items-center gap-2.5 text-xs text-[#6b6257] font-light tracking-wide">
                        <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
                        <span className="text-[#d4af37]">•</span>
                        <a href="/products" className="hover:text-[#d4af37] transition-colors">Products</a>
                        <span className="text-[#d4af37]">•</span>
                        <span className="text-[#d4af37]">Lime-Based Coating</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/10 mb-6" style={{ borderRadius: '2px' }}>
                                <Leaf className="w-4 h-4 text-[#d4af37]" />
                                <span className="text-[#d4af37] text-xs tracking-widest font-medium">ECO-FRIENDLY</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-[#2d2416] mb-6 leading-[1.1] tracking-tight">
                                Lime-Based<br/>
                                <span className="italic text-[#d4af37] font-light">Coating</span>
                            </h1>

                            <div className="w-16 h-px bg-linear-to-r from-[#d4af37] to-transparent mb-8"></div>

                            <p className="text-xl md:text-2xl font-light text-[#5a4e3c] mb-8 leading-relaxed">
                                Nature's perfect wall finish—breathable, antibacterial, and beautifully sustainable for modern healthy living.
                            </p>

                            <p className="text-[#6b6257] leading-relaxed mb-8">
                                Lime coating has been used for thousands of years, from ancient Roman buildings to medieval monasteries. This natural finish uses hydraulic lime that hardens through carbonation, creating a breathable surface that actually improves indoor air quality while regulating moisture naturally.
                            </p>

                            <button 
                                onClick={scrollToContact}
                                className="inline-flex items-center gap-3 px-10 py-4 bg-[#2d2416] text-white text-sm tracking-widest font-light hover:bg-[#3d3426] transition-all duration-300"
                                style={{ borderRadius: '2px' }}
                            >
                                Request Consultation
                            </button>
                        </div>

                        <div className="animate-right" style={{ animationDelay: '0.2s' }}>
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-linear-to-br from-[#d4af37]/10 via-transparent to-[#c9a552]/10 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=1200&q=90"
                                    alt="Lime-Based Coating Finish"
                                    className="relative w-full h-125 md:h-150 object-cover shadow-2xl"
                                    style={{ borderRadius: '2px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Looks Section */}
            <section id="appearance" ref={addToRefs} className="py-20 md:py-28 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className={`max-w-3xl mb-16 ${isVisible['appearance'] ? 'animate-in' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-extralight text-[#2d2416] mb-6 tracking-tight">
                            Natural Texture & Character
                        </h2>
                        <div className="w-12 h-px bg-linear-to-r from-[#d4af37] to-transparent mb-8"></div>
                        <p className="text-[#6b6257] text-lg leading-relaxed">
                            Lime coating offers an organic, hand-crafted aesthetic with subtle variations that celebrate the artisan's touch.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                title: 'Soft Matte',
                                description: 'Gentle, non-reflective surface with a chalky, earthy quality',
                                image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=90'
                            },
                            {
                                title: 'Natural Texture',
                                description: 'Subtle trowel marks and organic irregularities add warmth and character',
                                image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=90'
                            },
                            {
                                title: 'Earthy Tones',
                                description: 'From pure white to warm ochres and terracotta, all with natural pigments',
                                image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=90'
                            }
                        ].map((item, idx) => (
                            <div 
                                key={idx}
                                className={`group ${isVisible['appearance'] ? 'animate-scale' : 'opacity-0'}`}
                                style={{ animationDelay: `${idx * 0.1}s`, borderRadius: '2px' }}
                            >
                                <div className="overflow-hidden mb-4" style={{ borderRadius: '2px' }}>
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-light text-[#2d2416] mb-3 tracking-wide">{item.title}</h3>
                                <p className="text-[#6b6257] text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" ref={addToRefs} className="py-20 md:py-28 px-6 bg-[#fafaf8]">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center max-w-3xl mx-auto mb-20 ${isVisible['process'] ? 'animate-in' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-extralight text-[#2d2416] mb-6 tracking-tight">
                            The Natural Process
                        </h2>
                        <div className="w-12 h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8"></div>
                        <p className="text-[#6b6257] text-lg leading-relaxed">
                            Lime coating follows nature's timeline, curing slowly through carbonation for maximum strength and breathability.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className={`relative p-8 bg-white transition-all duration-500 hover:shadow-xl group cursor-pointer ${isVisible['process'] ? 'animate-scale' : 'opacity-0'}`}
                                style={{ 
                                    animationDelay: `${idx * 0.1}s`,
                                    borderRadius: '2px'
                                }}
                                onMouseEnter={() => setActiveStep(idx)}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300" style={{ borderRadius: '2px' }}>
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[#d4af37] text-sm font-light tracking-widest mb-2">STEP {idx + 1}</div>
                                        <h3 className="text-xl font-light text-[#2d2416] tracking-wide">{step.title}</h3>
                                    </div>
                                </div>
                                <p className="text-[#6b6257] text-sm leading-relaxed">{step.description}</p>
                                
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#d4af37] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 bg-[#2d2416]/5 text-center" style={{ borderRadius: '2px' }}>
                        <Clock className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
                        <p className="text-[#5a4e3c] font-light">
                            <span className="text-[#d4af37] font-medium">Typical Timeline:</span> 2-4 days for application, plus 7-10 days natural curing period
                        </p>
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section id="advantages" ref={addToRefs} className="py-20 md:py-28 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className={`max-w-3xl mb-16 ${isVisible['advantages'] ? 'animate-in' : 'opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-extralight text-[#2d2416] mb-6 tracking-tight">
                            Why Choose Lime Coating
                        </h2>
                        <div className="w-12 h-px bg-linear-to-r from-[#d4af37] to-transparent mb-8"></div>
                        <p className="text-[#6b6257] text-lg leading-relaxed">
                            More than just a beautiful finish, lime coating actively contributes to healthier indoor environments.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-6 bg-[#fafaf8] hover:bg-white transition-all duration-300 hover:shadow-lg group ${isVisible['advantages'] ? 'animate-scale' : 'opacity-0'}`}
                                style={{ 
                                    animationDelay: `${idx * 0.08}s`,
                                    borderRadius: '2px'
                                }}
                            >
                                <div className="w-12 h-12 bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-4 group-hover:scale-110 transition-transform duration-300" style={{ borderRadius: '2px' }}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-medium text-[#2d2416] mb-2 tracking-wide">{item.title}</h3>
                                <p className="text-[#6b6257] text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section id="contact-section" className="py-24 md:py-32 px-6 bg-[#2d2416] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9a552] rounded-full blur-3xl"></div>
                </div>
                
                <div className="max-w-4xl mx-auto relative text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
                        Create Healthier Spaces with<br/>
                        <span className="text-[#d4af37] italic">Natural Lime Coating</span>
                    </h2>
                    <div className="w-12 h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8"></div>
                    <p className="text-[#c9b896] text-lg font-light mb-12 max-w-2xl mx-auto">
                        Experience the beauty and benefits of eco-friendly lime-based finishes. Let's bring nature into your home.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
                        <a 
                            href="tel:+919916511351"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-[#d4af37] text-[#2d2416] text-sm tracking-widest font-medium hover:bg-[#e6c255] transition-all duration-300"
                            style={{ borderRadius: '2px' }}
                        >
                            <Phone className="w-4 h-4" />
                            +91 9916511351
                        </a>
                        <a 
                            href="https://wa.me/919916511351"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-transparent border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#2d2416] transition-all duration-300 text-sm tracking-widest font-medium w-full sm:w-auto justify-center group"
                            style={{ borderRadius: '2px' }}
                        >
                            <FaWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            Get a Quote
                        </a>
                    </div>

                    <div className="text-[#c9b896] text-sm font-light">
                        Udupi / Mangaluru, Karnataka
                    </div>
                </div>
            </section>
        </div>
    );
}