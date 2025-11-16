import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { IslamicImageQuote } from "@/data/islamicImageQuotesData";
import { IslamicImage } from "@/data/islamicImages";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageCardProps {
  image: IslamicImage | IslamicImageQuote;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getImageUrl = (img: IslamicImage | IslamicImageQuote) => {
    if ('full' in img) {
      return img.full;
    }
    return img.src;
  };

  const getThumbnailUrl = (img: IslamicImage | IslamicImageQuote) => {
    if ('thumbnail' in img) {
      return img.thumbnail;
    }
    return img.src;
  };

  const getAltText = (img: IslamicImage | IslamicImageQuote) => {
    if ('quote' in img && img.quote) {
      return img.quote;
    }
    if ('alt' in img && img.alt) {
      return img.alt;
    }
    return `Islamic Image ${img.id}`;
  };

  const handleDownload = () => {
    const imageUrl = getImageUrl(image);
    console.log("Attempting to open image for download from:", imageUrl);
    window.open(imageUrl, '_blank');
    alert("Image opened in a new tab. You can right-click and save it from there.");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const imageUrl = getImageUrl(image);
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `islamic-image-${image.id}.jpg`, { type: blob.type });

        await navigator.share({
          files: [file],
          title: getAltText(image),
          text: `Check out this Islamic image: ${getAltText(image)}`,
        });
        console.log("Image shared successfully");
      } catch (error) {
        console.error("Error sharing image:", error);
        alert("Failed to share image.");
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <Card className="overflow-hidden">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <CardContent className="p-0 cursor-pointer">
            <img
              src={getThumbnailUrl(image)}
              alt={getAltText(image)}
              className="w-full h-48 object-cover"
            />
          </CardContent>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0">
          <img
            src={getImageUrl(image)}
            alt={getAltText(image)}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </DialogContent>
      </Dialog>
      <CardFooter className="flex justify-between items-center p-2">
        <span className="text-sm font-medium">{getAltText(image)}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
