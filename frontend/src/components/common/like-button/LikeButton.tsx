import './LikeButton.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    followerCount: number,
    isFollowed: boolean,
    onToggle(): void
}

export default function LikeButton(props: LikeButtonProps) {

    const { followerCount, isFollowed, onToggle } = props

    return (
        <button 
            onClick={onToggle}
            className={`like-button ${isFollowed ? 'liked' : 'not-liked'}`}
        >
            <span className="heart-icon">
                {isFollowed ? (
                    <AiFillHeart />
                ) : (
                    <AiOutlineHeart />
                )}
            </span>
            {followerCount > 0 && (
                <span className='counter-text'>{followerCount}</span>
            )}
        </button>
    )
}