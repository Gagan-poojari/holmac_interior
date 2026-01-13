import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const ContactFooter = () => {
    return (
        <div className="pt-12 border-t border-[#d4af37]/10">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
                <a
                    href="tel:+919164315156"
                    aria-label="Call +91 9164315156"
                    className="space-y-2">
                    <Phone className="w-4 h-4 text-[#d4af37] mx-auto mb-3" />
                    <p className="text-[#c9b896] text-sm font-light">+91 9164315156</p>
                </a>
                <a href="mailto:holmac135@gmail"
                    className="space-y-2">
                    <Mail className="w-4 h-4 text-[#d4af37] mx-auto mb-3" />
                    <p className="text-[#c9b896] text-sm font-light">holmac135@gmail.com</p>
                </a>
                <a
                    href='https://maps.app.goo.gl/occaCGDPHobXw62ZA'
                    className="space-y-2">
                    <MapPin className="w-4 h-4 text-[#d4af37] mx-auto mb-3" />
                    <p className="text-[#c9b896] text-sm font-light">Udupi / Mangaluru</p>
                </a>
            </div>
        </div>
    )
}

export default ContactFooter
