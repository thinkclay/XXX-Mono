import YouTube from 'react-youtube'

interface Props {
  videoId: string
}

export default function YouTubePlayer({ videoId }: Props) {
  return (
    <YouTube
      videoId={videoId}
      onReady={event => {
        const player = event.target
        // player.playVideo()
      }}
      onError={error => {
        console.error('YouTube Player Error:', error)
      }}
    />
  )
}
