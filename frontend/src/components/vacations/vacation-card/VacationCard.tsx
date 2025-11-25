import './VacationCard.css'
import type VacationModel from '../../../models/vacation'
import LikeButton from '../../common/like-button/LikeButton'

interface VacationProps {
    vacation: VacationModel,
    role: "user" | "admin",
    onDelete?: (id: string) => void,
    onEdit?: (id: string) => void,
    onToggleFollow?: (id: string) => void
}

export default function VacationCard(props: VacationProps) {

    const { 
        id,
        startDate,
        endDate,
        destination,
        description,
        price,
        followerCount,
        isFollowed,
        imageUrl,
     } = props.vacation
    
    function handleToggleFollow() {
        props.onToggleFollow?.(id)
    }

    function removeMe() {
        if(confirm('are you sure?')) props.onDelete?.(id)
    }

    function editMe() {
        props.onEdit?.(id)
    }

    return (
        <div className='VacationCard'>
            <div className='vac-image'>
                <img src={imageUrl} alt={destination} />
                {props.role === "user" && (
                    <div className='like-button-container'>
                        <LikeButton
                            followerCount={followerCount}
                            isFollowed={isFollowed}
                            onToggle={handleToggleFollow}
                        />
                    </div>
                )}
            </div>
            <div className='vac-header'>
                <h3>{destination}</h3>
            </div>
            <div className='vac-dates'>
                {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </div>
            <p className='vac-desc'>
                {description}
            </p>
            <div className='vac-footer'>
                <div className='vac-price'>
                    {price}$
                </div>
                <div className='vac-actions'>

                    {props.role === "admin" && (
                        <div className='admin-actions'>
                            <button onClick={editMe}>edit vacation</button>
                            <button onClick={removeMe}>delete vacation</button>
                        </div>
                    )}

                </div>
            </div>

        </div>
    )

}