import styles from './LoadingSkeleton.module.css';
function LoadingSkeleton({ count = 1, width = '100%', height = '100%', circle, style = {} }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <div
                    key={index}
                    className={`${styles.wapper} ${circle ? styles.circle : ''} `}
                    style={{ width, height, ...style }}
                ></div>
            );
        });
}

export default LoadingSkeleton;
