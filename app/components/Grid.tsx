export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid gap-y-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
      }}
    >
      {children}
    </div>
  )
}
