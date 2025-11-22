import './VacationCard.css'
import type VacationModel from '../../../models/vacation'
// import { useNavigate } from 'react-router-dom'
import useRole from '../../../hooks/use-role'
import LikeButton from '../../common/like-button/LikeButton'
import useService from '../../../hooks/use-service'
import FollowsServices from '../../../services/auth-aware/FollowsServices'
import { useState } from 'react'

interface VacationProps {
    vacation: VacationModel,
    onDelete?: (id: string) => void,
    onEdit?: (id: string) => void
}

export default function VacationCard(props: VacationProps) {

    const { 
        id,
        startDate,
        endDate,
        destination,
        description,
        followerCount,
        isFollowed,
        price,
        imageUrl
     } = props.vacation

    const role = useRole()

    const followService = useService(FollowsServices)

    const [followed, setFollowed] = useState<boolean>(isFollowed)
    const [count, setCount] = useState<number>(followerCount)
    
    async function handleToggleFollow() {

        try {
            if(followed) {
                console.log(`you just unlike:`, id)
                await followService.unfollow(id)
                setFollowed(false)
                setCount(count - 1)
            } else {
                console.log(`you just liked:`, id)
                await followService.follow(id)
                setFollowed(true)
                setCount(count + 1)
            }
            console.log('toggled successfully')
        } catch(e) {
            alert(e)
        }

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

                    {role === "user" && (
                        <LikeButton
                            followerCount={count}
                            isFollowed={followed}
                            onToggle={handleToggleFollow}
                        />
                    )}

                    {role === "admin" && (
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