# Fetch Data

## Fetch data from api with an access key in URL

```js
const fetchNasa = async () => {
  return fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => console.log("FETCH?? ==> ", data));
};
```

## Fetch data using Bearer token

```js
async function fetchGraphQL(query, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    preview
                    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                    : process.env.CONTENTFUL_ACCESS_TOKEN
                }`,
            },
            body: JSON.stringify({ query }),
        }
    ).then((response) => response.json());
}
```

## useFetch

```js
const { data, loading } = useFetch(`http://numbersapi.com/${count}/trivia`);
```
