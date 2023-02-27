import { useState } from 'react'
import { Storage } from 'aws-amplify'
import { CldImage } from 'next-cloudinary'
import {
	Divider,
	FileUploader,
	Heading,
	Text,
	useTheme,
	View,
} from '@aws-amplify/ui-react'

export default function Home() {
	const theme = useTheme()
	const [file, setFile] = useState<null | File>()
	const [imgTag, setImageTag] = useState<null | string>()

	interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
		target: HTMLInputElement & {
			files: FileList
		}
	}

	function handleImageChange(event: FileInputEvent) {
		const file = event.target.files[0] as File
		setFile(file)
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault()

		if (file) {
			const res = await Storage.put(file.name, file)
			console.log(res)

			const cloudinaryRes = await fetch('/api/upload-image', {
				method: 'post',
				body: JSON.stringify({ fileName: res.key }),
			})
			const data = await cloudinaryRes.json()

			console.log('result from the img tag', data.result)
		}
	}

	const handleImageSuccess = async (e: { key: string }) => {
		const cloudinaryRes = await fetch('/api/upload-image', {
			method: 'post',
			body: JSON.stringify({ fileName: e.key }),
		})
		const data = await cloudinaryRes.json()

		console.log('result from the UI component', data.result)

		setImageTag(data.result.public_id)
	}

	return (
		<>
			<main>
				<View marginBlock={theme.tokens.space.xxl}>
					<form onSubmit={handleSubmit}>
						<Heading level={4}>
							Heres&apos;s and example using a regular image tag:
						</Heading>
						<Text>(check the devTools)</Text>
						<input
							type="file"
							name="image"
							onChange={handleImageChange}
							accept="image/*"
						/>
						<button type="submit">Upload</button>
					</form>
				</View>
				<Divider />
				<View marginBlock={theme.tokens.space.xxl}>
					<Heading level={4}>
						Heres&apos;s and example using a regular image tag:
					</Heading>
					<FileUploader
						acceptedFileTypes={['image/*']}
						accessLevel="public"
						onSuccess={handleImageSuccess}
						maxFileCount={1}
					/>

					{/* https://next-cloudinary.spacejelly.dev/components/cldimage/examples */}
					{imgTag ? (
						<CldImage
							width="600"
							height="600"
							src={imgTag}
							alt="Description of my image"
							crop="thumb"
							gravity="auto"
						/>
					) : (
						<></>
					)}
				</View>
			</main>
		</>
	)
}
