'use server'

const sdk = require('api')('@clever-developers/v3.0#a4yydp3hl4rkftof')

const sample = `
{
  "data": [
    {
      "id": "62b4e190573f9600080cbf08",
      "created": "2022-06-23T21:56:32.335Z",
      "owner": {
        "type": "district",
        "id": "58da8a43cc70ab00017a1a87"
      },
      "access_token": "a9d8f54716263679e484e2de6703c0a514c8dda7",
      "scopes": [
        "read:district_admins_basic",
        "read:school_admins_basic",
        "read:students_basic",
        "read:teachers_basic",
        "read:user_id"
      ]
    },
  ],
  "links": [
    {
      "rel": "self",
      "uri": "/oauth/tokens?owner_type=district"
    }
  ]
}
`

interface CleverGetTokensResponse {
  data: {
    id: string
    created: string
    owner: {
      type: string
      id: string
    }
    access_token: string
    scope: string[]
  }[]
  links: {
    rel: string
    uri: string
  }[]
}

interface CleverApiError {
  error: string
  error_description: string
}

export async function getTokens(): Promise<CleverGetTokensResponse | CleverApiError> {
  const data: CleverGetTokensResponse | CleverApiError = await sdk
    .gettokens({
      owner_type: 'district',
      authorization: 'Basic MDk1YjgyY2JiZDhjNjg3MTRkMWM6NGIzMzg0ODljZWI0YmVjMzYyNDYxYTdjOTZlM2FhNjA5ZWZmZjA0OQ==',
    })
    .then(({ data }: CleverGetTokensResponse) => data)
    .catch(console.log)

  console.log('DATA UIN', data)

  return data
}
