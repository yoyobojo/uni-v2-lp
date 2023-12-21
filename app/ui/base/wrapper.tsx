import { ReactNode } from "react"
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Section } from "@/ui/components/section";

type IWrapper = {
  children: ReactNode;
}

export const Wrapper = ({ children }: IWrapper) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Section color="bg-gray-200" width="max-w-6xl" className="shadow">
      <header>
          <Navbar />
      </header>
      </Section>
      <Section color="bg-gray-800" width="max-w-5xl" className="flex-grow">
        <main>
          {children}
        </main>
      </Section>
      <Section color="bg-gray-200" width="max-w-6xl">
        <footer>
          <Footer />
        </footer>
      </Section>
    </div>
  )
}