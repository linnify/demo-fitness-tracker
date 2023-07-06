import { cn } from '@app/lib/utils';

export default function ProfileARI({ className }: { className: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4 rounded-xl bg-white px-4 py-4 shadow md:gap-8 md:px-8 md:py-6',
        className
      )}
    >
      <div className={'flex flex-col gap-1'}>
        <div className={'flex items-center gap-1'}>
          <span className={'text-body-2 font-semibold text-neutral-dark'}>Până la</span>{' '}
          <span className={'text-2xl font-bold text-accent'}>65-70%</span>
        </div>
        <div className={'text-body-2 text-right text-neutral-dark'}>
          Prin comenzi pentru <br /> prânz și cină
        </div>
      </div>

      <img src={'/images/calories.png'} />

      <div className={'flex flex-col gap-1'}>
        <div className={'text-2xl font-bold text-primary'}>35-30%</div>
        <div className={'text-body-2 text-left text-neutral-dark'}>
          Prin sugestii de mic <br /> dejun și gustări
        </div>
      </div>
    </div>
  );
}
