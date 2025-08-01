export function TailwindIndicator() {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div
      data-tailwind-indicator=""
      className="right-4.5 bottom-4.5 fixed z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white"
    >
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
