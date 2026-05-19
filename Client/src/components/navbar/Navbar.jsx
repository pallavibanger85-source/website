import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
    FaHome, FaBookOpen, FaBolt, FaBrain, FaLaugh, FaUsers, FaDumbbell,
    FaSignInAlt, FaQuoteRight, FaBars, FaTimes, FaSearch, FaMoon, FaSun,
    FaUserPlus, FaUser
} from "react-icons/fa";

// Menu Items
const MENU_ITEMS = [
    { icon: FaHome, name: 'Home', slug: 'home', path: '/' },
    { icon: FaBookOpen, name: 'Authors', slug: 'authors', path: '/authors' },
    { icon: FaBolt, name: 'Motivation', slug: 'motivation', path: '/motivation' },
    { icon: FaBrain, name: 'Mindset', slug: 'mindset', path: '/mindset' },
    { icon: FaLaugh, name: 'Funny', slug: 'funny', path: '/funny' },
    { icon: FaUsers, name: 'Friendship', slug: 'friendship', path: '/friendship' },
    { icon: FaDumbbell, name: 'Discipline', slug: 'discipline', path: '/discipline' },
];

export default function Navbar() {
    // States
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [searchText, setSearchText] = useState('');
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const isDarkMode = savedTheme === 'dark';
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        }
        return isDarkMode;
    });
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    // Toggle dark/light mode
    const toggleDarkMode = () => {
        const newDarkMode = !isDark;
        setIsDark(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Handle scroll effect
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };
    
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsMenuOpen(false);
            setShowMobileSearch(false);
        }
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Remove event listeners (optional - you can keep them)
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            window.location.href = `/search?q=${searchText}`;
        }
    };

    // Search input component
    const SearchBox = ({ isMobile = false }) => (
        <form onSubmit={handleSearch} className="relative w-full">
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search quotes..."
                className={`w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-gray-700 dark:text-gray-200 
                    transition-all duration-300 ${isMobile 
                        ? 'px-4 py-3 pl-11 text-sm rounded-xl' 
                        : 'px-5 py-2.5 pl-12 rounded-full'}`}
            />
            <FaSearch className={`absolute top-1/2 -translate-y-1/2 text-blue-500
                ${isMobile ? 'left-4' : 'left-4 text-lg'}`} />
            {searchText && (
                <button 
                    type="button" 
                    onClick={() => setSearchText('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                    <FaTimes size={isMobile ? 12 : 14} />
                </button>
            )}
        </form>
    );

    // Mobile icon button
    const MobileButton = ({ icon: Icon, onClick }) => (
        <button onClick={onClick}
            className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-gray-800 
                dark:to-gray-700 text-white dark:text-blue-400 shadow-md hover:shadow-lg transition-all">
            <Icon size={16} className="text-white dark:text-blue-400" />
        </button>
    );

    return (
        <>
            {/* Navigation Bar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-xl py-2' 
                    : 'bg-white dark:bg-gray-900 py-4'
            }`}>
                
                <div className="container mx-auto px-4 md:px-8">
                    {/* Top Row - Logo, Search, Buttons */}
                    <div className="flex items-center justify-between gap-4">
                        
                        {/* Logo with Link */}
                        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                            <div className="relative">
                                <img 
                                    src={logo} 
                                    alt="QuoteHub Logo" 
                                    className={`h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-300
                                        ${isDark ? 'brightness-0 invert' : 'brightness-0'}
                                        group-hover:scale-105 group-hover:rotate-3`}
                                />
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 
                                dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent
                                group-hover:scale-105 transition-transform">
                                QuoteHub
                            </h1>
                        </Link>

                        {/* Desktop Search Box */}
                        <div className="hidden md:flex flex-1 max-w-md mx-4">
                            <SearchBox />
                        </div>

                        {/* Desktop Action Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* Login Button */}
                            <Link 
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium
                                    bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                                    hover:from-blue-700 hover:to-blue-800 transition-all 
                                    shadow-md hover:shadow-lg"
                            >
                                <FaUser size={14} className="text-white" />
                                <span>Login</span>
                            </Link>
                            
                            {/* Sign Up Button */}
                            <Link
                                to="/signup"
                                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium
                                    bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                                    hover:from-blue-700 hover:to-blue-800 transition-all 
                                    shadow-md hover:shadow-lg"
                            >
                                <FaUserPlus size={14} className="text-white" />
                                <span>Sign Up</span>
                            </Link>
                            
                            {/* Theme Toggle */}
                            <button 
                                onClick={toggleDarkMode}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 
                                    dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-yellow-400 
                                    flex items-center justify-center hover:shadow-md transition-all
                                    hover:scale-105"
                            >
                                {isDark ? <FaSun size={18} className="text-yellow-500" /> : <FaMoon size={18} className="text-blue-600" />}
                            </button>
                        </div>

                        {/* Mobile Action Buttons */}
                        <div className="flex items-center gap-2 md:hidden">
                            <MobileButton icon={FaSearch} onClick={() => setShowMobileSearch(!showMobileSearch)} />
                            <MobileButton icon={isDark ? FaSun : FaMoon} onClick={toggleDarkMode} />
                            <MobileButton icon={isMenuOpen ? FaTimes : FaBars} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        </div>
                    </div>

                    {/* Mobile Search Box */}
                    <AnimatePresence>
                        {showMobileSearch && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden mt-4"
                            >
                                <SearchBox isMobile />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Desktop Categories Menu */}
                    <div className="hidden md:flex items-center justify-center gap-2 mt-4 pt-3 
                        border-t border-gray-200 dark:border-gray-800">
                        {MENU_ITEMS.map((item, index) => (
                            <Link
                                key={item.slug}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                                    transition-all duration-300 hover:scale-105
                                    ${activePage === item.slug 
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600'}`}
                                onClick={() => setActivePage(item.slug)}
                            >
                                <item.icon size={16} className={`transition-transform group-hover:scale-110 ${
                                    activePage === item.slug ? 'text-white' : 'text-blue-500 dark:text-blue-400'
                                }`} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg 
                                border-t border-gray-200 dark:border-gray-800 mt-3 shadow-2xl">
                            <div className="container mx-auto px-4 py-5">
                                
                                {/* Mobile Menu Items */}
                                <div className="flex flex-col gap-2 mb-5">
                                    {MENU_ITEMS.map((item) => (
                                        <Link
                                            key={item.slug}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                                ${activePage === item.slug 
                                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'}`}
                                            onClick={() => {
                                                setActivePage(item.slug);
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            <item.icon size={18} className={activePage === item.slug ? 'text-white' : 'text-blue-500 dark:text-blue-400'} />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile Action Buttons */}
                                <div className="flex flex-col gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                                    <Link 
                                        to="/login"
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium
                                            bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaUser size={16} className="text-white" />
                                        <span>Login</span>
                                    </Link>
                                    
                                    <Link 
                                        to="/signup"
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium
                                            bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <FaUserPlus size={16} className="text-white" />
                                        <span>Sign Up</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Spacer to push content down */}
            <div className="h-24 md:h-28"></div>
        </>
    );
}