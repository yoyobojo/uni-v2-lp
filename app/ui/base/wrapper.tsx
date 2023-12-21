import { ReactNode } from "react"
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Section } from "../components/section";

type IWrapper = {
  children: ReactNode;
}

export const Wrapper = ({ children }: IWrapper) => {
  return (
    <>
      <Section color="bg-gray-200" width="max-w-6xl">
        <nav>
          <Navbar />
        </nav>
      </Section>
      <Section color="bg-gray-100" width="max-w-5xl">
        <main>
          {children}
        </main>
      </Section>
      <Section color="bg-gray-200" width="max-w-6xl">
        <footer>
          <Footer />
        </footer>
      </Section>
    </>
  )
}