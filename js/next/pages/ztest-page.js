import Test from '../components/ztest-component';

const id = 5;
export default function TestPage() {
    return (
        <div>
            <h1>Testing client-side data fetching</h1>
            <div>
              <Test id/>
            </div>
        </div>
    );
}
