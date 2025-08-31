import { CONTACT_INFO, CONTACT_SOCIALS, EMAIL, EMAIL_TEXT, LOCATION, LOCATION_TEXT, SOCIAL_PROFILES } from "@/constants";
import ContactLayout from "../layout/ContactLayout";
import InfoTag from "./layout/InfoTag";

export default function ContactInfo(){
    return(
        <ContactLayout title={CONTACT_INFO}>
            <div className="space-y-4 text-sm sm:text-base">
                <InfoTag headline={LOCATION_TEXT} icon="bi bi-geo-alt">
                        <p className="text-gray-600">{LOCATION}</p>
                </InfoTag>
                <InfoTag headline={EMAIL_TEXT} icon="bi bi-envelope">
                    <a href={`mailto:${EMAIL}`} className="text-gray-600 hover:text-salmon2 active:text-salmon2 transition-colors break-all">{EMAIL}</a>
                </InfoTag>
            </div>
            <div className="pt-4 border-t border-border/50">
                <h4 className="font-medium mb-3">{SOCIAL_PROFILES}</h4>
                <div className="flex gap-3">
                {CONTACT_SOCIALS.map((link, index)=>(
                    <a key={`contact-socials-${index}`} href={link.name === EMAIL_TEXT?`mailto:${link.href}`:link.href} target="_blank" rel="noopener noreferrer" className="py-2 px-3 rounded-full bg-neutral-200 hover:bg-salmon2/30 text-salmon hover:text-salmon2 active:text-salmon2 transition-colors">
                        <i className={link.icon}/>
                    </a>
                ))}
                </div>
            </div>
        </ContactLayout>
    )
}