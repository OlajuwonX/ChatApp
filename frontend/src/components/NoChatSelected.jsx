const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-10 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
                {/*Icon Display*/}
                <div className="flex gap-4 mb-4 justify-center">
                    <div className="relative">
                        <div
                            className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center animate-bounce">
                            <img className="size-11" src='/Linka.svg' alt="Linka"/>
                        </div>
                    </div>
                </div>

                {/*Welcome Text*/}
                <h2 className="text-2xl font-semibold">
                    Welcome to <span
                    className="text-2xl font-bold bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent tracking-wider"
                    style={{fontFamily: 'var(--font-logo)'}}>Linka</span>
                </h2>
                <p className="text-base-content/60">
                    Select a conversation from the sidebar to start talking
                </p>
            </div>
        </div>
    )
}
export default NoChatSelected
