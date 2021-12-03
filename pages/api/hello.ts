import { startCreating } from '../../core/hashlips/src/main'
import { upload } from '../../core/utils/upload'

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body)
    // buildSetup()

    let result = await startCreating(body.layerConfigs)

    // upload images to imgur
    const imgUrls = await Promise.all(result.map((item) => upload(item.image)))

    result = result.map((nft, index) => ({
      image: imgUrls[index],
      metadata: nft.metadata,
    }))

    res.status(200).json({ result })
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
}
