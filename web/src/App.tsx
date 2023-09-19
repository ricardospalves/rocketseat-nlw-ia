import { PromptField } from './components/prompt-field'
import { Header } from './layout/header'

export const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="shrink-0">
        <Header />
      </div>

      <main className="flex grow p-2 gap-2">
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

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{' '}
            <code className="text-violet-400">{'{transcription}'}</code> no seu
            prompt para adicionar conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>

        <div className="w-80"></div>
      </main>
    </div>
  )
}
