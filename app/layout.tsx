import type { Metadata, Viewport } from "next";
import { KitStyles } from "@m1kapp/kit/pwa";
import "./globals.css";
import Providers from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#c8ff5a",
};
const DESC = "Claude Code와 Codex를 한 러너 아래 연결하고, 각 에이전트를 얼마나 끝까지 돌렸는지 기록하는 리그. One runner, two agent lanes.";
export const metadata: Metadata = {
  metadataBase: new URL("https://runmaxing.m1k.app"),
  title: "runmaxing · keep your agents running",
  description: DESC,
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { title: "runmaxing", description: DESC, url: "/", images: [{ url: "/og.png", width: 1200, height: 630, alt: "runmaxing · keep your agents running" }], type: "website" },
  twitter: { card: "summary_large_image", title: "runmaxing", description: DESC, images: ["/og.png"] },
};

// `npx m1kkit pwa --no-sw --bg=#09090b` 가 만든 public/splash 와 짝 — iOS 는 기기 해상도와 똑같은 그림만 쓰고, 없으면 흰 화면을 띄운다
// [CSS 폭, CSS 높이, 배율] 아이폰 세로 13종
const SPLASH = [
  [440, 956, 3], [402, 874, 3], [420, 912, 3], [430, 932, 3], [393, 852, 3], [428, 926, 3], [390, 844, 3],
  [375, 812, 3], [414, 896, 3], [414, 896, 2], [414, 736, 3], [375, 667, 2], [320, 568, 2],
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <KitStyles />
        {/* 이 태그가 없으면 iOS 가 스플래시를 쓰지 않는다 — Next 는 mobile-web-app-capable 만 낸다 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {SPLASH.map(([w, h, r]) => (
          <link
            key={`${w}x${h}@${r}`}
            rel="apple-touch-startup-image"
            media={`(device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${r}) and (orientation: portrait)`}
            href={`/splash/${w * r}x${h * r}.png`}
          />
        ))}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
