/** @format */

interface MenuProps {
  open: boolean
  handler: () => void
}

function Menu({ open, handler }: MenuProps) {
  return (
    <button className={open ? 'Menu active' : 'Menu'} onClick={handler}>
      <svg viewBox="0 0 100 100">
        <g stroke="none" fill="none" fillRule="evenodd">
          <rect x="0" y="0" width="100" height="100"></rect>
          <path
            className="FillLayer"
            d="M93.75,56 L6.25,56 C2.749,56 0,53.36096 0,50 C0,46.63904 2.749,44 6.25,44 L93.75,44 C97.251,44 100,46.63904 100,50 C100,53.36096 97.251,56 93.75,56 Z M93.75,24 L6.25,24 C2.749,24 0,21.36096 0,18 C0,14.63904 2.749,12 6.25,12 L93.75,12 C97.251,12 100,14.63904 100,18 C100,21.36096 97.251,24 93.75,24 Z M6.25,76 L93.75,76 C97.251,76 100,78.63904 100,82 C100,85.36096 97.251,88 93.75,88 L6.25,88 C2.749,88 0,85.36096 0,82 C0,78.63904 2.749,76 6.25,76 Z"
            id="Fill-1"
          ></path>
        </g>
      </svg>
    </button>
  )
}

export default Menu
