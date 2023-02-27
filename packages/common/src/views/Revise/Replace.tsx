/** @format */

interface ReplaceProps {
  active?: boolean
  handler: () => void
}

function Replace({ active, handler }: ReplaceProps) {
  return (
    <button className={`replace ${active ? 'active' : ''}`} onClick={handler}>
      <svg viewBox="0 0 100 100">
        <g id="Style-Guide" stroke="none" fill="none" fillRule="evenodd">
          <rect id="Rectangle" x="0" y="0" width="100" height="100"></rect>
          <path
            className="FillLayer"
            d="M31.1719039,47.6206801 C33.1045759,50.5180081 42.7580239,68.8634401 42.7580239,68.8634401 C51.4469839,46.6555201 70.756904,17.69232 91.035344,9 C91.035344,9 87.173276,23.48328 92,39.8960401 C87.173276,43.7581081 67.86344,51.4821601 44.6911999,90.102841 C26.3455999,70.7929201 23.4484399,69.8277601 8,61.1362801 L31.1722399,47.6173201 L31.1719039,47.6206801 Z"
          ></path>
        </g>
      </svg>
    </button>
  )
}

export default Replace
