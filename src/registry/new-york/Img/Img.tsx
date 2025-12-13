"use client";

// eslint-disable-next-line no-restricted-imports
import Image from "next/image";
import {
  type ComponentProps,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

// the image is also in the public folder https://mhl5.vercel.app/image-placeholder.svg
const fallbackSvgBase64 =
  "data:image/svg+xml;base64,IDxzdmcNCiAgICAgIHdpZHRoPSIxMDI0Ig0KICAgICAgaGVpZ2h0PSIxMDI0Ig0KICAgICAgdmlld0JveD0iMCAwIDEwMjQgMTAyNCINCiAgICAgIGZpbGw9Im5vbmUiDQogICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICAgPg0KICAgICAgPGcgY2xpcFBhdGg9InVybCgjY2xpcDBfMTEwM18zMzQpIj4NCiAgICAgICAgPHBhdGgNCiAgICAgICAgICBkPSJNNzk1LjEzNiAzMjAuMjU2Qzc5Mi41MTggMzE3LjQyIDc4OS4zNjQgMzE1LjEzIDc4NS44NTYgMzEzLjUxOEM3ODIuMzQ4IDMxMS45MDcgNzc4LjU1NiAzMTEuMDA3IDc3NC42OTkgMzEwLjg3TDU1Mi4zMiAzMDIuMTIzTDUzNS40NjcgMzM5LjI0M0w1NTguNjM0IDQwOS4xMzFMNTE2Ljc3OSA0ODguNjE5TDUzMy44NDUgNTUyLjYxOUw1NzYuMDg1IDYwNy41NzRMNjM3LjI2OSA1NTAuOTk4QzY0MC4xMzcgNTQ4LjM3MiA2NDMuOTI4IDU0Ni45ODggNjQ3LjgxMyA1NDcuMTQ4QzY1MS42OTggNTQ3LjMwOCA2NTUuMzYyIDU0OC45OTkgNjU4LjAwNSA1NTEuODUxTDczNi43MjUgNjM3LjAxNEM3MzguNjgxIDYzOS4xNTggNzM5Ljk2NyA2NDEuODI4IDc0MC40MjIgNjQ0LjY5NEM3NDAuODc2IDY0Ny41NjEgNzQwLjQ4MSA2NTAuNDk3IDczOS4yODUgNjUzLjE0MkM3MzguMDYyIDY1NS43NzQgNzM2LjA5MSA2NTcuOTg3IDczMy42MTcgNjU5LjUwNUM3MzEuMTQzIDY2MS4wMjMgNzI4LjI3NiA2NjEuNzc3IDcyNS4zNzYgNjYxLjY3NUw1MDkuNjk2IDY1My4yMjdMNDk4Ljk0NCA2ODQuMTE4TDUxMC41OTIgNzEyLjAyMkw3NTguNTcxIDcyMS42MjJDNzYyLjQyNiA3MjEuNzcgNzY2LjI3MyA3MjEuMTU3IDc2OS44OTIgNzE5LjgxN0M3NzMuNTEgNzE4LjQ3OCA3NzYuODI5IDcxNi40MzggNzc5LjY1OCA3MTMuODE1Qzc4Mi40ODggNzExLjE5MSA3ODQuNzcyIDcwOC4wMzYgNzg2LjM4MSA3MDQuNTI5Qzc4Ny45OSA3MDEuMDIyIDc4OC44OTIgNjk3LjIzMiA3ODkuMDM1IDY5My4zNzZMODAyLjg1OSAzNDEuMzM0QzgwMy4wMzYgMzM3LjQ4NCA4MDIuNDQ0IDMzMy42MzcgODAxLjExOCAzMzAuMDE4Qzc5OS43OTIgMzI2LjM5OSA3OTcuNzU5IDMyMy4wODEgNzk1LjEzNiAzMjAuMjU2Wk02MzUuNzc2IDQ4MS42NjRDNjI5Ljg1MSA0ODEuNjUxIDYyMy45ODkgNDgwLjQ0MyA2MTguNTQyIDQ3OC4xMTJDNjEzLjA5NCA0NzUuNzgyIDYwOC4xNzMgNDcyLjM3NyA2MDQuMDcxIDQ2OC4xMDFDNTk5Ljk2OSA0NjMuODI2IDU5Ni43NzIgNDU4Ljc2NyA1OTQuNjY5IDQ1My4yMjdDNTkyLjU2NyA0NDcuNjg4IDU5MS42MDQgNDQxLjc4MSA1OTEuODM2IDQzNS44NjFDNTkyLjA2OCA0MjkuOTQgNTkzLjQ5MiA0MjQuMTI3IDU5Ni4wMjIgNDE4Ljc3QzU5OC41NTIgNDEzLjQxMiA2MDIuMTM3IDQwOC42MTkgNjA2LjU2MSA0MDQuNjc4QzYxMC45ODUgNDAwLjczNyA2MTYuMTU5IDM5Ny43MjkgNjIxLjc3MiAzOTUuODMzQzYyNy4zODYgMzkzLjkzNyA2MzMuMzI0IDM5My4xOTIgNjM5LjIzMiAzOTMuNjQzQzY1MC42MDYgMzk0LjUxMSA2NjEuMjAxIDM5OS43NTYgNjY4Ljc4OCA0MDguMjc0QzY3Ni4zNzYgNDE2Ljc5MiA2ODAuMzY1IDQyNy45MiA2NzkuOTE4IDQzOS4zMTlDNjc5LjQ3IDQ1MC43MTggNjc0LjYyIDQ2MS40OTkgNjY2LjM4OCA0NjkuMzk2QzY1OC4xNTYgNDc3LjI5MyA2NDcuMTgzIDQ4MS42OSA2MzUuNzc2IDQ4MS42NjRaTTQ3NS45MDQgNjg0LjYzTDQ4My4zNzEgNjUyLjIwM0wzMDguMjI0IDY2NC4yNzhDMzA1LjMxNyA2NjQuNDk0IDMwMi40MTMgNjYzLjgzOSAyOTkuODc5IDY2Mi4zOThDMjk3LjM0NiA2NjAuOTU3IDI5NS4yOTkgNjU4Ljc5NSAyOTQgNjU2LjE4NkMyOTIuNyA2NTMuNTc4IDI5Mi4yMDYgNjUwLjY0MSAyOTIuNTgxIDY0Ny43NTFDMjkyLjk1NyA2NDQuODYxIDI5NC4xODQgNjQyLjE0OCAyOTYuMTA3IDYzOS45NThMNDI1Ljg5OSA0OTAuOTIzQzQyNy4yMzggNDg5LjM5MSA0MjguODgxIDQ4OC4xNTQgNDMwLjcyMyA0ODcuMjkxQzQzMi41NjYgNDg2LjQyOCA0MzQuNTY4IDQ4NS45NTcgNDM2LjYwMiA0ODUuOTA5QzQzOC42MzYgNDg1Ljg2MSA0NDAuNjU4IDQ4Ni4yMzYgNDQyLjUzOSA0ODcuMDExQzQ0NC40MjEgNDg3Ljc4NiA0NDYuMTIgNDg4Ljk0NCA0NDcuNTMxIDQ5MC40MTFMNDkwLjk2NSA1MzUuNzIzTDQ3Mi4yNzcgNDg3LjQyNEw1MDUuMjE2IDQwNC4wNTRMNDc0LjgzNyAzMzcuMzIzTDQ4Ny41MDkgMjk4LjY2N0wyNDguNjYxIDMxNS4xMzZDMjQ0LjgxMiAzMTUuNDAxIDI0MS4wNTQgMzE2LjQyNCAyMzcuNjAxIDMxOC4xNDVDMjM0LjE0OCAzMTkuODY1IDIzMS4wNjggMzIyLjI1MSAyMjguNTM5IDMyNS4xNjVDMjI2LjAxIDMyOC4wNzggMjI0LjA4MSAzMzEuNDYyIDIyMi44NjMgMzM1LjEyM0MyMjEuNjQ1IDMzOC43ODMgMjIxLjE2MSAzNDIuNjQ4IDIyMS40NCAzNDYuNDk2TDI0NS42NzUgNjk4LjA3QzI0NS45MjEgNzAxLjkwNCAyNDYuOTI3IDcwNS42NTEgMjQ4LjYzNCA3MDkuMDk0QzI1MC4zNCA3MTIuNTM2IDI1Mi43MTMgNzE1LjYwNSAyNTUuNjE2IDcxOC4xMjNDMjYxLjUwNCA3MjMuMiAyNjkuMTg0IDcyNS44MDMgMjc2Ljk0OSA3MjUuMjkxTDQ5MC4xOTcgNzEwLjU3MUw0NzUuOTA0IDY4NC42M1oiDQogICAgICAgICAgZmlsbD0iI0NDQ0RDRiINCiAgICAgICAgLz4NCiAgICAgIDwvZz4NCiAgICAgIDxkZWZzPg0KICAgICAgICA8Y2xpcFBhdGggaWQ9ImNsaXAwXzExMDNfMzM0Ij4NCiAgICAgICAgICA8cmVjdCB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiBmaWxsPSJ3aGl0ZSIgLz4NCiAgICAgICAgPC9jbGlwUGF0aD4NCiAgICAgIDwvZGVmcz4NCiAgICA8L3N2Zz4=";

type ImgProps = ComponentProps<typeof Image>;

type ImgState = "unoptimized-fallback" | "fallback-svg" | "default";

export default function Img({
  src,
  alt,
  placeholder: placeholderProp,
  ...props
}: ImgProps) {
  const [imgState, setImageState] = useState<ImgState>("default");
  const placeholder = src ? placeholderProp : "empty";
  const srcRef = useRef(src);

  const onSrcChange = useEffectEvent(() => {
    setImageState("default");
  });

  useEffect(() => {
    if (src !== srcRef.current) onSrcChange();
  }, [src]);

  // display fallback svg when image fails to load
  if (imgState === "fallback-svg")
    return (
      <Image
        src={fallbackSvgBase64}
        placeholder={placeholder}
        alt={alt}
        {...props}
      />
    );

  // prevents the application from crashing if the image type is falsy
  const safeSrc = src || fallbackSvgBase64;

  // when next js optimization timeouts, display unoptimized image
  if (imgState === "unoptimized-fallback")
    return (
      <Image
        src={safeSrc}
        placeholder={placeholder}
        onError={() => setImageState("fallback-svg")}
        alt={alt}
        unoptimized
        {...props}
        loading="lazy"
      />
    );

  return (
    <Image
      src={safeSrc}
      alt={alt}
      placeholder={placeholder}
      onError={() => {
        if (imgState === "default") setImageState("unoptimized-fallback");
      }}
      {...props}
    />
  );
}
