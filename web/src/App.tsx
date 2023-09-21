import { Wand2Icon } from 'lucide-react'
import { PromptField } from './components/prompt-field'
import { Header } from './layout/header'
import { Separator } from './components/ui/separator'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Slider } from './components/ui/slider'
import { HelperText } from './components/helper-text'
import { UploadForm } from './components/upload-form'

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="shrink-0">
        <Header />
      </div>

      <main className="flex grow p-2 gap-8">
        <div className="w-80 space-y-4">
          <UploadForm />

          <Separator />

          <form className="space-y-4">
            <div>
              <Label htmlFor="promptField" className="block pb-2">
                Prompt
              </Label>

              <Select>
                <SelectTrigger id="promptField">
                  <SelectValue placeholder="Selecione um prompt" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="youtubeTitle">
                    Título do YouTube
                  </SelectItem>

                  <SelectItem value="youtubeDescription">
                    Descrição do YouTube
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="modelField" className="block pb-2">
                Modelo
              </Label>

              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger
                  id="modelField"
                  aria-describedby="modelFieldHelperText"
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <HelperText id="modelFieldHelperText" className="mt-1">
                Você poderá customizar esta opção em breve.
              </HelperText>
            </div>

            <Separator />

            <div>
              <Label htmlFor="temperatureField" className="block pb-4">
                Temperatura
              </Label>

              <Slider
                id="temperatureField"
                min={0}
                max={1}
                step={0.1}
                aria-describedby="temperatureFieldHelperText"
              />

              <HelperText id="temperatureFieldHelperText" className="mt-2">
                Quanto mais alta for a temperatura, mas criativo será o
                resultado, porém com mais chances de erros.
              </HelperText>
            </div>

            <Button type="submit" className="w-full gap-2">
              <Wand2Icon
                className="block w-4 h-4 shrink-0"
                aria-hidden={true}
              />
              <span className="block shrink-0">Executar</span>
            </Button>
          </form>
        </div>

        <div className="grow flex flex-col gap-2">
          <div className="grid grid-rows-2 gap-4 grow">
            <PromptField
              label={
                <>
                  Inclua o prompt para a{' '}
                  <abbr title="Inteligência Artificial">IA</abbr>
                </>
              }
            />

            <PromptField
              label={
                <>
                  Resultado gerado pela{' '}
                  <abbr title="Inteligência Artificial">IA</abbr>
                </>
              }
              readOnly
            />
          </div>

          <HelperText>
            Lembre-se: você pode utilizar a variável{' '}
            <code className="text-violet-400">{'{transcription}'}</code> no seu
            prompt para adicionar conteúdo da transcrição do vídeo selecionado.
          </HelperText>
        </div>
      </main>
    </div>
  )
}
