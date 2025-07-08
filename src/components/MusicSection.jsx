export default function MusicSection() {
    return (
        <section
            className="h-screen flex items-center justify-center relative overflow-hidden snap-start snap-always pb-24 md:pb-0"
            style={{ background: 'rgb(18, 18, 18)', boxShadow: 'rgba(0, 0, 0, 0.7) 0px 0px 150px inset' }}
        >
            <div className="overflow-hidden container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto opacity-100 transform-none">
                    <h2 className="mb-8 flex items-center justify-center">
                        <span
                            className="w-[90%] text-3xl md:text-6xl
                                text-transparent font-bold
                                bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500
                                bg-clip-text"
                        >
                            Que tal dar play na música que me faz reviver nossa história?
                        </span>
                    </h2>


                    <div className="mt-12 flex justify-center opacity-100 transform-none">
                        <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-full max-w-xl mx-auto shadow-2xl">
                            <iframe
                                src="https://www.youtube.com/embed/L0_nXyTMyqM?si=Uq2tKBUUKVc1CbHC&amp;start=5"
                                width="100%"
                                height="152"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                className="rounded-xl"
                                style={{ pointerEvents: 'auto' }}
                                title="Música que revive nossa história"
                            />
                            <p className="text-white/80 text-lg mt-4 italic opacity-100">
                                Dê play na música e continue rolando para reviver nossos momentos especiais...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}