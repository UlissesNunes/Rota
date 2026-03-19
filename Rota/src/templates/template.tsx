import { FooterRota } from "../components/FooterRota"
import { HeadingRota } from "../components/HeadingRota"

type TemplateProps = {
children: React.ReactNode
}

export function Template({ children }: TemplateProps) {
  return (
    <> 
       <HeadingRota />
      {children}
      <FooterRota />
    </>
  )
}