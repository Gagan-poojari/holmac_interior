import { Star, Quote, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function ReviewPage() {
  const [expandedReviews, setExpandedReviews] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const reviews = [
    {
      id: 1,
      name: "Padmaraj Bhattar",
      title: "CEO, TechVision Inc.",
      rating: 5,
      text: "We recently completed the renovation of our jewellery store with the help of Holmac, and we are extremely happy with the results. The entire design and execution process was handled with great professionalism and attention to detail. From selecting premium materials to ensuring flawless finishes, everything reflected excellent taste and care.\nThe designer understood our brand's aesthetic perfectly and transformed the space into a modern, elegant showroom while maintaining its warmth and functionality. The end-to-end execution was seamless, on schedule, and delivered with exceptional quality. Highly recommend Holmac to anyone looking for thoughtful design and reliable project delivery."
    },
    {
      id: 2,
      name: "Govindaraya Nayak",
      title: "Director, Global Solutions",
      rating: 5,
      text: "Our old kitchen brought to life—exceeded all expectations!\n\nFrom start to finish, Mr Ganesh & his team team at Holomac Udupi made our kitchen renovation a breeze. We hired them for custom cabinetry and storage solutions, and they absolutely exceeded our expectations.\nMr Ganesh was excellent at listening to our needs and offering creative, practical ideas to maximize our space. He ensured work was completed on time. His carpenters were also very respectful of our home, ensuring that the work area was clean and tidy at the end of each day. The final result is a beautiful and perfectly functional kitchen"
    },
    {
      id: 3,
      name: "Janardhan Nelly",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "One of the best interiors company in Udupi I have experienced. I got done the complete interiors, from design to execution in my four bedroom house at udupi in record time."
    },
    {
      id: 4,
      name: "Sunny Rana",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "I recently got my modular kitchen and a couple of wardrobes done by HOLMAC Interior, and honestly, I'm so glad I chose them! From the very first consultation, they were incredibly helpful. I had a rough idea of what I wanted, but they really helped me refine the designs and suggested practical solutions I hadn't even thought of. The quality of the materials is excellent, and the installation team was super professional and efficient. My kitchen now feels so much more spacious and organized, and the wardrobes are exactly what I needed. Definitely recommend HOLMAC if you're looking for good quality and a hassle-free experience!"
    },
    {
      id: 5,
      name: "Gretta Mathias",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "Work has been amazing, on time and precise. Thank you HOLMAC interior for making my house by giving it a new look."
    },
    {
      id: 6,
      name: "Its moon",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "Many thanks to Mr.Ganesh, who is Very committed. The delivery of work was on time. Though ours was small project, he has taken utmost care. and Pooja room was customized to our needs. The people who came to work at  were work oriented and skilled."
    }
,
{
      id: 7,
      name: "Shravan Ullal",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "Holmac Interior Design has truly transformed our home with their exceptional talent and attention to detail. From the initial consultation to the final touches, every step of the process was executed with precision and care. The team's creativity, professionalism, and ability to capture our vision exceeded our expectations. The colors, furniture, and accessories chosen reflect a deep understanding of our preferences, creating a beautiful and functional design. The timely execution of the project and clear communication made the entire experience a pleasure. Thank you, Holmac, for turning our house into a personalized and inviting home. We highly recommend your outstanding interior design services."
    },
    {
      id: 8,
      name: "Vishal Kiran Bettu",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "Holmac Interiors understood the our requirements and provided hassle free and quality workers. Planned everything and delivered us a smart good looking interior on time as promised. I will highly recommend holmac Interiors to anyone looking for a value for money and excellent quality work . Ganesh and him Team have done an very fantastic job."
    },
    {
      id: 9,
      name: "Jerald Saldanha",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "Ganesh did a fantastic job. He did complete interior design of my whole house in Udipi. He sourced everything for me including needle for my house. Cannot recommend enough. Very professional and delivered as agreed. Used good quality material. Very impressed with his work.\nPositive\nResponsiveness, Punctuality, Quality, Professionalism, Value\nServices\nAppliance selection, Bathroom design, Bedroom design, Cabinetry & hardware design, Closet design, Custom art selection, Dining room design, Door design, Home decor selection, Home staging, Interior decorating, Interior painting, Kitchen design, Living room design, Room planning, Space Planning, Stone, brick, & stucco design, Window design"
    },
    {
      id: 10,
      name: "Justin Sali",
      title: "Founder, Creative Studios",
      rating: 5,
      text: "HOLMAC had redesigned our kitchen. The work performed was excellent with emphasis on perfection, quality materials and great finishing, all within a reasonable cost. Further, the professionalism and rapport maintained by Mr. Ganesh was brilliant. Also, the high efficiency and politeness of the workers is appreciated"
    },
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth = 400; // Approximate card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleExpanded = (id) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const ReviewCard = ({ review, index }) => {
    const maxLength = 200;
    const isExpanded = expandedReviews[review.id];
    const isLong = review.text.length > maxLength;
    const displayText = isExpanded ? review.text : review.text.substring(0, maxLength);

    return (
      <div 
        className="group relative bg-white shrink-0 w-85 md:w-95 p-8 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
      >
        {/* Quote icon background */}
        <div className="absolute -top-3 -right-3 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <Quote className="w-full h-full text-[#967c26] transform rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(review.rating)].map((_, i) => (
              <div key={i} className="transform group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 30}ms` }}>
                <Star className="w-5 h-5 fill-[#967c26] text-[#967c26]" />
              </div>
            ))}
          </div>

          {/* Review text */}
          <div className="flex-1 mb-6">
            <p className="text-[#5a4e3c] leading-relaxed text-sm md:text-base">
              "{displayText}{!isExpanded && isLong ? '...' : ''}"
            </p>
            {isLong && (
              <button
                onClick={() => toggleExpanded(review.id)}
                className="mt-3 text-[#967c26] font-medium text-sm hover:text-[#2d2416] transition-colors duration-300"
              >
                {isExpanded ? '- Show Less' : '+ Read More'}
              </button>
            )}
          </div>

          {/* Author info */}
          <div className="border-t border-[#967c26]/20 pt-6 mt-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#967c26] to-[#c9a552] flex items-center justify-center text-white font-semibold text-lg shrink-0 group-hover:scale-110 transition-transform duration-500">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-[#2d2416] group-hover:text-[#967c26] transition-colors duration-300">
                  {review.name}
                </p>
                <p className="text-[#5a4e3c] text-sm">{review.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#967c26] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-6 bg-[#f5f2ea] bg-plaster overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#967c26]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#c9a552]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? 'animate-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#967c26]/10 rounded-full mb-6">
            <Users className="w-4 h-4 text-[#967c26]" />
            <span className="text-[#967c26] text-xs tracking-[0.2em] font-medium">CLIENT TESTIMONIALS</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extralight text-[#2d2416] mb-6">
            What Our <span className="text-[#967c26] italic">Clients</span> Say
          </h2>
          
          <p className="text-[#5a4e3c] max-w-2xl mx-auto text-lg">
            Real stories from homeowners who transformed their spaces with Holmac
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12 mt-8">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-light text-[#967c26] mb-2">500+</div>
              <div className="text-xs md:text-sm text-[#5a4e3c] tracking-wider">Happy Clients</div>
            </div>
            <div className="w-px bg-[#967c26]/20" />
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-light text-[#967c26] mb-2">5.0</div>
              <div className="text-xs md:text-sm text-[#5a4e3c] tracking-wider flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#967c26] text-[#967c26]" />
                Rating
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 rounded-full bg-[#967c26] text-white items-center justify-center shadow-xl hover:bg-[#2d2416] transition-all duration-300 hover:scale-110 ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-14 h-14 rounded-full bg-[#967c26] text-white items-center justify-center shadow-xl hover:bg-[#2d2416] transition-all duration-300 hover:scale-110 ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 px-2 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {reviews.map((review, index) => (
              <div key={review.id} className="snap-start">
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </div>

          {/* Mobile scroll indicator */}
          <div className="md:hidden flex justify-center gap-2 mt-6">
            {reviews.slice(0, 5).map((_, idx) => (
              <div
                key={idx}
                className="h-1.5 w-8 rounded-full bg-[#967c26]/20"
              />
            ))}
            <span className="text-[#5a4e3c] text-sm ml-2">Swipe for more →</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes animate-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-in { animation: animate-in 0.8s ease-out forwards; }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </section>
  );
}
