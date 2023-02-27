import { v2 as cloudinaryV2 } from 'cloudinary'
import { NextApiRequest, NextApiResponse } from 'next'

cloudinaryV2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
})

const s3BucketName = 'cloudinary142057-dev'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const file = JSON.parse(req.body)
	console.log(file.fileName)

	//if using `amplify add function` use `amplify add function` to access bucket name
	const result = await cloudinaryV2.uploader.upload(
		`s3://${s3BucketName}/public/${file.fileName}`
	)

	console.log(result)

	return res.send({ result })
}
