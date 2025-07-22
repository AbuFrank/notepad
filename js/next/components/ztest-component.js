import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function TestComponent() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const api = '/api/ztest';

    // if not using SWR:
    // const [data, setTestData] = useState(null);
    // const grabData = async () => {
    //     const data = await fetch(api).then((res) => res.json());
    //     setTestData(data);
    //     console.log('data?', data);
    // };

    const { data, error } = useSWR(api, fetcher);

    // Run any hooks here prior to conditional returns

    // end early if there is an error
    if (error) {
        return (
            <div>
                failed to load <code>{JSON.stringify(error, null, 4)}</code>
            </div>
        );
    }

    // show loading states before
    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <code>{JSON.stringify(data, null, 4)}</code>
        </div>
    );
}
