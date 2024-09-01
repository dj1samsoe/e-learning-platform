import Image from "next/image";

interface VideoThumbnailProps {
  playbackId: string | null | undefined;
}

export const VideoThumbnail = ({ playbackId }: VideoThumbnailProps) => {
  const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png`;

  return (
    <Image
      src={thumbnailUrl}
      alt="Video Thumbnail"
      width={800}
      height={360}
      layout="responsive"
    />
  );
};
