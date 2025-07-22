// Bare-bones Next.js client response
// accessed via "/api/ztest"
// Next will use the name of the file for the url
export default function ztestApi(_, res) {
    res.json({
        test: 'test',
        success: 'you tell me',
        fun: 'times',
    });
}
