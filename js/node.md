# node

## snippets

### create csv file of specific field of all docs from firebase snapshot

``` js
const csvData = []
    const userNames = []

    usersSnapshot.forEach((doc) => {
      csvData.push(doc.data().email)
      userNames.push(doc.data().userName)
    })
    const csvRows = csvData.join('\r\n')
    const csvCols = csvData.join(', ')
    writeFileSync('FILE.CSV', csvStr)
```

When looping through messages: check that the userId is a lowercase  
version of the email. If not, create an oldUserId equal to userId

on the second loop comment the first await and uncomment the check for oldUserId  
if there is oldUserId, set userId to the base64 of the lowercase email

```js
    const email = Buffer.from(mesData.userId, 'base64').toString()
      if (email !== email.toLowerCase()) {
        console.log('email not lower case')
        const mesRef = doc(firebaseDB, 'messages', mesDoc.id)
        await updateDoc(mesRef, { oldUserId: mesData.userId })
          .then(() => console.log(`${mesDoc.id} updated: `))
          .catch((err) => {
            throw new Error('Failed to set userName for message', {
              cause: { err }
            })
          })
        // if (mesData.oldUserId && mesData.oldUserId === mesData.userId) {
        //   await updateDoc(mesRef, {
        //     userId: Buffer.from(email.toLowerCase()).toString('base64')
        //   })
        //     .then(() => console.log(`${mesDoc.id} updated: `))
        //     .catch((err) => {
        //       throw new Error('Failed to set userName for user', {
        //         cause: { err }
        //       })
        //     })
        // }
      }
```

firstore migration for creating new user and copying data

```js

    const usersMap = {}
    const duplicates = []
    await Promise.all(
      usersSnapshot.docs.map(async (userDoc) => {
        const userData = userDoc.data()
        const base64 = Buffer.from(userData.email.toLowerCase()).toString(
          'base64'
        )
        // prettier-ignore
        // console.log('user data: ', {
        //   email : userData.email,
        //   base64,
        //   id    : userDoc.id
        // })
        if (userDoc.id !== base64) {
          console.log('email is not lower case, updating userName', userData.email)
          const userRef = doc(firebaseDB, 'users', userDoc.id)
          if (userData.userName) {
            await updateDoc(userRef, { oldUserName: userData.userName })
              .then(() => console.log(`${userData.email} updated: `))
              .catch((err) => {
                throw new Error('Failed to set userName for user', {
                  cause: { err }
                })
              })
          }
          // if (
          //   userData.userName &&
          //   userData.oldUserName &&
          //   userData.userName === userData.oldUserName
          // ) {
          //   console.log('found oldUserName, deleting userName')
          //   await updateDoc(userRef, { userName: deleteField() })
          //     .then(() => console.log(`${userData.email} updated: `))
          //     .catch((err) => {
          //       throw new Error('Failed to set userName for user', {
          //         cause: { err }
          //       })
          //     })
          // }
        }
        // const user = usersMap[base64]
        // if (!user) {
        //   usersMap[base64] = [userDoc.id]
        // } else {
        //   usersMap[base64].push(userDoc.id)
        // }
        // console.log('usersMap: ', usersMap)
        // const userRef = doc(firebaseDB, 'users', base64)
        // const lowerUser = await getDoc(userRef).catch((err) =>
        //   console.log('getDoc error:', err)
        // )

        // if (lowerUser.exists()) {
        //   console.log('lower user exists', lowerUser.data())
        //   // duplicates.push
        //   // TODO check if both have usernames and log them
        // } else {
        //   console.log('not exist, creating')
        //   await createUser(base64, userData.email.toLowerCase(), userData.userName).then(() => { console.log('success') })
        //   // if (userData.userName) {
        //   //   console.log('old data has userName: ', userData.userName)
        //   //   await setUserName(userData.userName, base64)
        //   // }
        // }
      })
    )
    // console.log('final duplicates', usersMap)
    console.log('final duplicate count', duplicates)

    // // // let doubles = 0
    // // // Object.values(usersMap).forEach((userArr) => {
    // // //   if (userArr.length > 1) {
    // // //     doubles++
    // // //     console.log('doubles! ', userArr)
    // // //   }
    // // // })
    // // // console.log('doubles: ', doubles)

```
