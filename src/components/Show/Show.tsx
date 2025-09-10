interface IShowProps {
  when: boolean
  children: React.ReactNode
}

const Show = ({ when, children }: IShowProps) => {
  if (when) {
    return <>{children}</>
  }

  return null
}

export default Show
