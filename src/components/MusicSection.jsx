import PropTypes from 'prop-types'

export default function MusicSection({ music }) {
  const { youtubeLink, title, description } = music

  return (
    <section
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden snap-start snap-always pb-20 md:pb-0"
      style={{
        background: 'rgb(18, 18, 18)',
        boxShadow: 'rgba(0, 0, 0, 0.7) 0px 0px 150px inset',
      }}
    >
      <div className="container mx-auto px-4 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 text-transparent text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text md:text-6xl">
            {title}
          </h2>

          <div className="mt-12 mx-auto max-w-xl rounded-2xl bg-black/30 p-6 backdrop-blur-md border border-white/10 shadow-2xl">
            <iframe
              src={youtubeLink}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="rounded-xl"
              style={{ pointerEvents: 'auto' }}
              title={title}
              loading="lazy"
              allowFullScreen
            />
            <p className="mt-4 text-lg italic text-white/80">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

MusicSection.propTypes = {
  music: PropTypes.shape({
    youtubeLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
}