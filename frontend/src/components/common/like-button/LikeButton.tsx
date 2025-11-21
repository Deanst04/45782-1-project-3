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
            className={`
                flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                shadow-sm transition duration-150
                ${isFollowed ? "bg-pink-200 text-red-600" : "bg-gray-200 text-gray-600"}
            `}>
            <span className="text-lg flex items-center">
                {isFollowed ? (
                    <AiFillHeart className='text-red-600' />
                ) : (
                    <AiOutlineHeart className='text-gray-400' />
                )}
            </span>
            {followerCount > 0 && (
                <span className='text-sm'>{followerCount}</span>
            )}
        </button>

    )

}