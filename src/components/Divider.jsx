export default function Divider() {
    return (
        <div className="flex items-center gap-4 my-12 max-w-5xl mx-auto px-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-naranja/40" />
            <span className="scissors text-oro text-2xl select-none">✂</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-naranja/40" />
        </div>
    )
}