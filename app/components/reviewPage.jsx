import { Star } from 'lucide-react';
import { useState } from 'react';

export default function ReviewPage() {
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
      text: "Holmac Interiors understood the our requirements and provided hassle free and quality workers .Planned everything and delivered us a smart good looking interior on time as promised. I will highly recommend holmac Interiors to anyone looking for a value for money and excellent quality work . Ganesh and him Team have done an very fantastic job."
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

  const ReviewCard = ({ review }) => {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 150;
    const isLong = review.text.length > maxLength;
    const displayText = expanded ? review.text : review.text.substring(0, maxLength);

    return (
      <div className="bg-white border border-amber-200 p-8 rounded-lg hover:shadow-lg transition-shadow flex-shrink-0 w-80">
        <div className="flex gap-1 mb-4">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">
          "{displayText}{!expanded && isLong ? '...' : ''}"
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-amber-700 font-semibold text-sm hover:text-amber-900 mb-4"
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        )}
        <div className="border-t border-amber-200 pt-4">
          <p className="font-semibold text-gray-900">{review.name}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f5f2ea]">
      {/* Header */}
      <div className="text-white px-8 pt-10">
        <div className="max-w-6xl text-center mx-auto">
          <h1 className="text-4xl font-bold text-[#2d2416] mb-2">Client Reviews</h1>
          <p className="text-[#967c26]">What our clients say about us</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-6xl mx-auto px-8 py-16 overflow-x-auto">
        <div className="flex gap-8 -webkit-scrollbar min-w-max">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}