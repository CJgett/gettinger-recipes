"use client"
import '../../styles/search.css'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useState, useRef} from 'react'

export default function SearchBar({isExpandable = false}) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchTerm) {
            router.push(`/search-results/${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleImageClick = () => {
        setIsExpanded(!isExpanded);
        if(!isExpanded) {
            inputRef.current.focus();
        }        
    };

    return (
        <div role="search" className={`search-bar ${(isExpanded || !isExpandable) ? 'expanded' : ''} ${!isExpandable ? 'non-expandable' : ''}`}>
            <input
                ref={inputRef}
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="search recipes"
                tabIndex={isExpanded ? 0 : -1}
            />
            {isExpandable && 
            <div className="search-icon-container"
                role="button"
                onClick={handleImageClick}
                onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
                tabIndex={0}
                aria-label="expand search bar">
                <Image
                    src={'/icons/search-svgrepo-com.svg'}
                    alt="magnifying glass icon"
                    width={25}
                    height={25}
                />
            </div>}
        </div>
    )
}
