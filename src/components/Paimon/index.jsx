export const Paimon = () => {
    return (
        <>
            <div className="paimon">
                    <img src='https://i.pinimg.com/originals/fa/67/4a/fa674ae8c5949eb8c73c4fb819d78849.png' alt="Paimon" />
            </div>
            <style jsx>{
                `
                @keyframes float {
                    0% {
        
                        transform: translatey(0px);
                    }
                    50% {
                
                        transform: translatey(-20px);
                    }
                    100% {
                    
                        transform: translatey(0px);
                    }
                }
                .paimon {
                    position: absolute;
                    left: -6%;
                    top: -16%;
                    z-index: 1;
                    transform: translatey(0px);
                    animation: float 5s ease-in-out infinite;
                    
                }
                .paimon img { width: 180px; height: 180px; }}`
            }
            </style>

        </>
    )
}