function CurrentStep(){
    return (
        //Circle Current Progress Step
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_12480_10846)">
        <g clip-path="url(#clip0_12480_10846)">
        <path d="M4 20C4 11.1634 11.1634 4 20 4V4C28.8366 4 36 11.1634 36 20V20C36 28.8366 28.8366 36 20 36V36C11.1634 36 4 28.8366 4 20V20Z" fill="#FFE4C4"/>
        <path d="M20 5C28.2843 5 35 11.7157 35 20C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5Z" fill="#FF8A00"/>
        <path d="M20 5C28.2843 5 35 11.7157 35 20C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5Z" stroke="#FF8A00" stroke-width="2"/>
        <circle cx="20" cy="20" r="5" fill="white"/>
        </g>
        </g>
        <defs>
        <filter id="filter0_d_12480_10846" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_12480_10846"/>
        <feOffset/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.541176 0 0 0 0 0 0 0 0 0.24 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12480_10846"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12480_10846" result="shape"/>
        </filter>
        <clipPath id="clip0_12480_10846">
        <path d="M4 20C4 11.1634 11.1634 4 20 4V4C28.8366 4 36 11.1634 36 20V20C36 28.8366 28.8366 36 20 36V36C11.1634 36 4 28.8366 4 20V20Z" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    )
}

export default CurrentStep;