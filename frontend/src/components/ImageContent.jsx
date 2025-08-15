const ImageContent = ({title, subtitle}) => {
    return (
        <div
            className="hidden lg:flex items-center justify-center bg-base-200 p-15">
            <div className="max-w-md text-center">
                <div className="mb-4">
                    <img
                        className="h-full w-full object-cover object-center rounded-lg"
                        src="/ImageContent.jpg" alt=""/>
                </div>
                <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    )
}
export default ImageContent
