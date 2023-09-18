import { CollectionTypes } from '@common/models'

export function recordUrl(collection: CollectionTypes, id: string): string {
  return `https://console.firebase.google.com/u/0/project/unicorn-revision/firestore/data/~2F${collection}~2F${id}`
}
