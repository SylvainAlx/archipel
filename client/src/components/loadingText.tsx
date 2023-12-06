interface LoadingTextProps {
    label: string;
}

export default function LoadingText({ label }: LoadingTextProps){
    
    return (
        <div className="animate-pulse animate-infinite animate-duration-[3000ms] text-sm text-info">{label}</div>
    )
}