import { FooterRota } from "../components/FooterRota"
import { HeadingRota } from "../components/HeadingRota"

type TemplateProps = {
children: React.ReactNode
}

export function Template({ children }: TemplateProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-black dark:text-white">
      <HeadingRota />
      <main className="flex flex-1 w-full items-center justify-center">{children}</main>
      <FooterRota />
    </div>
  )
}