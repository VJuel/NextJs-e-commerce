import mongooseConnect from "@/src/lib/mongoose"

export async function main() {
  try {
    await mongooseConnect()
  } catch (e) {
    console.log(e)
  }
}
