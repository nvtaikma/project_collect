import styles from './Loading.module.css';
function Loading({ style, count = 6 }) {
    return (
        <div className={styles.ld_wapper} style={{ ...style }}>
            <div className={styles.loading}>
                {Array(count)
                    .fill(0)
                    .map((item, index) => {
                        return (
                            <span
                                key={index}
                                style={{
                                    transform: `rotate(${(360 * (index + 1)) / count}deg)`,
                                    animationDuration: `${0.07 * count}s`,
                                    animationDelay: `${0.07 * (index + 1)}s`,
                                }}
                            ></span>
                        );
                    })}

                {/* <span data-count="2" style={{ transform: 'rotate(calc(18deg * (3.3*2)' }}></span>
                <span data-count="3" style={{ transform: 'rotate(calc(18deg * (3.3*3)' }}></span>
                <span data-count="4" style={{ transform: 'rotate(calc(18deg * (3.3*4)' }}></span>
                <span data-count="5" style={{ transform: 'rotate(calc(18deg * (3.3*5)' }}></span>
                <span data-count="6" style={{ transform: 'rotate(calc(18deg * (3.3*6)' }}></span> */}
            </div>
        </div>
    );
}

export default Loading;
