import LoadingSkeleton from '../../../components/LoadingSkeleton';
import styles from './HomeAdmin.module.css';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <LoadingSkeleton height="28px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="28px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="28px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="28px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="28px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="28px" />
                    </td>
                </tr>
            );
        });
}

export default Loading;
