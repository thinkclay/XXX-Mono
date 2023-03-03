/** @format */

import { useRecoilValue } from 'recoil'

import { fetchingRevisionState } from '@common/helpers/root'
import { ToolbarActionProps } from './Toolbar'

function Rewrite({ handler }: ToolbarActionProps) {
  const fetching = useRecoilValue(fetchingRevisionState)

  return (
    <button className={`rewrite ${fetching ? 'active fetching' : ''}`} onClick={handler}>
      <svg viewBox="0 0 70 68">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M1,60.8136887 C9.89707842,62.3145438 16.2023892,62.3145438 19.9159324,60.8136887 C35.51424,54.5095207 43.4024564,35.0144928 35,15.463237 C31.1772116,6.56818174 24.231007,6.15839994 21.3955329,7.43148889 C15.1542794,10.233726 15.1629649,18.4298629 18.1706655,27.2075445 C21.6566022,37.3809114 33.4746261,45.6710531 42.3913043,42.4026571 C56.5916882,37.1975262 63.6918801,26.1762313 63.6918801,9.33877235"
            className="StrokeLayer"
          ></path>
        </g>
      </svg>
    </button>
  )
}

export default Rewrite
