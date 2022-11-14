import LoadingSkeleton from '../../../components/LoadingSkeleton';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <LoadingSkeleton height="36px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="36px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="36px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="36px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="36px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="36px" />
                    </td>
                    <td>
                        <LoadingSkeleton height="36px" />
                    </td>
                </tr>
            );
        });
}

export default Loading;
