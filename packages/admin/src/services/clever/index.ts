'use server'

import createClient from 'openapi-fetch'
import { paths } from './schema' // (generated from openapi-typescript)

export async function getMe() {
  const { GET, POST } = createClient<paths>({
    baseUrl: 'https://api.clever.com/v3.0/',
    headers: { authorization: `Bearer a9d8f54716263679e484e2de6703c0a514c8dda7` },
  })

  const data = await GET('/terms', {
    params: {},
  })

  console.log('Here', data)
}

// const sdk = require('api')

// interface CleverGetTokensResponse {
//   data: {
//     id: string
//     created: string
//     owner: {
//       type: string
//       id: string
//     }
//     access_token: string
//     scope: string[]
//   }[]
//   links: {
//     rel: string
//     uri: string
//   }[]
// }

// interface CleverApiError {
//   error: string
//   error_description: string
// }

// export async function getTokens(): Promise<CleverGetTokensResponse | CleverApiError> {
//   const data = await sdk
//     .gettokens({
//       owner_type: 'district',
//       authorization: 'Basic MDk1YjgyY2JiZDhjNjg3MTRkMWM6NGIzMzg0ODljZWI0YmVjMzYyNDYxYTdjOTZlM2FhNjA5ZWZmZjA0OQ==',
//     })
//     .then(({ data }: CleverGetTokensResponse) => data)
//     .catch(console.log)

//   console.log('DATA UIN', data)

//   return data
// }
