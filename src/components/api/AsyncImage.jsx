import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { Fade } from 'transitions-kit'

export const Image = ({ src ,className,inView,totalTime}) => {

  const [status, setStatus] = useState('loading')
  return (
    <>
      <Fade appear={false} in={status === 'loading'} unmountOnExit>
        <div className='flex w-full h-64 flex-col my-3 bg-gray-800 text-center'><p className="my-auto">Loading</p></div>
      </Fade>

      {inView && (
        <Fade in={status === 'loaded'}>
          <img
            src={src}
            className={className}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('failed')}
          />
        </Fade>
      )}

      <Fade in={status === 'failed'} mountOnEnter unmountOnExit>
        <div>error</div>
      </Fade>
    </>
  )
}

export const AsyncImage = (imageProps) => {
  return (
    <InView triggerOnce>
      {({ ref, inView }) => (
        <div ref={ref}>
          <Image inView={inView} {...imageProps} />
        </div>
      )}
    </InView>
  )
}
