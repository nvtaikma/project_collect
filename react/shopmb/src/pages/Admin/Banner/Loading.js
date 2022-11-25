import LoadingSkeleton from '../../../components/LoadingSkeleton';
function Loading({ count = 1 }) {
    return Array(count)
        .fill(0)
        .map((item, index) => {
            return (
                <tr key={index}>
                    <td>
                        <LoadingSkeleton width="48px" height="70px" />
                    </td>
                    <td>
                        <LoadingSkeleton width="274px" height="70px" />
                    </td>
                    <td>
                        <LoadingSkeleton width="168px" height="70px" />
                    </td>
                    <td>
                        <LoadingSkeleton width="300px" height="70px" />
                    </td>
                    <td>
                        <LoadingSkeleton width="146px" height="70px" />
                    </td>
                </tr>
            );
        });
}

export default Loading;
