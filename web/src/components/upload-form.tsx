import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { FileVideoIcon, UploadIcon } from 'lucide-react'
import { clsx } from 'clsx'
import { fetchFile } from '@ffmpeg/util'
import { getFFmpeg } from '@/lib/ffmpeg'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'
import { HelperText } from './helper-text'
import { Button } from './ui/button'
import { api } from '@/lib/axios'
import { Progress } from './ui/progress'

type Status = 'idle' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Convertendo…',
  generating: 'Transcrevendo…',
  uploading: 'Carregando…',
  success: 'Vídeo carregado',
}

export type UploadFormProps = {
  onVideoUploaded?: (id: string) => void
}

export const UploadForm = ({ onVideoUploaded }: UploadFormProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptFieldElement = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  const convertVideoToAudio = async (video: File) => {
    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    ffmpeg.on('progress', (progress) => {
      const currentProgress = Math.round(progress.progress * 100)

      setUploadProgress(currentProgress)
    })

    const ffmpegCommand =
      '-i input.mp4 -map 0:a -b:a 20k -acodec libmp3lame output.mp3'

    await ffmpeg.exec(ffmpegCommand.split(' '))

    const data = await ffmpeg.readFile('output.mp3')
    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    return audioFile
  }

  const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!videoFile) {
      return
    }

    try {
      setStatus('converting')

      const prompt = promptFieldElement.current?.value
      const audioFile = await convertVideoToAudio(videoFile)
      const formData = new FormData()

      formData.append('file', audioFile)

      setStatus('uploading')

      const response = await api.post<{
        message: string
        data: {
          createdAt: string
          id: string
          name: string
          path: string
          transcription: string | null
        }
      }>('/video', formData)
      const videoId = response.data.data.id

      setStatus('generating')

      await api.post(`/video/${videoId}/transcription`, {
        prompt,
      })

      setStatus('success')

      onVideoUploaded?.(videoId)
    } catch {
      setStatus('idle')
    }
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-4" onSubmit={handleUploadVideo}>
      <div>
        <input
          type="file"
          id="uploadVideoField"
          className="peer sr-only"
          accept="video/mp4"
          onChange={handleFileSelected}
        />

        <label
          htmlFor="uploadVideoField"
          className="flex flex-col items-center justify-center aspect-video relative font-bold cursor-pointer border border-dashed transition-colors overflow-hidden peer-focus:border-accent-foreground hover:border-accent-foreground peer-focus:bg-primary/5 hover:bg-primary/5"
        >
          {previewURL ? (
            <video
              src={previewURL}
              controls={false}
              className="pointer-events-none absolute inset-0"
            />
          ) : (
            <>
              <FileVideoIcon className="block w-8 h-8" aria-hidden={true} />
              <span className="block">Selecione um vídeo</span>
            </>
          )}
        </label>
      </div>

      <Separator />

      <div>
        <Label htmlFor="transcriptionPromptField" className="block pb-2">
          Prompt de transcrição
        </Label>

        <Textarea
          id="transcriptionPromptField"
          className="block"
          aria-describedby="transcriptionPromptHelperText"
          placeholder="Exemplo: eslint, html, react"
          ref={promptFieldElement}
        />

        <HelperText id="transcriptionPromptHelperText" className="mt-1">
          Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,).
        </HelperText>
      </div>

      {status === 'converting' && (
        <div>
          <p id="progressMessage" className="w-full">
            Convertendo o vídeo…
          </p>

          <div className="grid grid-cols-12 items-center gap-2">
            <Progress
              className="block grow col-span-10"
              value={uploadProgress}
              aria-labelledby="progressMessage"
              aria-describedby="progressValue"
            />
            <span
              id="progressValue"
              className="col-span-2 block shrink-0 text-right"
            >
              {uploadProgress}%
            </span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className={clsx([
          'w-full gap-2',
          status === 'success' && 'bg-emerald-500',
        ])}
        disabled={status !== 'idle'}
      >
        {status === 'idle' ? (
          <>
            <UploadIcon className="block w-4 h-4 shrink-0" />{' '}
            <span className="block shrink-0">Carregar vídeo</span>
          </>
        ) : (
          statusMessages[status]
        )}
      </Button>
    </form>
  )
}
