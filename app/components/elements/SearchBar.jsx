"use client"
import searchStyles from '../../styles/search.css'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useState, useRef} from 'react'

export default function SearchBar({isExpandable = false}) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            router.push(`/search-results/${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleImageClick = () => {
        setIsExpanded(!isExpanded);
        inputRef.current.focus();
    };

    return (
        <div role="search" className={`search-bar ${(isExpanded || !isExpandable) ? 'expanded' : ''} ${!isExpandable ? 'non-expandable' : ''}`}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            {isExpandable && 
            <div className="search-icon-container">
                <Image
                    src={'/icons/search-svgrepo-com.svg'}
                    alt="Search"
                    width={25}
                    height={25}
                    onClick={handleImageClick}
                />
            </div>}
        </div>
    )
}
