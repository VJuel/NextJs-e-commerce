'use server'
 
export async function deleteImage(data) {
  const cartId = cookies().get('cartId')?.value
  await saveToDb({ cartId, data })
}
