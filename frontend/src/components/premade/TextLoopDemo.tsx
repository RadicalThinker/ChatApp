import { TextLoop } from './core/TextLoop';

export function TextLoopCustomVariantsTransition() {
  return (
    <p className='inline-flex whitespace-pre-wrap text-lg'>
      {' '}
      <TextLoop
        className='overflow-y-clip'
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 80,
          mass: 10,
        }}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: 'blur(4px)',
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: 'blur(4px)',
          },
        }}
      >
        <span>Suno kahaniya 📖 </span>
        <span>Sunao dil ki baat ❤️  </span>
        <span>Suno dost ka haal 💬  </span>
        <span>Sunao apna raaz 🤫</span>
        <span>Suno jokes & memes 😂  </span>
        <span>Sunao apni vibes ✨ </span>



 
      </TextLoop>
    </p>
  );
}
