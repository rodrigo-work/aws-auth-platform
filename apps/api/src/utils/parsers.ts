import lodash from 'lodash'
import { z } from 'zod'

const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean()
})

export function renameAndOrder(obj, renameMap, order) {
  const renamedObj = lodash.mapKeys(obj, (value, key) => renameMap[key] || key)

  const orderedObj = order.reduce((acc, key) => {
    if (Object.hasOwn(renamedObj, key)) {
      acc[key] = renamedObj[key]
    }
    return acc
  }, {})

  return orderedObj
}
