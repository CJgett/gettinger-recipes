import Image from "next/image";

export default function ImagePlusText({imageSrc = "", altText = "", imageLeft = true, flexText = 1, flexImage = 1, imageWidth = 600, imageHeight = 600, pText = ""}) {
    return (
        <div className="image-plus-text">
            {imageLeft ? 
                <>
                    <Image src={imageSrc} height={imageHeight} width={imageWidth} alt={altText} style={{flex:flexImage}}></Image>
                    <p style={{flex:flexText}}>{pText}</p>
                </>
                :
                <>
                    <p style={{flex:flexText}}>{pText}</p>
                    <Image src={imageSrc} height={imageHeight} width={imageWidth} alt={altText} style={{flex:flexImage}}></Image>
                </>
            }
        </div>
    );
}