import starwarsbanner from './images/starwarsbanner.jpg';
import styles from './banner.module.css';

export function Banner() {
    return (
        <div>
            <img className={styles.banner} src={starwarsbanner} alt="banner" />
        </div>
    )
}
