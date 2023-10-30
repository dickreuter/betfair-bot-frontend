import { dog, horse } from '../../assets/images';

const RaceIcon = ({ raceTitle }) => {
    let imagePath = '';

    if (raceTitle.includes('Greyhound')) {
        imagePath = dog;
    } else if (raceTitle.includes('Horse')) {
        imagePath = horse;
    }

    return (
        <div>
            {imagePath && <img src={imagePath} alt="race-icon" width="40" height="40" />}
        </div>
    );
}

export default RaceIcon;
