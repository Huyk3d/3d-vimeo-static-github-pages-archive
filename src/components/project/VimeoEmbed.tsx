export function VimeoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return <div className="aspect-video overflow-hidden bg-archive-surface"><iframe className="h-full w-full" src={`https://player.vimeo.com/video/${videoId}?loop=1`} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /></div>;
}
