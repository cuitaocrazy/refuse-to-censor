export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    //className="flex flex-wrap justify-between after:flex-auto after:content-['']"
    // flex flex-wrap justify-items-center gap-y-10
    <div className="m-auto grid grid-cols-[repeat(2,192px)] place-content-center justify-items-center gap-2 sm:grid-cols-[repeat(3,192px)] md:grid-cols-[repeat(4,192px)] lg:grid-cols-[repeat(5,192px)] xl:grid-cols-[repeat(6,192px)] 2xl:grid-cols-[repeat(7,192px)]">
      {children}
    </div>
  )
}
