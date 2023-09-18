import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GithubIcon } from 'lucide-react'

export const Header = () => {
  return (
    <header className="flex items-center gap-4 p-2 border-b">
      <h1 className="text-xl font-bold grow">upload.ai</h1>

      <p className="text-muted-foreground">
        Desenvolvidor com <abbr title="amor">❤</abbr> no{' '}
        <abbr title="Next Level Week">NLW</abbr> da Rocketseat
      </p>

      <Separator orientation="vertical" className="h-8" />

      <Button className="gap-2" variant="outline" asChild>
        <a href="https://github.com/ricardospalves/rocketseat-nlw-ia-mastery">
          <GithubIcon className="block w-4 h-4 shrink-0" aria-hidden={true} />
          <span className="block shrink-0">GitHub</span>
        </a>
      </Button>
    </header>
  )
}
