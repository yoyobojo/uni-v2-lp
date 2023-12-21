import { ReactNode } from "react"
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Section } from "../components/section";

type IWrapper = {
  children: ReactNode;
}

export const Wrapper = ({ children }: IWrapper) => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Section color="bg-gray-300" width="max-w-6xl">
      <header>
          <Navbar />
      </header>
      </Section>
      <Section color="bg-gray-100" width="max-w-5xl" className="flex-grow">
        <main>
          {children}
        </main>
      </Section>
      <Section color="bg-gray-300" width="max-w-6xl">
        <footer>
          <Footer />
        </footer>
      </Section>
    </div>
  )
}