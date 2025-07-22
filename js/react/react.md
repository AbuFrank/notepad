# React

```js
<pre>{JSON.stringify(factoidRect, null, 2)}</pre>
```

## onError image fallback

```js
export const addProductSampleImage = (event: any) => {
  event.target.src = '/path/to/my/fallback/image';
}
<img

onError={addProductSampleImage}


src={`https://myimage.com/image-that-doesnt-exist`}
/>
```
