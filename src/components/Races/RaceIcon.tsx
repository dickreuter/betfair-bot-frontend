import { dog, horse } from '../../assets/images';

const RaceIcon = ({ raceTitle }) => {
    let imagePath = '';

    if (raceTitle.includes('Horse')) {
        imagePath = horse;
    } else if (raceTitle.includes('Dog')) {
        imagePath = dog;
    }

    return (
        <div>
            {imagePath && <img src={imagePath} alt="race-icon" width="40" height="40" />}
        </div>
    );
}

export default RaceIcon;
