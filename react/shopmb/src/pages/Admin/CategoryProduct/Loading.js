import LoadingSkeleton from '../../../components/LoadingSkeleton';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <LoadingSkeleton style={{ minWidth: '10px' }} height="40px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="40px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="40px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="40px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="40px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="40px" />
                    </td>
                </tr>
            );
        });
}

export default Loading;
