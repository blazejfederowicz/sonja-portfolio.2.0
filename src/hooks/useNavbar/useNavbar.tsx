import { useEffect, useRef, useState } from "react";

export default function useNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (menuOpen) {
        setShowMenu(true);
        } else {
        setTimeout(() => setShowMenu(false), 300);
        }

    }, [menuOpen]);

    useEffect(()=>{
        const handleClickOutside=(
        e: React.MouseEvent | MouseEvent,
        ref: ReturnType<typeof useRef<HTMLElement | null | HTMLDivElement>>,
        func:(bool:boolean)=>void
        )=>{
        if(ref.current && !ref.current.contains(e.target as Node)){
            func(false)
        }
        }

        document.addEventListener("mousedown",(e)=> handleClickOutside(e, navRef, setMenuOpen));
        document.addEventListener("mousedown",(e)=> handleClickOutside(e, popupRef, setUserMenuOpen));  
        
        return()=>{
        document.removeEventListener("mousedown",(e)=> handleClickOutside(e, navRef, setMenuOpen));
        document.removeEventListener("mousedown",(e)=> handleClickOutside(e, popupRef, setUserMenuOpen));  
        }
    },[])

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return {
        menuOpen,
        userMenuOpen,
        isScrolled,
        showMenu,
        navRef,
        popupRef,
        setMenuOpen,
        setUserMenuOpen,
        setIsScrolled,
        setShowMenu
    }
}